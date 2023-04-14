// Results.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as Location from 'expo-location';
import CarParkInfo from './Views/CarParkInfo';

// firebase
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import proj4 from 'proj4';

const svy21Proj = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
const wgs84Proj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

function FlatListScreen({ route , indoorOutdoor , CheckboxChange }) {
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

      let location = await Location.getCurrentPositionAsync({});
      //testing AT NTU 1.3484010698533575, 103.68322053068263
      location.coords.latitude = 1.3484010698533575;
      location.coords.longitude = 103.68322053068263;
      setLocation(location.coords);
      fetchCarParksFromFirebase();
    })();
  }, [indoorOutdoor, CheckboxChange]);

  const fetchCarParksFromFirebase = async () => {
    try {
      const carParksCollection = collection(db, 'CarParks');
      const carParksSnapshot = await getDocs(carParksCollection);
      const carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const accessKey = 'f21c183d-9c02-4e50-8939-b83dad170347';
      getCarParkAvail(accessKey, "8JauXya9997qWfV8M414U2THbv4-270a7h8@e149dv7BDfZdjQ1gZ313MMVt3d90-s@m43--2b9-fca1f93-s9c1e143mdM7-db9", carParksData);
    } catch (error) {
      console.error('Error fetching car parks from Firebase:', error);
    }
  };

  handleIndoorOutdoorChange = (indoorOutdoor) => {
    // Handle the indoor/outdoor change here
    console.log("Indoor/Outdoor:", indoorOutdoor);
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
        let foundCarPark = null;
        //console.log(counter++);
        // Iterate through the carParkDetails array to find a matching carPark
        for (const cp of carParkDetails) {
          if (cp.carparkNo == carPark.ppCode) {
            foundCarPark = cp;
            //console.log(cp.carparkNo);
            //console.log(carPark.ppCode);
            break;
          }
        }
  
        if (foundCarPark) {
          // If found, update car park data by adding available lots
          return {
            ...carPark,
            lotsAvailable: foundCarPark.lotsAvailable,
          };
        } else {
          return carPark;
        }
      });
  
      setCarParks(updatedCarParksData);
    } catch (error) {
      console.error('Error fetching car park details:', error);
    }
  };


  const renderItem = ({ item }) => {
    if (
      item.geometries &&
      item.geometries.length > 0 &&
      item.geometries[0].hasOwnProperty("coordinates") &&
      item.lotsAvailable !== undefined &&
      item.lotsAvailable !== null
    ) {
      const coordinates = item.geometries[0]["coordinates"].split(",");
      const eastings = parseFloat(coordinates[0]);
      const northings = parseFloat(coordinates[1]);
      const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [
        eastings,
        northings,
      ]);
  
      if (CheckboxChange === false && item.electric === "N") {
        return;
      } else {
        if (indoorOutdoor === "Outdoors") {
          if (item.indoor == "N") {
            return (
              <View style={styles.item}>
                <CarParkInfo carParkInfo={item} />
              </View>
            );
          }
        } else if (indoorOutdoor === "Indoors") {
          if (item.indoor == "Y") {
            return (
              <View style={styles.item}>
                <CarParkInfo carParkInfo={item} />
              </View>
            );
          }
        } else {
          return (
            <View style={styles.item}>
              <CarParkInfo carParkInfo={item} />
            </View>
          );
        }
      }
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

