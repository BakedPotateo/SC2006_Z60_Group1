import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground } from "react-native";
import StarRating from "react-native-star-rating-widget";
import DropDownPicker from "react-native-dropdown-picker";
import { db } from '../firebaseConfig';

const FeedbackForm = ({ customerID }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [carParks, setCarParks] = useState([]);
  const [selectedCarPark, setSelectedCarPark] = useState(null);
  
  useEffect(() => {
    const fetchCarParks = async () => {
      const parkingHistorySnapshot = await db.collection('ParkingHistory')
        .where('CustomerID', '==', customerID)
        .get();
      const carParkIDs = parkingHistorySnapshot.docs.map(doc => doc.data().CarParkID);

      const carParksSnapshot = await db.collection('CarParks')
        .where('ppCode', 'in', carParkIDs)
        .get();
      const carParksList = carParksSnapshot.docs.map(doc => {
        const data = doc.data();
        return { label: data.ppName, value: data.ppCode };
      });

      setCarParks(carParksList);
      setSelectedCarPark(carParksList.length > 0 ? carParksList[0].value : null);
    };

    fetchCarParks();
  }, [customerID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating && comment.trim() !== '' && selectedCarPark) {
      db.collection('Feedback').add({
        CarParkID: selectedCarPark,
        CustomerID: customerID,
        comment: comment,
        rating: rating
      })
      .then(() => {
        console.log('Feedback submitted successfully!');
        setComment('');
        setRating(0);
      })
      .catch((error) => {
        console.error('Error submitting feedback: ', error);
      });
    }
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require("../assets/LoginBG.png")}
        resizeMode={"stretch"}
        style={styles.backgroundImage}
        imageStyle={styles.imageBG}
      ></ImageBackground>

      <View style={styles.content}></View>

      <Text style={styles.header}>What's Up</Text>

      {carParks.length > 0 ? (
        <DropDownPicker
          items={carParks}
          defaultValue={selectedCarPark}
          containerStyle={{ height: 40, width: '50%' }}
          style={styles.dropDown}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedCarPark(item.value)}
        />
      ) : (
        <Text>Loading car parks...</Text>
      )}

      <StarRating rating={rating} onChange={setRating} />

      <TextInput
        style={styles.reviewInput}
        multiline
        onChangeText={setComment}
        value={comment}
        placeholder="Tell us about it"
      />

      <Pressable 
      style={styles.button}
      onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>         
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    marginTop: "20%",
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    fontSize: 35,
    color: "black",
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    color: "#ED7B7B",
  },

  dropDown: {
    width: "50%",
    marginTop: "7%",
    marginLeft: "25%",
    marginBottom: "7%"
  },

  reviewInput: {
    height: "40%",
    width: "50%",
    margin: "7%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ED7B7B",
    marginBottom: "30%"
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "roboto-regular",
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "#fff",
  },
});

export default FeedbackForm;