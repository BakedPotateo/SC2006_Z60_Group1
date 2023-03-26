import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ImageBackground, Pressable } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import MapView from "react-native-maps";
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainPage = ({ navigation }) => {
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

    return (
        <View style={styles.container}>

            <View style={styles.topView}>
                <ImageBackground source={require("../assets/pink-bg.jpg")} style={styles.backgroundImage}>
                <Image
                    source={require("../assets/car-inverted.png")}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.parkAnywhere}>ParkAnywhere</Text>

                <View style={styles.inputWrap}>
                    <EntypoIcon name="magnifying-glass" style={styles.magnifyingGlassIcon}></EntypoIcon>
                    <TextInput
                        placeholder="Where are you going?"
                        value={destination}
                        onChangeText={setDestination}
                        style={styles.destinationInput}
                    ></TextInput>
                </View>
                
                <View style={styles.inputWrap}>
                    <TextInput
                        placeholder="Date"
                        value={destination} // Todo: change to date selector
                        onChangeText={setDestination}
                        style={styles.dateInput}
                    ></TextInput>
                    <TextInput
                        placeholder="00:00"
                        value={destination} // Todo: change to time selector
                        onChangeText={setDestination}
                        style={styles.timeInput}
                    ></TextInput>
                    <Pressable>
                        <EntypoIcon name="chevron-with-circle-right" style={styles.chevronButton}></EntypoIcon>
                    </Pressable>
                </View>
                </ImageBackground>
            </View>

            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                latitude: 1.3521,
                longitude: 103.8198,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
                }}
                customMapStyle={[]}
                style={styles.mapView}
            ></MapView>
        

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
        <Text style={styles.wipMainPage}>WIP MAIN PAGE</Text>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    parkAnywhere: {
        fontFamily: "roboto-regular",
        color: "#EA5455",
        marginTop: 40,
        marginLeft: 112
    },
    image: {
        top: 0,
        left: 0,
        width: 116,
        height: 96,
        position: "absolute"
    },
    inputWrap: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    magnifyingGlassIcon: {
        color: "white",
        fontSize: 30,
        height: 30,
        width: 30,
        marginLeft: 35,
        marginTop: 25
    },
    destinationInput: {
        flex: 1,
        width: 285,
        height: 50,
        marginTop: 25,
        marginLeft: 35,
        borderRadius: 20,
        paddingLeft: 50,
        color: "#FFF",
        backgroundColor: "#EA5455",
    },
    dateInput: {
        width: 100,
        height: 50,
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        color: "#FFF",
        backgroundColor: "#EA5455",
    },
    timeInput: {
        width: 100,
        height: 50,
        marginTop: 20,
        marginLeft: 35,
        borderRadius: 20,
        paddingLeft: 10,
        color: "#FFF",
        backgroundColor: "#EA5455",
    },
    mapView: {
        height: 400,
        width: 350,
        marginTop: 30,
        marginLeft: 30
    },
    chevronButton: {
        color: "white",
        fontSize: 40,
        height: 44,
        width: 40,
        marginLeft: 35,
        marginTop: 25
    },
    wipMainPage: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 30,
        marginTop: 226,
        marginLeft: 71
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
    }
});

export default MainPage;
