import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ProfilePage = ({ navigation }) => {
    return (
        
        <View style={styles.container}>

            <View style={styles.usernameView}>
                <Image 
                source={require("../assets/profile-pic.jpg")}
                resizeMode="contain"
                style={styles.profilePic} 
                />
                <Text style={styles.username}>Username123</Text>
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
       
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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