import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TestPage from './screen/TestPage.js';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

//Screens
import LoginScreen from './screen/LoginPage.js';
import SignUpScreen from './screen/SignUpPage.js';
import MapScreen from './screen/MainPage.js'
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
      <Stack.Navigator > 
        <Stack.Screen name="LoginPage" component={LoginScreen} options={{ headerShown: false}} />
        <Stack.Screen name="SignUpPage" component={SignUpScreen} options={{ headerShown: false}}/>
        
        <Stack.Screen name="MapScreen" component={MapScreen}  options={{header: () => <Header title="ParkAnyWhere" />,}}/>
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