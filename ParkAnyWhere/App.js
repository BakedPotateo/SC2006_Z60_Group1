import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screen/MainScreen.js';
import TestPage from './screen/TestPage.js';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

//Screens
import LoginScreen from './screen/LoginPage.js';
import MapScreen from './screen/TestPage2.js';
import SignUpScreen from './screen/SignUpScreen.js';
import MainPage from './screen/MainPage.js'
import Header from './screen/Components/Header.js';

const Stack = createStackNavigator();

const customFonts = {
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
};



export default function App() {

  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}> 
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="TestPage2" component={MapScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="MainPage" component={MainPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});