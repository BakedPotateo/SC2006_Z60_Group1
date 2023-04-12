// Results.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';

const GOOGLE_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA'; 

const Results = ({ route }) => {
  const { searchTerm, location } = route.params;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              key: GOOGLE_API_KEY,
              location: `${location.latitude},${location.longitude}`,
              radius: 1000,
              keyword: searchTerm,
            },
          }
        );

        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm, location]);

    const getPriceTag = (carPark) => {
    // Implement a function to fetch or calculate the car park price

    return `$${Math.floor(Math.random() * 10)}/hour`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Showing results for: {searchTerm}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultAddress}>{item.vicinity}</Text>
            <Text style={styles.getPriceTag}>Price: ${item.price}</Text> {/* Update the property name based on the actual API response */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  resultItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 14,
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Results;



