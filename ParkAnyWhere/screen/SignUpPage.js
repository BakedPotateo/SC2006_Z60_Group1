import React, { Component } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    ImageBackground,
    Text,
    TextInput,
    KeyboardAwareScrollView,
    TouchableOpacity
} from "react-native";
import * as Font from 'expo-font';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const SignUpPage = ({ navigation }) => {

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User has been created successfully
                console.log('User registered successfully', userCredential);
                sendEmailVerification(auth.currentUser);
            })
            .catch((error) => {
                console.log('Error registering user', error);
            });
    };

    const navToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
        })
    }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../assets/SignUpPageBG.jpg")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.createAccountColumn}>
          <Text style={styles.createAccount}>Create Account</Text>
          <View style={styles.icon8Row}>
            <FeatherIcon name="user" style={styles.icon8}></FeatherIcon>
            <TextInput
              placeholder="Username"
              style={styles.placeholder2}
            ></TextInput>
          </View>
          <View style={styles.icon9Row}>
            <FontAwesomeIcon name="lock" style={styles.icon9}></FontAwesomeIcon>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.password1}
            ></TextInput>
          </View>
          <View style={styles.icon4Row}>
            <EntypoIcon name="mobile" style={styles.icon4}></EntypoIcon>
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
            ></TextInput>
          </View>
          <View style={styles.create5Row}>
            <Text style={styles.create5}>Create</Text>
            <View style={styles.loginButtonColumn}>
              <TouchableOpacity
                onPress={navToLogin}
                style={styles.button}>
                <FeatherIcon name="arrow-right" style={styles.arrow}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.createAccountColumnFiller}></View>
        <View style={styles.group2}>
          <View style={styles.endWrapperFiller}></View>
          <View style={styles.loremIpsumColumn}>
            <Text style={styles.loremIpsum}>
              Or create account using social media
            </Text>
            <View style={styles.group}>
              <EntypoIcon
                name="facebook-with-circle"
                style={styles.icon5}
              ></EntypoIcon>
              <EntypoIcon
                name="twitter-with-circle"
                style={styles.icon6}
              ></EntypoIcon>
              <EntypoIcon
                name="google--with-circle"
                style={styles.icon7}
              ></EntypoIcon>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center',
        width: '100%',
    },
    image_imageStyle: {},
    createAccount: {
        fontFamily: "roboto-700",
        color: "#121212",
        fontSize: 30,
        textAlign: "center"
    },
    icon8: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        height: 20,
        width: 20,
        marginLeft: 20
    },
    placeholder2: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 280,
        marginLeft: '4%',
    },
    icon8Row: {
        height: 34,
        flexDirection: "row",
        marginTop: '8%',
        width: '80%',
        height: '10%',
        position: 'relative',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    icon9: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        height: 20,
        width: 20,
        marginLeft: 23
    },
    password1: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 280,
        marginLeft: '3%'
    },
    icon9Row: {
        height: 34,
        flexDirection: "row",
        marginTop: '5%',
        width: '80%',
        height: '10%',
        position: 'relative',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    icon4: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        width: 20,
        height: 20,
        marginLeft: 20
    },
    textInput: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 280,
        marginLeft: '4%'
    },
    icon4Row: {
        height: 34,
        flexDirection: "row",
        marginTop: '5%',
        width: '80%',
        height: '10%',
        position: 'relative',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    create5: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 39,
        width: 67,
        fontSize: 20
    },
    button: {
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "#ff6666",
        marginTop: '2%',
        marginLeft: '3%'
    },
    arrow: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    create5Row: {
        flexDirection: "row",
        marginTop: '39%',
        marginLeft: '55%'
    },
    createAccountColumn: {
        marginTop: '45%'
    },
    createAccountColumnFiller: {
        flex: 1
    },
    group2: {
        width: 360,
        height: 78,
        marginBottom: '13%',
        alignSelf: "center"
    },
    endWrapperFiller: {
        flex: 1
    },
    loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 13,
        textAlign: "center",
        marginBottom: '4%'
    },
    group: {
        height: 44,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 220,
        alignSelf: "center"
    },
    icon5: {
        color: "rgba(18,30,215,1)",
        fontSize: 40,
        width: 40,
        height: 44
    },
    icon6: {
        color: "rgba(50,178,230,1)",
        fontSize: 40,
        width: 40,
        height: 43
    },
    icon7: {
        color: "rgba(207,43,30,1)",
        fontSize: 40,
        width: 40,
        height: 43
    },
    loremIpsumColumn: {}
});

export default SignUpPage;