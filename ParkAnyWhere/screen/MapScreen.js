import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker , Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'react-native-elements';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

const MapScreen = () => {
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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
    </KeyboardAwareScrollView>
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
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;