import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker , Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import PriceTag from './Views/PriceTag';
import CarParkInfo from './Views/CarParkInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapViewDirections from 'react-native-maps-directions';
import moment from 'moment';
import proj4 from 'proj4';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

//firebase
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const svy21Proj = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
const wgs84Proj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';


function MapScreen({ route , indoorOutdoor ,CheckboxChange }) {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [carParks, setCarParks] = useState([]);
  const markerRefs = useRef([]);
  const placeDetails = route.params?.placeDetails;
  const endDateTime = route.params?.endDateTime;
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const mapViewRef = useRef();
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [priceCalculated, setPriceCalculated] = useState(false);
  const [parkingPrice, setParkingPrice] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);
  const [destinationSelected, setDestinationSelected] = useState(false);

  // Get the user's current location and set it as the initial region
    // Get the user's current location and set it as the initial region
    useEffect(() => {
      //console.log('IndoorOutdoor changed:', indoorOutdoor);'
    
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
    }, [placeDetails, tracksViewChanges, indoorOutdoor , CheckboxChange]);


  const fetchCarParksFromFirebase = async () => {
    
    try {
      const carParksCollection = collection(db, 'CarParks');
      const carParksSnapshot = await getDocs(carParksCollection);
      const carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      //print out the data
      console.log(carParksData);
      setCarParks(carParksData);
      const accessKey = 'f21c183d-9c02-4e50-8939-b83dad170347';
      const authToken =  await getAuthToken(accessKey);
      getCarParkAvail(accessKey, authToken , carParksData);
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
      //console.log('Car park details:', carParkDetails);
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
        strokeWidth={5}
        strokeColor='#ED7B7B'
        apikey={GOOGLE_MAPS_API_KEY}
      >
      </MapViewDirections>    
    )
  }

  const makeTrip = async (event) => {
    console.log('makeTrip: ')
    if (priceCalculated && destinationSelected) {
      try{
        const pHistoryCollection = collection(db, 'ParkingHistory');
        newPHistoryObject = {
          CarParkID: destination["id"],
          CustomerID: 1,
          Email: "test@gmail.com",
          EndDateTime: new Date(endDateTime),
          StartDateTime: currentDateTime,
        };
        console.log(destination["id"]);
        await addDoc(pHistoryCollection, newPHistoryObject)
      }catch(error){
        console.log(`Error submitting trip for ${destination["id"]}`);
      }finally{
          console.log(`Trip for ${destination["id"]} submitted successfully!`);
      }
    }
  };

  function displayPrice() {
    if (!priceCalculated && endDateTime){
      var endDate = new Date(endDateTime)
      let currDate = moment().toDate();
      setCurrentDateTime(currDate);
      let hoursDiff = (endDate - currDate)/(1000 * 60 * 60);

      // print to console
      // console.log('curr date: ' + currDate.toString());
      // console.log('end date: ' + endDate.toString());
      // console.log('selected rate: ' + selectedRate);
      // console.log('hoursDiff: ' + hoursDiff);

      setPriceCalculated(true);
      setParkingPrice((selectedRate.replace(/[^0-9.-]+/g,"")*hoursDiff).toFixed(2));
    } else return;
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
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={ () => { 
            setShowDirections(false);
            setPriceCalculated(false); 
            setDestinationSelected(false);
            setParkingPrice(0);
            setSelectedRate(0)}
          } 
          style={styles.button}
        >
          <Text style={styles.priceFont}> Reset </Text>
        </Pressable>
        <Pressable
          onPress={ () => { 
            makeTrip()
          }}
          style={styles.letsGoButton}
        >
          <Text style={styles.priceFont}> Let's go! </Text>
        </Pressable>
        <View style={styles.priceContainer}>
          <Text style={styles.priceFont}> Price: ${parkingPrice} </Text>
        </View>
      </View>
      
      {showDirections ? displayPrice() : null}
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

          {showDirections ? showRoute() : null}
          
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            pinColor="red"
            title="Current Location"
          />
         {carParks.map((carPark) => {
          // Check if the geometries array is not empty and if the coordinates property exists
          if (carPark.geometries && carPark.geometries.length > 0 && carPark.geometries[0].hasOwnProperty("coordinates") && carPark.lotsAvailable !== undefined && carPark.lotsAvailable !== null) {
            const coordinates = carPark.geometries[0]["coordinates"].split(',');
            const eastings = parseFloat(coordinates[0]);
            const northings = parseFloat(coordinates[1]);
            const [longitude, latitude] = proj4(svy21Proj, wgs84Proj, [eastings, northings]);
            
            if(CheckboxChange === false && carPark.electric === "N") {
              return;
            } else {
            if(indoorOutdoor === "Outdoors") {
              if (carPark.indoor == "N"){
                return (
                  <Marker
                    key={carPark.id}
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    tracksViewChanges={tracksViewChanges}
                    onCalloutPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}
                  >
                    <PriceTag price={getPriceTag(carPark)} />
                    <Callout onPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}>
                      <CarParkInfo carParkInfo={carPark} />
                    </Callout>
                  </Marker>
                );
              }
            } else if(indoorOutdoor=== "Indoors"){
      
              if (carPark.indoor == "Y"){
                return (
                  <Marker
                    key={carPark.id}
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    tracksViewChanges={tracksViewChanges}
                    onCalloutPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}
                  >
                    <PriceTag price={getPriceTag(carPark)} />
                    <Callout onPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}>
                      <CarParkInfo carParkInfo={carPark} />
                    </Callout>
                  </Marker>
                );
            }
            } else {
              return (
                <Marker
                  key={carPark.id}
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  tracksViewChanges={tracksViewChanges}
                  onCalloutPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}
                >
                  <PriceTag price={getPriceTag(carPark)} />
                  <Callout onPress={() => {setShowDirections(true) ; setDestination(carPark) ; setSelectedRate(carPark["weekdayRate"]) ; setDestinationSelected(true)}}>
                    <CarParkInfo carParkInfo={carPark} />
                  </Callout>
                </Marker>
              );
            }
          }
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
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
  priceContainer: {
    position: 'absolute',
    marginLeft: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    width: '50%',
    height: 30,
    backgroundColor: '#ED7B7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  priceFont: {
    fontFamily: "roboto-regular",
    color: "#ffffff",
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    width: '25%',
    height: 30,
    backgroundColor: '#ED7B7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonsContainer: {
    marginBottom: '96%',
    height: 25,
    flexDirection: 'row',
    zIndex: 2,
    width: '80%',
  },
  letsGoButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30%',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    width: '15%',
    height: 30,
    backgroundColor: '#ED7B7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
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