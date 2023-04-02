import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MapScreen from './MapScreen';
import ReviewPage from './ReviewPage';
import FeedbackPage from './FeedbackPage';
import Header from './Components/Header.js';

//Screen names
const homeName = "Home";
const detailsName = "Reviews";
const settingsName = "Profile";

const Tab = createBottomTabNavigator();

function MainPage() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === detailsName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}>

      <Tab.Screen name={homeName} component={MapScreen} options={{ header: () => <Header title="ParkAnyWhere" />, }} />
      <Tab.Screen name={detailsName} component={ReviewPage} />
      <Tab.Screen name={settingsName} component={FeedbackPage} />

    </Tab.Navigator>
  );
}

export default MainPage;