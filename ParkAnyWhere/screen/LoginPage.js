import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firestore , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification  } from '../firebaseConfig';
import TestPage from './TestPage2.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginButton from "./components/LoginButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('User logged in successfully', user);
        //navigation.navigate('TestPage2'); // This is for navigating after logging in
        navigation.reset({
          index: 0,
          routes: [{ name: 'TestPage2' }],
        }); //this is for navigating to the page after logging in
      })
      .catch((error) => {
        console.log('Error logging in', error);
      });
  };
  
  
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

    return (
        <View style={styles.container}>
            <Text style={styles.hello}>Hello</Text>
            <Text style={styles.loremIpsum}>Sign in to your account</Text>
            <Text style={styles.signIn}>Sign In</Text>
            <Text style={styles.loremIpsum2}>Don&#39;t have an account?</Text>
            <View style={styles.rect}></View>
            <View style={styles.loginButtonStack}>
                <LoginButton style={styles.loginButton}></LoginButton>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                ></TouchableOpacity>
            </View>
            <TextInput placeholder="Username"
                value={email}
                onChangeText={setEmail}
                style={styles.placeholder}></TextInput>
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.password}
            ></TextInput>
            <FeatherIcon name="user" style={styles.icon}></FeatherIcon>
            <FontAwesomeIcon name="lock" style={styles.icon2}></FontAwesomeIcon>
            <View style={styles.loremIpsum7Stack}>
                <Text style={styles.loremIpsum7}>Forgot your password?</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("LoginScreen")}
                    style={styles.button2}
                ></TouchableOpacity>
            </View>
            <View style={styles.createStack}>
                <Text style={styles.create}>Create</Text>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button3}
                ></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)"
    },
    hello: {
        top: 98,
        position: "absolute",
        fontFamily: "arial-regular",
        color: "#121212",
        fontSize: 65,
        left: 106
    },
    loremIpsum: {
        top: 193,
        left: 109,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    signIn: {
        top: 493,
        left: 196,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 38,
        width: 63,
        fontSize: 20
    },
    loremIpsum2: {
        top: 626,
        left: 92,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    rect: {},
    loginButton: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 26,
        width: 42
    },
    button: {
        top: 0,
        left: 0,
        width: 42,
        height: 26,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    loginButtonStack: {
        top: 493,
        left: 266,
        width: 42,
        height: 26,
        position: "absolute"
    },
    placeholder: {
        top: 276,
        left: 124,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 152
    },
    password: {
        top: 325,
        left: 124,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 152
    },
    icon: {
        top: 283,
        left: 92,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 20
    },
    icon2: {
        top: 332,
        left: 95,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 20
    },
    loremIpsum7: {
        top: 0,
        left: 0,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(155,155,155,1)",
        fontSize: 10
    },
    button2: {
        top: 0,
        left: 0,
        width: 104,
        height: 13,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    loremIpsum7Stack: {
        top: 370,
        left: 204,
        width: 104,
        height: 13,
        position: "absolute"
    },
    create: {
        top: 0,
        left: 0,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "#121212",
        textDecorationLine: "underline"
    },
    button3: {
        top: 0,
        left: 0,
        width: 42,
        height: 15,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    createStack: {
        top: 626,
        left: 245,
        width: 42,
        height: 17,
        position: "absolute"
    }
});
export default LoginScreen;
