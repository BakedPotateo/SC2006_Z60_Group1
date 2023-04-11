import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { auth, db , signInWithEmailAndPassword ,createUserWithEmailAndPassword ,sendEmailVerification} from '../firebaseConfig';
import { collection, doc, setDoc , query, getDocs} from 'firebase/firestore';

const ProfilePage = ({ navigation }) => {
    const [username, setUsername] = useState([]);
    const [carpark, setCarpark] = useState([]);

    const getUserFromDB = async () => {
        try {
            const customersCollection = collection(db, 'Customers');
            const customersSnapshot = await getDocs(customersCollection);
            const customersData = customersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsername(customersData[0].Username);
            getParkingHistoryFromDB(customersData[0].CustomerID);
          } catch (error) {
            console.error('Error fetching users from Firebase:', error);
          }
    }

    const getParkingHistoryFromDB = async (userID) => {
        try {
            const pHistoryCollection = collection(db, 'ParkingHistory');
            const pHistorySnapshot = await getDocs(pHistoryCollection);
            const pHistoryData = pHistorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const carparkIDs = [];
            for (let i=0; i < pHistoryData.length; i++) {
                if (pHistoryData[i].CustomerID == userID) {
                    carparkIDs.push(pHistoryData[i].CarParkID);
                }
            }
            
            getCarparksFromDB(carparkIDs);
          } catch (error) {
            console.error('Error fetching car parks from Firebase:', error);
          }
    }

    const getCarparksFromDB = async (carparkIDs) => {
        try {
            const carparkCollection = collection(db, 'CarParks');
            const carparkSnapshot = await getDocs(carparkCollection);
            const carparkData = carparkSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const carparkNames = [];
            for (let i=0; i < carparkIDs.length; i++) {
                // Get the entry from the CarPark database based on its carparkID
                // Push the carpark name to the carparkNames array
            }
            
            // Use the setCarpark useState for setting the carpark names in the app
            // Use the carparkNames array to set the names dynamically
        } catch (error) {
            console.error('Error fetching car parks from Firebase:', error);
        }
    }

    getUserFromDB();
    

    return (
        
        <ImageBackground 
            source={require('../assets/LoginBG.png')} 
            style={styles.backgroundImage} 
            resizeMode="stretch"
        >
        <View style={styles.container}>

            <View style={styles.usernameView}>
                <Image 
                source={require("../assets/profile-pic.jpg")}
                resizeMode="contain"
                style={styles.profilePic} 
                />
                <Text style={styles.username}>{username}</Text>
            </View>

            <View style={styles.cardsView}>
                <Card style={styles.leftCard}>
                    <Card.Content>
                        <Text style={styles.leftCardHeaders}>Total Spent</Text>
                        <Text style={styles.leftCardValues}>$38.60</Text>  
                        <Text style={styles.leftCardHeaders}>Total Service</Text>
                        <Text style={styles.leftCardValues}>24</Text> 
                    </Card.Content>
                </Card>

                <Card style={styles.rightCard}>
                    <Card.Content>
                        <Text style={styles.rightCardHeaders}>Reviews Given</Text>
                        <Text style={styles.rightCardValues}>10</Text>  
                    </Card.Content>
                </Card>
            </View>
            


            <View style={styles.BookingHistoryView}>
                <Text style={styles.text}>Booking History</Text>
                <Card>
                    <Card.Content>
                        <View style={styles.carparkCard}>
                            <Image 
                            source={require("../assets/681-hg-ave-8-carpark.jpg")}
                            resizeMode="cover"
                            style={styles.carparkImg}
                            />
                            <View style={styles.carparkCardContent}>
                                <Text style={styles.carparkTitle}>681 Hougang Ave 8</Text>
                                <Text style={styles.carparkCost}>$5.60</Text>
                                <Text>5 Hours 20 Minutes</Text>
                            </View>
                        </View>
                        
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <View style={styles.carparkCard}>
                            <Image 
                            source={require("../assets/serangoon-gardens-carpark.jpg")}
                            resizeMode="cover"
                            style={styles.carparkImg}
                            />
                            <View style={styles.carparkCardContent}>
                                <Text style={styles.carparkTitle}>Serangoon Gardens</Text>
                                <Text style={styles.carparkCost}>$6.10</Text>
                                <Text>3 Hours 5 Minutes</Text>
                            </View>
                        </View>
                        
                    </Card.Content>
                </Card>

                
            </View>
        </View>
        </ImageBackground>
       
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    usernameView: {
        marginTop: 30,
        flexDirection: "row",
        right: 70
    },
    profilePic: {
        left: 0,
        width: 50,
        height: 50,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 8
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cardsView: {
        flexDirection: "row",
    },
    leftCard: {
        margin: 20,
        height: 170,
        width: 150,
        paddingTop: 10,
        backgroundColor: "#fdeeeb",
        justifyContent: 'flex-start',
        borderRadius: 30
    },
    leftCardHeaders: {
        fontSize: 15,
        fontFamily: "roboto-regular",
        fontWeight: "bold"
    },
    leftCardValues: {
        color: "#ED7B7B",
        fontSize: 24,
        fontWeight: "bold"
    },
    rightCard: {
        margin: 20,
        height: 170,
        width: 150,
        paddingTop: 10,
        backgroundColor: "#ED7B7B",
        justifyContent: 'flex-start',
        borderRadius: 30,
    },
    rightCardHeaders: {
        fontSize: 15,
        fontFamily: "roboto-regular",
        fontWeight: "bold",
        color: "#fff"
    },
    rightCardValues: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    BookingHistoryView: {
        width: '100%'
    },
    carparkCard: {
        color: '#fdeeeb',
        flexDirection: "row",
        alignItems: 'center',
    },
    carparkImg: {
        width: 100,
        height: 100,
    },
    carparkCardContent: {
        marginLeft: 15,
    },
    carparkTitle: {
        fontSize: 22,
        paddingBottom: 15
    },
    carparkCost: {
        fontWeight: 'bold'
    }
  });

export default ProfilePage;