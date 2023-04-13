// Results.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as Location from 'expo-location';
import CarParkInfo from './Views/CarParkInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



// firebase
import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from '../firebaseConfig';
import { collection, doc, setDoc, query, getDocs } from 'firebase/firestore';

import proj4 from 'proj4';

const svy21Proj = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
const wgs84Proj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

function FlatListScreen({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [carParks, setCarParks] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      if (route.params && route.params.selectedLocation) {
        setLocation({
          latitude: route.params.selectedLocation.lat,
          longitude: route.params.selectedLocation.lng,
        });
        fetchCarParksFromFirebase();
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        fetchCarParksFromFirebase(location.coords);
      }
    })();
  }, [route.params]);
  
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  const fetchCarParksFromFirebase = async (location) => {
    try {
      const carParksCollection = collection(db, 'CarParks');
      const carParksSnapshot = await getDocs(carParksCollection);
      let carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      // Filter car parks based on distance
      carParksData = carParksData.filter(carPark => {
        if (carPark.geometries && carPark.geometries.length > 0 && carPark.geometries[0].hasOwnProperty("coordinates")) {
          const coordinates = carPark.geometries[0]["coordinates"].split(',');
          const eastings = parseFloat(coordinates[0]);
          const northings = parseFloat(coordinates[1]);
          const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [eastings, northings]);
  
          // Calculate the distance in km
          const distance = calculateDistance(location.latitude, location.longitude, latitude, longitude);
  
          // Return true if the distance is within 5km
          return distance <= 5;
        }
        return false;
      });
  
      const accessKey = 'f21c183d-9c02-4e50-8939-b83dad170347';
      getCarParkAvail(accessKey, "9fV9TEJ@5cRr8x15434ZF1-30nwvS7CbMh0c015Pk5e2sc712BNfGQFtxcK39v9m72w58C39-fq7Zd165dD2+1-H7d2fuA3T7Kf4", carParksData);
    } catch (error) {
      console.error('Error fetching car parks from Firebase:', error);
    }
  };
  
  

  const getCarParkAvail = async (accessKey, token, carparkData) => {
    try {
      const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'AccessKey': accessKey,
          'Token': token
        }
      });
  
      const data = await response.json();
      const carParkDetails = data.Result;
      console.log('Car park details:', carParkDetails);
  
      const updatedCarParksData = carparkData.map((carPark) => {
        const foundCarPark = carParkDetails.find(cp => cp.carkparkNo === carPark.carParkNo);
        if (foundCarPark) {
          return {
            ...carPark,
            lotsAvailable: foundCarPark.lotsAvailable,
            totalLots: foundCarPark.totalLots
          };
        } else {
          return carPark;
        }
      });
  
      setCarParks(updatedCarParksData, location);
    } catch (error) {
      console.error('Error fetching car park details:', error);
    }
  };

      const renderItem = ({ item }) => {
        if (item.geometries && item.geometries.length > 0 && item.geometries[0].hasOwnProperty("coordinates")) {
          const coordinates = item.geometries[0]["coordinates"].split(',');
          const eastings = parseFloat(coordinates[0]);
          const northings = parseFloat(coordinates[1]);
          const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [eastings, northings]);

          return (
            <View style={styles.item}>
              <CarParkInfo carParkInfo={item} />
            </View>
          );
        }
      };
      
      return (
        <View style={styles.container}>
      <FlatList
        data={carParks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fdeeeb',
        alignItems: 'center',
        justifyContent: 'center',
      },
      item: {
        backgroundColor: 'ffffff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 16,
      },
    });

    export default FlatListScreen;


