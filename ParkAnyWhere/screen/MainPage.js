import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MapScreen from './MapScreen';
import ReviewPage from './ReviewPage';
import FeedbackPage from './FeedbackPage'; // Placeholder for ProfilePage
import Header from './Components/Header.js';

//Screen names
const homeName = "Home";
const feedbackName = "Feedback";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainPage() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "#ed7b7b",
        "tabBarInactiveTintColor": "grey",
        "tabBarLabelStyle": {
          "paddingBottom": 5,
          "fontSize": 10
        },
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === feedbackName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
          
        },
      })}
      >

      <Tab.Screen name={homeName} component={MapScreen} options={{ header: () => <Header title="ParkAnyWhere" />, }} />
      <Tab.Screen name={feedbackName} component={FeedbackPage} />
      <Tab.Screen name={profileName} component={ReviewPage} />

    </Tab.Navigator>
  );
}

export default MainPage;