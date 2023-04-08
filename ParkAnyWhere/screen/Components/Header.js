import React, { useState }  from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity , ImageBackground  ,Platform , Button , Switch} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = 'AIzaSyAk_IKcK278tmdzZEsggIpAwGkipdxiCOA';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: new Date(),
      showDatePicker: false,
      showTimePicker: false,
      toggleButtonText: 'Map',
      checked: false,
      selectedValue: '',
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      toggleButtonText: prevState.toggleButtonText === 'Map' ? 'List' : 'Map',
    }));
    if(this.state.toggleButtonText == 'Map'){
      this.props.navigation.navigate('LoginPage'); //change this after getting new file
    } else {
      this.props.navigation.navigate('MapScreen');
    }
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
  };


  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  hideDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  handleConfirmDate = (event, date) => {
    if (date) {
      this.setState({ date, showDatePicker: false });
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

  handleConfirmTime = (event, time) => {
    if (time) {
      this.setState({ time, showTimePicker: false });
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
                  backgroundColor: '#ED7B7B',
                  zIndex: 1,//Forcing it to front
                },
              }}
              placeholder={"Where are you going?"}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
              }}
              onPress={(data, details = null) => console.log(data)}
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
            value={this.state.date.toLocaleDateString()}
          />
        </TouchableOpacity>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.date}
            mode="date"
            onChange={this.handleConfirmDate}
          />
        )}

        <TouchableOpacity onPress={this.showTimePicker}>
          <MaterialIcons name="access-time" style={{ position: 'absolute', marginLeft: 5, zIndex: 1, top:2, fontSize: 20, color: '#FFFFFF' }} />
          <TextInput
            editable={false}
            placeholder="Choose time"
            placeholderTextColor="#FFFFFF"
            style={styles.timeInput}
            value={this.state.time.toLocaleTimeString()}
          />
        </TouchableOpacity>
        {this.state.showTimePicker && (
          <DateTimePicker
            value={this.state.time}
            mode="time"
            onChange={this.handleConfirmTime}
          />
        )}
          <TouchableOpacity style={styles.signInButton}>
            <FeatherIcon name="arrow-right" style={styles.icon3} />
          </TouchableOpacity>
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
          onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
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
    paddingLeft: 35,
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
    paddingLeft: 35,
    paddingRight: 10,
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
    backgroundColor: '#ff6666',
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