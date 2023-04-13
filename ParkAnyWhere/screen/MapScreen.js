import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker , Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

//firebase
import { auth, db , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification} from '../firebaseConfig';
import { collection, doc, setDoc , query, getDocs} from 'firebase/firestore';

import proj4 from 'proj4';
import { render } from 'react-dom';

const svy21Proj = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
const wgs84Proj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';


function MapScreen({ route }) {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [carParks, setCarParks] = useState([]);
  const markerRefs = useRef([]);
  const placeDetails = route.params?.placeDetails;
  const mapViewRef = useRef();
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  // const destination = {latitude: 1.3397, longitude: 103.7067};

  // Get the user's current location and set it as the initial region
    useEffect(() => {
      if (placeDetails) {
        console.log('Selected place details:', placeDetails);
        fetchPlaceDetails(placeDetails.place_id);
      }
      if (tracksViewChanges) {
        const timeout = setTimeout(() => {
          setTracksViewChanges(false);
        }, 1000);
    
        return () => clearTimeout(timeout);
      }
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
  }, [placeDetails , tracksViewChanges]);

  const fetchCarParksFromFirebase = async () => {
    
    try {
      const carParksCollection = collection(db, 'CarParks');
      const carParksSnapshot = await getDocs(carParksCollection);
      const carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      //print out the data
      //console.log(carParksData);
      //setCarParks(carParksData);
      const accessKey = 'f21c183d-9c02-4e50-8939-b83dad170347';
      //const authToken = getAuthToken(accessKey);
      getCarParkAvail(accessKey, "9fV9TEJ@5cRr8x15434ZF1-30nwvS7CbMh0c015Pk5e2sc712BNfGQFtxcK39v9m72w58C39-fq7Zd165dD2+1-H7d2fuA3T7Kf4" , carParksData);
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
      counter = 0
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
      //console.log('Updated car park data:', updatedCarParksData[0]);
      setCarParks(updatedCarParksData);
    } catch (error) {
      console.error('Error fetching car park details:', error);
    }
  };
  
  function showRoute() {
    const coordinates = destination.geometries[0]["coordinates"].split(',');
    const eastings = parseFloat(coordinates[0]);
    const northings = parseFloat(coordinates[1]);
    const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [eastings, northings]);
    return(  
      <MapViewDirections
        origin={location}
        destination={{latitude: latitude, longitude: longitude}}
        strokeWidth={3}
        strokeColor='black'
        apikey={GOOGLE_MAPS_API_KEY}
      >
      </MapViewDirections>    
  )
  }

  const fetchPlaceDetails = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.result && data.result.geometry && data.result.geometry.location) {
        const { lat, lng } = data.result.geometry.location;
        const camera = {
          center: {
            latitude: lat,
            longitude: lng,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 16, // Adjust the zoom level as needed
        };
  
        mapViewRef.current.animateCamera(camera, { duration: 1000 });
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
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
    return carPark["weekdayRate"] + '/hour';
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {location && (
        <MapView
          ref={mapViewRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0302,
            longitudeDelta: 0.0302,
          }}
        >

          {showDirections && showRoute()}
          
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            pinColor="blue"
            title="Current Location"
          />
         {carParks.map((carPark) => {
          // Check if the geometries array is not empty and if the coordinates property exists
          if (carPark.geometries && carPark.geometries.length > 0 && carPark.geometries[0].hasOwnProperty("coordinates") && carPark.lotsAvailable !== undefined && carPark.lotsAvailable !== null) {
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
                tracksViewChanges={tracksViewChanges}
                onCalloutPress={() => {setShowDirections(true) ; setDestination(carPark)}}
              >
                <PriceTag price={getPriceTag(carPark)} />
                <Callout onPress={() => {setShowDirections(true) ; setDestination(carPark)}}>
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
    // position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
});

const getAuthToken = async (accessKey) => {
  try {
    const url = 'https://www.ura.gov.sg/uraDataService/insertNewToken.action';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'AccessKey': accessKey
      }
    });

    const data = await response.json();

    if (data.Status === 'Success') {
      console.log('Authentication token:', data.Result);
      return data.Result;
    } else {
      console.error('Error getting authentication token:', data.Message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching authentication token:', error);
    return null;
  }
};


export default MapScreen;