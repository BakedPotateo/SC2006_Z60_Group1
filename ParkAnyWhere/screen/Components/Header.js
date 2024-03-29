import React, { useState }  from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Switch } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: new Date(),
      showDatePicker: false,
      showTimePicker: false,
      toggleButtonText: 'Map',
      checked: false,
      selectedValue: '',
      searchQuery: '',
    };
    this.navigation = props.navigation;
    this.onToggleView = props.onToggleView;
  }

  handlePlaceSelected(details) {
    // Call the prop passed from MainPage
    this.props.onPlaceSelected(details);
  }

  handleEndDateTimeSelected = () => {
    // console.log('New DateTime: ' + this.state.dateTime.toString());
    this.props.onEndDateTimeSelected(this.state.dateTime.toString());
  }
  
  handleIndoorOutdoorSelection = () => {
    this.props.onIndoorOutdoorChange(this.state.selectedValue);
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      isMapView: !prevState.isMapView,
      toggleButtonText: prevState.isMapView ? 'List' : 'Map',
    }));
    this.onToggleView(!this.state.isMapView);
  };
  

  handleCheckboxChange = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
    this.props.handleCheckboxChange(this.state.checked);
  };


  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  hideDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  handleConfirmDate = (event, dateTime) => {
    if (dateTime) {
      this.setState({ dateTime, showDatePicker: false });
      this.handleEndDateTimeSelected();
    } else {
      this.hideDatePicker();
    }
  };

  showTimePicker = () => {
    this.setState({ showTimePicker: true });
  };

  hideTimePicker = () => {
    this.setState({ showTimePicker: false });
  };

  handleConfirmTime = (event, dateTime) => {
    if (dateTime) {
      this.setState({ dateTime, showTimePicker: false });
      this.handleEndDateTimeSelected();
    } else {
      this.hideTimePicker();
    }
  };

render() {

    return (
      <View>
      <ImageBackground
        source={require('../../assets/headerBG.png')}
        style={styles.image}
        resizeMode="stretch"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/car-inverted.png')}
              style={styles.logo}
            />
            <Text style={styles.companyName}>ParkAnyWhere</Text>
          </View>
          <View style={ styles.searchContainer }>
            <FeatherIcon name="search" style={styles.searchIcon} />
            <GooglePlacesAutocomplete
              styles={{ 
                textInput: styles.googleSearchContainer,
                listView:{
                  position: 'absolute',
                  marginTop: 40,
                  backgroundColor: '#ED7B7B',
                  zIndex: 1,//Forcing it to front
                },
              }}
              placeholder={"Where are you going?"}
              textInputProps={{
                placeholderTextColor: '#ffffff',
              }}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                components: 'country:sg',
              }}
              onPress={(data, details = null) => this.handlePlaceSelected(data)}
              onFail={(error) => console.error(error)}
            />
            <TouchableOpacity>
              <FontAwesomeIcon name="microphone" style={styles.microphoneIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity onPress={this.showDatePicker}>
              <MaterialIcons name="event" style={{ position: 'absolute', marginLeft: 5, zIndex: 1, top:2 ,fontSize: 20, color: '#FFFFFF'}} />
              <TextInput
                editable={false}
                placeholder="Choose date"
                placeholderTextColor="#FFFFFF"
                style={styles.dateInput}
                value={this.state.dateTime.toLocaleDateString()}
              />
            </TouchableOpacity>
            {this.state.showDatePicker && (
              <DateTimePicker
                value={this.state.dateTime}
                mode="date"
                onChange={this.handleConfirmDate}
                dateFormat='day month year'
              />
            )}

            <TouchableOpacity onPress={this.showTimePicker}>
              <MaterialIcons name="access-time" style={{ position: 'absolute', marginLeft: 5, zIndex: 1, top:2, fontSize: 20, color: '#FFFFFF' }} />
              <TextInput
                editable={false}
                placeholder="Choose time"
                placeholderTextColor="#FFFFFF"
                style={styles.timeInput}
                value={this.state.dateTime.toLocaleTimeString()}
              />
            </TouchableOpacity>
            {this.state.showTimePicker && (
              <DateTimePicker
                value={this.state.dateTime}
                mode="time"
                onChange={this.handleConfirmTime}
              />
            )}
          </View>
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
      <View style={styles.toggleButtonContainer}>
        <Text style={styles.toggleButtonText}>{this.state.toggleButtonText}</Text>
        <Switch
          value={this.state.toggleButtonText === 'Map'}
          onValueChange={this.handleToggle}
          trackColor={{ false: '#767577', true: '#ED7B7B' }}
          thumbColor={this.state.toggleButtonText === 'Map' ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>
      <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderWidth: 0 }}
              textStyle={{ marginLeft: 5 }}
              title="Charging Port"
              checked={this.state.checked}
              onPress={this.handleCheckboxChange}
            />
        </View>
        <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={this.state.selectedValue}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) => {this.setState({ selectedValue: itemValue }, this.handleIndoorOutdoorSelection);}}
          
          prompt="Indoors/Outdoors"
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Indoors" value="Indoors" />
          <Picker.Item label="Outdoors" value="Outdoors" />
        </Picker>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    paddingBottom: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginLeft: '10%',
    width: 80,
    height: 80,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#ED7B7B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    width: '80%',
    height: 40,
    backgroundColor: '#ED7B7B',
    marginLeft: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  googleSearchContainer: {
    color: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    height: 35,
    backgroundColor: '#ED7B7B',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 5,
    color: '#FFFFFF',
  },
  searchInput: {
    color: "#FFFFFF",
    flex: 1,
  },
  microphoneIcon: {
    fontSize: 20,
    marginLeft: 5,
    color: '#FFFFFF',
  },
  dateTimeContainer: {
    marginLeft: '12%',
    height: 25,
    flexDirection: 'row',
    zIndex: -1,
    width: '80%',
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: '#ED7B7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,  
    elevation: 3,
    color: '#FFFFFF',
    
  },
  timeInput: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#ED7B7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  signInButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#ED7B7B',
    borderRadius: 20,
    marginLeft: 15,
  },
  icon3: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    zIndex: -1
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#ED7B7B',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  toggleButtonText: {
    color: '#ED7B7B',
    marginRight: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 5,
  },
  dropdownContainer: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#ED7B7B',
    borderRadius: 15,
    overflow: 'hidden',

  },
  dropdown: {
    flex: 1, 
    borderWidth: 1,
    borderColor: '#ED7B7B',
    borderRadius: 5,
    height: 30,
    color: 'black',
    justifyContent: 'center', // Center the arrow on Android
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
  },

});

export default Header;
