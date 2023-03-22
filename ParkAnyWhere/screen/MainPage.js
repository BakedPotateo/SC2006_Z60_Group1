import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainPage = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
        <Pressable>
        <EntypoIcon name="chevron-with-circle-right" style={styles.signInButton}/>
        </Pressable>
        <View style={styles.iconStackRow}>
            <View style={styles.iconStack}>
                <EntypoIcon name="home" style={styles.icon}></EntypoIcon>
                <TouchableOpacity
                    onPress={navToMainPage}
                    style={styles.button}
                ></TouchableOpacity>
            </View>
            <View style={styles.icon3Stack}>
                <FeatherIcon name="map" style={styles.icon3}></FeatherIcon>
                <TouchableOpacity
                    onPress={navToMap}
                    style={styles.button2}
                ></TouchableOpacity>
            </View>
            <View style={styles.icon2Stack}>
                <EntypoIcon name="log-out" style={styles.icon2}></EntypoIcon>
                <TouchableOpacity
                    onPress={navToLogin}
                    style={styles.button3}
                ></TouchableOpacity>
            </View>
        </View>
        <Text style={styles.parkAnywhere}>ParkAnywhere</Text>
        <Text style={styles.wipMainPage}>WIP MAIN PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        top: 0,
        left: 0,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 40
    },
    button: {
        top: 2,
        left: 0,
        width: 40,
        height: 41,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    signInButton: {
        color: "#FFFFFF",
        fontSize: 40,
        height: 44,
        width: 40,
        marginLeft: 7
      },
    iconStack: {
        width: 40,
        height: 44
    },
    icon3: {
        top: 0,
        left: 3,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 40
    },
    button2: {
        top: 0,
        left: 0,
        width: 48,
        height: 43,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    icon3Stack: {
        width: 48,
        height: 43,
        marginLeft: 52,
        marginTop: 2
    },
    icon2: {
        top: 0,
        left: 3,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 40
    },
    button3: {
        top: 2,
        left: 0,
        width: 43,
        height: 43,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    icon2Stack: {
        width: 43,
        height: 45,
        marginLeft: 56
    },
    iconStackRow: {
        height: 45,
        flexDirection: "row",
        marginTop: 631,
        marginLeft: 71,
        marginRight: 50
    },
    parkAnywhere: {
        fontFamily: "roboto-regular",
        color: "#121212",
        marginTop: -612,
        marginLeft: 136
    },
    wipMainPage: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 30,
        marginTop: 226,
        marginLeft: 71
    }
});

export default MainPage;
