import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity , ImageBackground } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <ImageBackground source={require('../../assets/MainPageBG.png')} style={styles.image} resizeMode="stretch">
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/car-inverted.png')} style={styles.logo} />
        <Text style={styles.companyName}>ParkAnyWhere</Text>
      </View>
      <View style={styles.searchContainer}>
        <FeatherIcon name="search" style={styles.searchIcon} />
        <TextInput
          placeholder="Where are you going"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <FontAwesomeIcon name="microphone" style={styles.microphoneIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.dateTimeContainer}>
        <TextInput
          placeholder="Choose date"
          style={styles.dateInput}
        />
        <TextInput
          placeholder="Choose time"
          style={styles.timeInput}
        />
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    marginTop   : 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginLeft : '4%',
    width: 50,
    height: 50,
    //resizeMode: 'contain',
  },
  companyName: {
    fontSize:18,
    marginLeft: 10,
    color: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    width: '80%',
    marginLeft: '5%',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
  },
  microphoneIcon: {
    fontSize: 20,
    marginLeft: 5,
  },
  dateTimeContainer: {
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  dateInput: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeInput: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Header;