  import * as React from 'react';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';

  // Screens
  import MapScreen from './MapScreen';
  import ProfilePage from './ProfilePage';
  import FeedbackPage from './FeedbackPage'; 
  import Results from './Results';

  // Components
  import Header from './Components/Header.js';

  //Screen names
  const MapScreenName = "Home";
  const feedbackName = "Feedback";
  const profileName = "Profile";

  const Tab = createBottomTabNavigator();

  function MainPage() {
    const [isMapView, setIsMapView] = React.useState(true);
    const [indoorOutdoor, setIndoorOutdoor] = React.useState(null);
    const [CheckboxChange, setHandleCheckboxChange] = React.useState(null);
    const navigation = useNavigation();

    const handlePlaceSelected = (details) => {
      navigation.navigate(MapScreenName, { placeDetails: details });
    };

    const handleEndDateTimeSelected = (dateTime) => {
      navigation.navigate(MapScreenName, { endDateTime: dateTime})
    };

    const toggleView = (isMap) => {
      setIsMapView(isMap);
    };

    
    handleIndoorOutdoorChange = (indoorOutdoor) => {
      // Handle the indoor/outdoor change here
      setIndoorOutdoor(indoorOutdoor);
    };

  const handleCheckboxChange = (CheckboxChange) => {
    setHandleCheckboxChange(CheckboxChange);
  };

    return (
      <Tab.Navigator
        initialRouteName={MapScreenName}
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

            if (rn === MapScreenName) {
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
            name={MapScreenName}
            children={(props) => (isMapView ? <MapScreen {...props} indoorOutdoor={indoorOutdoor} CheckboxChange={CheckboxChange} /> : <Results {...props}indoorOutdoor={indoorOutdoor} CheckboxChange={CheckboxChange} />)}
            options={{
              header: () => (
                <Header
                  title="ParkAnyWhere"
                  onPlaceSelected={handlePlaceSelected}
                  onEndDateTimeSelected={handleEndDateTimeSelected}
                  navigation={navigation}
                  onToggleView={toggleView}
                  onIndoorOutdoorChange={handleIndoorOutdoorChange}
                  handleCheckboxChange={handleCheckboxChange}
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
