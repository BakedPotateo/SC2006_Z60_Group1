import React from "react";
import { StyleSheet, Text, View, Image, Button, ImageBackground } from "react-native";
import Header from "./Components/Header";

const ReviewPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <ImageBackground 
    source={require("../assets/LoginBG.png")}
    resizeMode={'cover'}
    style={{flex: 1, width: '100%'}}>
    {/* <Header/> */}
    <View style={styles.reviewContainer}>
      <Image
      source={require("../assets/681-hg-ave-8-carpark.jpg")}
      resizeMode="contain"
      style={styles.carparkPic} 
      />
      <Text style={styles.carparkName}>681 Hougang Ave 8</Text>
      <View style={styles.totalWrap}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
        </View>
        <Text style={styles.rating}>4.7 out of 5</Text>
      </View>
      <Text style={styles.numRatings}>40 customer ratings</Text>
      <Button
      style={styles.addReviewButton}
      title="Add Review"
      // onPress={}   //need to create an onPress handler
      />
    </View>
    </ImageBackground>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F8FF",
      alignItems: "center",
      justifyContent: 'center'
    },
    reviewContainer: {
      backgroundColor: "#FFFFFF",
      marginLeft: "12.5%",
      borderRadius: 10,
      borderColor: '#EEEEEE',
      borderWidth: 1,
      paddingHorizontal: 30,
      paddingVertical: 40,
      width: 300,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1.0,
      shadowRadius: 2,
      shadowColor: "rgba(193, 211, 251, 0.5)",
      elevation: 5,
      alignItems: 'center',
    },
    carparkPic: {
      width: 295,
      height: 200,
      bottom: 40,
      borderRadius: 10
    },
    carparkName: {
      fontWeight: "bold",
      fontSize: 25,
      fontFamily: "roboto-regular",
      color: "#323357",
      textAlign: "center",
    },
    totalWrap: {
      marginTop: 10,
      marginBottom: 5,
      backgroundColor: "#F5F8FF",
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    rating: {
      marginLeft: 25
    },
    numRatings: {
      fontSize: 16,
      color: "#595B71",
      textAlign: "center",
      marginBottom: 20
    },
    addReviewButton: {
      borderRadius: 15,
      // marginTop: 20,
      fontSize: 10
    },
  });

  export default ReviewPage;