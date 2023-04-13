  import * as React from 'react';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';

  // Screens
  import MapScreen from './MapScreen';
  import ProfilePage from './ProfilePage';
  import FeedbackPage from './FeedbackPage'; 
  import Header from './Components/Header.js';
  import Results from './Results';

  //Screen names
  const homeName = "Home";
  const feedbackName = "Feedback";
  const profileName = "Profile";

  const Tab = createBottomTabNavigator();

  function MainPage() {
    const [isMapView, setIsMapView] = React.useState(true);
    const navigation = useNavigation();

    const handlePlaceSelected = (details) => {
      navigation.navigate(homeName, { placeDetails: details });
    };

    const toggleView = (isMap) => {
      setIsMapView(isMap);
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

            return <Ionicons name={iconName} size={size} color={color} />;
            
          },
        })}
        >
          
      
      <Tab.Screen
        name={homeName}
        children={(props) => (isMapView ? <MapScreen {...props} /> : <Results {...props} />)}
        options={{
          header: () => (
            <Header
              title="ParkAnyWhere"
              onPlaceSelected={handlePlaceSelected}
              navigation={navigation}
              onToggleView={toggleView}
            />
          ),
        }}
      />


        <Tab.Screen name={feedbackName} component={FeedbackPage} options={{headerShown: false}}/>
        <Tab.Screen name={profileName} component={ProfilePage} options={{headerShown: false}}/>
      </Tab.Navigator>
      
    );
  }

  export default MainPage;