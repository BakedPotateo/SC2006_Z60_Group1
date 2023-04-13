import React, { useState , useEffect} from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View , ImageBackground  , KeyboardAvoidingView , ScrollView} from 'react-native';
import { auth, db , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification  } from '../firebaseConfig';
import TestPage from './MainPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('User logged in successfully', user.email);
        //navigation.navigate('TestPage2'); // This is for navigating after logging in
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainPage' }], 
          navigation:{navigation}
        }); 
      })
      .catch((error) => {
        console.log('Error logging in', error);
      });
  };
  
    const navToRegister = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpPage' }],
        })
    }

    return (
      
          <ImageBackground source={require('../assets/LoginBG.png')} style={styles.backgroundImage} resizeMode="stretch">
            <KeyboardAwareScrollView 
              contentContainerStyle={styles.content} 
              keyboardShouldPersistTaps="handled" 
              resetScrollToCoords={{ x: 0, y: 0 }} 
              scrollEnabled={false}
            >
              <View style={styles.header}>
                <Text style={styles.hello}>Hello</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.loremIpsum}>Sign in to your account</Text>
                <View style={styles.inputContainer}>
                  <FeatherIcon name="user" style={styles.icon} />
                  <TextInput
                    placeholder="Username"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.placeholder}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesomeIcon name="lock" style={styles.icon2} />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.password}
                  />
                </View>
                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.loremIpsum7}>Forgot your password?</Text>
                  </TouchableOpacity>
                  <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Sign In</Text>
                    <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
                      <FeatherIcon name="arrow-right" style={styles.icon3} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.createAccountContainer}>
                <Text style={styles.loremIpsum2}>Don&#39;t have an account?</Text>
                <TouchableOpacity onPress={navToRegister} style={styles.button3}>
                  <Text style={styles.create}>Create</Text>
                </TouchableOpacity>
              </View>
              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
      
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'stretch',
      justifyContent: 'center',
      width: '100%',
    },
    header: {
      marginTop: 100,
    },
    backgroundImage: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    hello: {
      fontFamily: "roboto-bold",
      color: "#121212",
      fontSize: 55,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    loremIpsum: {
        marginTop: '3%',
        marginBottom: '10%',
      fontFamily: "roboto-regular",
      color: "#121212",
    },
    inputContainer: {
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      marginBottom: 30,
      width: '80%',
      height: 50,
      position: 'relative',
      overflow: 'hidden',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 20,
      marginRight: 20,
      marginLeft: 20,
    },
    icon2: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginRight: 20,
        marginLeft: 24,
      },
    placeholder: {
      flex: 1,
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 34,
    },
    password: {
      flex: 1,
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 34,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E6E6E6',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    signIn: {
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 20,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
      },
      loremIpsum7: {
        fontFamily: 'roboto-regular',
        color: 'rgba(155,155,155,1)',
        fontSize: 10,
        marginBottom: 20,
        marginRight: 10,
      },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
    loremIpsum2: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginRight: 10,
    },
    button3: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    create: {
      fontFamily: "roboto-regular",
      color: "#121212",
      textDecorationLine: "underline",
      marginLeft: -5
    },
    signInContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    signInButton: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      backgroundColor: '#ED7B7B',
      borderRadius: 30,
      marginRight: 10,
      marginLeft: 10,
    },
    icon3: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    signInText: {
      fontFamily: "roboto-bold",
      color: "#121212",
      fontSize: 18,
    },
    createAccountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '30%',
    },
  });
  
export default LoginScreen;

