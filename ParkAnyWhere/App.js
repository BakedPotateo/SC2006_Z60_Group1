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