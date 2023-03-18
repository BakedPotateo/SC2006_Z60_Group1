import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceTag = ({ price }) => (
  <View style={styles.container}>
    <View style={styles.priceTag}>
      <Text style={styles.text}>{price}</Text>
    </View>
    <View style={styles.marker} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  priceTag: {
    backgroundColor: 'rgba(75, 52, 235, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 3,
  },
});



export default PriceTag;
