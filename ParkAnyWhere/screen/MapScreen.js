import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker , Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

//firebase
import { auth, db , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification} from '../firebaseConfig';
import { collection, doc, setDoc , query, getDocs} from 'firebase/firestore';

import proj4 from 'proj4';

const svy21Proj = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
const wgs84Proj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';


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
      //testing AT NTU 1.3484010698533575, 103.68322053068263
      location.coords.latitude = 1.3484010698533575;
      location.coords.longitude = 103.68322053068263;
      setLocation(location.coords);
      //fetchNearbyCarParks(location.coords);
      fetchCarParksFromFirebase();
    })();
  }, []);

  const fetchCarParksFromFirebase = async () => {
    try {
      const carParksCollection = collection(db, 'CarParks');
      const carParksSnapshot = await getDocs(carParksCollection);
      const carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      //print out the data
      //console.log(carParksData);
      setCarParks(carParksData);
    } catch (error) {
      console.error('Error fetching car parks from Firebase:', error);
    }
  };

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
         {carParks.map((carPark) => {
          // Check if the geometries array is not empty and if the coordinates property exists
          if (carPark.geometries && carPark.geometries.length > 0 && carPark.geometries[0].hasOwnProperty("coordinates")) {
            const coordinates = carPark.geometries[0]["coordinates"].split(',');
            const eastings = parseFloat(coordinates[0]);
            const northings = parseFloat(coordinates[1]);
            const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [eastings, northings]);
            return (
              <Marker
                key={carPark.id}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                tracksViewChanges={true}
              >
                <PriceTag price={getPriceTag(carPark)} />
                <Callout>
                  <CarParkInfo carParkInfo={carPark} />
                </Callout>
              </Marker>
            );
          }
        })}
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