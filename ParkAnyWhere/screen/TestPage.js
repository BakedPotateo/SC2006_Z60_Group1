import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firestore , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification  } from '../firebaseConfig';
import TestPage from './MainPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        <Text>Testing page</Text>
        <Text>Test Account : test@gmail.com / password </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text>Please dont create too many accounts (Username should be in email format)
        Use your real email because they will actually send you an email to verify your account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
