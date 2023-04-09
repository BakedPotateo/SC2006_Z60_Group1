import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//Screens
import LoginScreen from './screen/LoginPage.js';
import SignUpScreen from './screen/SignUpPage.js';
import MainPage from './screen/MainPage.js'

//firestore
import { auth, db , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification} from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';


const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    //const accessKey = 'f21c183d-9c02-4e50-8939-b83dad170347';
    //const authToken = getAuthToken(accessKey);
    //getCarParkDetails(accessKey, 'c3p-2QP327xx0mrmd7n-Z48--49C91eKky2dZ37cjBHA9u28vmEUrd033n589c+0m5b29379CmWd5cD6p73t8h7yeHj5WT-Pt4d0');
    
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpPage" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
/*
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


const getCarParkDetails = async (accessKey, token) => {
  try {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
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
    const carparkCollection = collection(db, 'CarParks');

    carParkDetails.forEach(async (carPark) => {
      const carParkData = {
        weekdayMin: carPark.weekdayMin,
        ppName: carPark.ppName,
        endTime: carPark.endTime,
        weekdayRate: carPark.weekdayRate,
        startTime: carPark.startTime,
        ppCode: carPark.ppCode,
        sunPHRate: carPark.sunPHRate,
        satdayMin: carPark.satdayMin,
        sunPHMin: carPark.sunPHMin,
        parkingSystem: carPark.parkingSystem,
        parkCapacity: carPark.parkCapacity,
        vehCat: carPark.vehCat,
        satdayRate: carPark.satdayRate,
        geometries: carPark.geometries,
      };

      const carparkDoc = doc(carparkCollection, carPark.ppCode);
      try {
        await setDoc(carparkDoc, carParkData);
        console.log('Car park details saved to Firestore');
      } catch (error) {
        console.error('Error saving car park details to Firestore:', error);
      }
    });
  } catch (error) {
    console.error('Error fetching car park details:', error);
  }
}; */





/*
const fetchCarparkData = async () => {
  try {
    const response = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
    const data = await response.json();
    const carparkData = data.items[0].carpark_data;
    //const carparkCollection = firestore().collection('CarParks');

    const carparkCollection = collection(db, 'CarParks');

    carparkData.forEach(async (carpark) => {
      const  carpark_number  = carpark.carpark_number;
      const carparkDoc = doc(carparkCollection, carpark_number);
      await setDoc(carparkDoc, { carpark_number });
    });


    console.log('Carpark data saved in Firestore');
  } catch (error) {
    console.error('Error fetching carpark data:', error);
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});