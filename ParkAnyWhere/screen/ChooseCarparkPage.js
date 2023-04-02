import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker , Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

const ChooseCarparkPage = () => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [carParks, setCarParks] = useState([]);
  const markerRefs = useRef([]);

  // Get the user's current location and set it as the initial region
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchNearbyCarParks(location.coords);
    })();
  }, []);

  const fetchNearbyCarParks = async ({ latitude, longitude }) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=parking&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCarParks(data.results);
    } catch (error) {
      console.error('Error fetching nearby car parks:', error);
    }
  };

  const getPriceTag = (carPark) => {
    // Implement a function to fetch or calculate the car park price

    return `$${Math.floor(Math.random() * 10)}/hour`;
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {carParks.map((carPark) => (
            <Marker
              key={carPark.place_id}
              coordinate={{
                latitude: carPark.geometry.location.lat,
                longitude: carPark.geometry.location.lng,
              }}
              tracksViewChanges={false}
            >
              <PriceTag price={getPriceTag(carPark)} />
              <Callout>
                <CarParkInfo carParkInfo={carPark} />
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  profilePic: {
    left: 80,
    width: 50,
    height: 50,
  },

  inputContainer: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
    width: '80%',
    height: '10%',
    position: 'relative',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ChooseCarparkPage;