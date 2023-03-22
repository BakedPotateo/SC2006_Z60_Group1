import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screen/MainScreen.js';
import TestPage from './screen/TestPage.js';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//testing
import LoginScreen from './screen/LoginPage.js';
import MapScreen from './screen/TestPage2.js';
import SignUpScreen from './screen/SignUpScreen.js';
import MainPage from './screen/MainPage.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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