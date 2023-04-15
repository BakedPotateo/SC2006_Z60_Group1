import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { Card } from "react-native-paper";

import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ProfilePage = ({ navigation }) => {
    const [username, setUsername] = useState([]);
    const [spent, setSpent] = useState([]);
    const [service, setService] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [carpark, setCarpark] = useState([]);

    const getUserFromDB = async () => {
        try {
            const customersCollection = collection(db, 'Customers');
            const customersSnapshot = await getDocs(customersCollection);
            const customersData = customersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsername(customersData[0].Username);
            getParkingHistoryFromDB(customersData[0].CustomerID);
            getFeedbackFromDB(customersData[0].CustomerID)
          } catch (error) {
            console.error('Error fetching users from Firebase:', error);
          }
    }

    const getFeedbackFromDB = async (userID) => {
        try {
            const feedbackCollection = collection(db, 'Feedback');
            const feedbackSnapshot = await getDocs(feedbackCollection);
            const feedbackData = feedbackSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const feedback = []
            for (let i=0; i < feedbackData.length; i++) {
                if (feedbackData[i].CustomerID == userID)
                    feedback.push(feedbackData[i])
            }

            setFeedback(feedback.length)
          } catch (error) {
            console.error('Error fetching feedback from Firebase:', error);
          }
    }

    const getParkingHistoryFromDB = async (userID) => {
        try {
            const pHistoryCollection = collection(db, 'ParkingHistory');
            const pHistorySnapshot = await getDocs(pHistoryCollection);
            const pHistoryData = pHistorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const parkingHistory = [];
            for (let i=0; i < pHistoryData.length; i++) {
                if (pHistoryData[i].CustomerID == userID) {
                    const temp = {
                        'ID': pHistoryData[i].CarParkID,
                        'DurationParked': (pHistoryData[i].EndDateTime - pHistoryData[i].StartDateTime)/3600
                    }
                    parkingHistory.push(temp);
                }
            }
        
            getCarparksFromDB(parkingHistory);
          } catch (error) {
            console.error('Error fetching car parks from Firebase:', error);
          }
    }

    const getCarparksFromDB = async (parkingHistory) => {
        try {
            const carparkCollection = collection(db, 'CarParks');
            const carparkSnapshot = await getDocs(carparkCollection);
            const carparkData = carparkSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));  

            const carparkInfos = [];
            var totalSpent = 0.00;
            for (let i=0; i < parkingHistory.length; i++) {
                for (let j=0; j < carparkData.length; j++) {
                    if (carparkData[j].id == parkingHistory[i].ID) {
                        let timeStr = calculateTime(parkingHistory[i].DurationParked);
                        var temp = {
                            'Name': carparkData[j].ppName,
                            'Spent': (Number(carparkData[i].weekdayRate.replace(/[^0-9.-]+/g,"")) * parkingHistory[i].DurationParked).toFixed(2),
                            'Duration': timeStr._j
                        };
                        carparkInfos.push(temp);
                        totalSpent += parseFloat(temp.Spent); 
                    }
                }  
            }
            
            setCarpark(carparkInfos);
            setService(carparkInfos.length);
            setSpent(totalSpent.toFixed(2))
        } catch (error) {
            console.error('Error fetching car parks from Firebase:', error);
        }
    }

    // Convert "time in hours" to "time in hours and mins"
    const calculateTime = async (DurationParked) => {
        let hrs = 0;
        let mins = 0;
        while (DurationParked > 1) {
            hrs += 1;
            DurationParked -= 1;
        }
        mins = Math.round(DurationParked * 60);
        if (mins == 60) {
            mins = 0;
            hrs++;
        }
        let timeStr = hrs + " Hours " + mins + " Minutes";
        return timeStr;
    }

    getUserFromDB();

    // Dynamically create the number of carpark cards and populate the content of the cards
    var dynamicCarparks = [];
    for (let i=0; i < carpark.length; i++) {
        dynamicCarparks.push(
            <Card key={i}>
                <Card.Content>
                    <View style={styles.carparkCard}>
                        <Image 
                        source={require("../assets/parking-lot.jpg")}
                        resizeMode="cover"
                        style={styles.carparkImg}
                        />
                        <View style={styles.carparkCardContent}>
                            <Text style={styles.carparkTitle}>{carpark[i].Name}</Text>
                            <Text style={styles.carparkCost}>${carpark[i].Spent}</Text>
                            <Text>{carpark[i].Duration}</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        )
    }
    

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
                        <Text style={styles.leftCardValues}>${spent}</Text>  
                        <Text style={styles.leftCardHeaders}>Total Service</Text>
                        <Text style={styles.leftCardValues}>{service}</Text> 
                    </Card.Content>
                </Card>

                <Card style={styles.rightCard}>
                    <Card.Content>
                        <Text style={styles.rightCardHeaders}>Reviews Given</Text>
                        <Text style={styles.rightCardValues}>{feedback}</Text>  
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.BookingHistoryView}>
                <Text style={styles.text}>Booking History</Text>
                {dynamicCarparks}
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
      paddingLeft: '5%'
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