import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  // Get the user's current location and set it as the initial region
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let currentRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(currentRegion);
      setMarker(currentRegion);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {marker && (
            <Marker
              coordinate={marker}
              title="My Marker"
              description="Some description"
              draggable={true}
              onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
            />
          )}
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
});

export default MapScreen;