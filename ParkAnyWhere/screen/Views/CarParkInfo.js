import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarParkInfo = ({ carParkInfo }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{carParkInfo.name}</Text>
        <Text style={styles.text}>{carParkInfo.address}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 3,
      padding: 6,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    info: {
      fontSize: 12,
    },
  });
  
  export default CarParkInfo;