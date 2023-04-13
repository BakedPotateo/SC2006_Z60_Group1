import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarParkInfo = ({ carParkInfo }) => {

  const [parkingSystem, setParkingSystem] = useState(carParkInfo.parkingSystem);
  const [indoor, setIndoor] = useState(carParkInfo.indoor);

  useEffect(() => {
    if (carParkInfo.parkingSystem == "C") {
      setParkingSystem("Coupon");
    } else {
      setParkingSystem("Electronic");
    }
    if (carParkInfo.indoor == "Y") {
      setIndoor("Indoor");
    } else {
      setIndoor("Outdoor");
    }
  }, [carParkInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carParkInfo.ppName}</Text>
      <Text style={styles.detail}>Weekday Rate: {carParkInfo.weekdayRate}/hour</Text>
      <Text style={styles.detail}>Parking System : {parkingSystem}</Text>
      <Text style={styles.detail}>Lots Available : {carParkInfo.lotsAvailable}</Text>
      <Text style={styles.detail}>Indoor / Outdoor : {indoor}</Text>
      <Text style={styles.detail}>Electric : {carParkInfo.electric}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    minWidth: 250,
   
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default CarParkInfo;
