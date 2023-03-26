import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ImageBackground, Pressable } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import MapView from "react-native-maps";
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ProfilePage = ({ navigation }) => {
    const [destination, setDestination] = useState('');

    const navToMap = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'TestPage2' }],
        })
    }

    const navToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
        })
    }

    const navToMainPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainPage' }],
        })
    }
}

const styles = StyleSheet.create({
    
});

export default ProfilePage;