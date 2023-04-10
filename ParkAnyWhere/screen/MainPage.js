import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Screens
import MapScreen from './MapScreen';
import ProfilePage from './ProfilePage';
import FeedbackPage from './FeedbackPage'; 
import Header from './Components/Header.js';

//Screen names
const homeName = "Home";
const feedbackName = "Feedback";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainPage() {

  const navigation = useNavigation();

  const handlePlaceSelected = (details) => {
    navigation.navigate(homeName, { placeDetails: details });
  };

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "#ED7B7B",
        "tabBarInactiveTintColor": "grey",
        "tabBarHideOnKeyboard": true,
        "tabBarLabelStyle": {
          "paddingBottom": 5,
          "fontSize": 12
        },
        "tabBarItemStyle": {
          "paddingTop": 10
        },
        "tabBarStyle": [
          {
            "position": 'absolute',
            "height": 60,
            "bottom": 0
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
        

      <Tab.Screen name={homeName} component={MapScreen} options={{ header: () => <Header title="ParkAnyWhere" onPlaceSelected={handlePlaceSelected} />, }} />
      <Tab.Screen name={feedbackName} component={FeedbackPage} options={{headerShown: false}}/>
      <Tab.Screen name={profileName} component={ProfilePage} options={{headerShown: false}}/>

    </Tab.Navigator>
    
  );
}

export default MainPage;