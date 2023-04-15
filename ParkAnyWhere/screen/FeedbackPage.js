import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground } from "react-native";
import StarRating from "react-native-star-rating-widget";
import DropDownPicker from "react-native-dropdown-picker";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebaseConfig';
import { collection, doc , getDocs , addDoc, updateDoc , query, where} from 'firebase/firestore';

const FeedbackForm = ({}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [carParks, setCarParks] = useState([]);
  const [selectedCarPark, setSelectedCarPark] = useState('');
  
  const customerID=1;
  console.log(`CustomerID is ${customerID}`);

  useEffect(() => {
    const fetchCarParks = async () => {
      try{
        const parkingHistory = []; //Stores IDs of carparks in ParkingHistory under CustomerID=customerID
        const carParksList = [];

        const parkingHistoryCollection = collection(db, 'ParkingHistory');
        const parkingHistorySnapshot = await getDocs(query(parkingHistoryCollection, where('CustomerID', '==', customerID)));
        const parkingHistoryData = parkingHistorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        for (let parkingHistElement of parkingHistoryData) {
          let temp = parkingHistElement.CarParkID;
          parkingHistory.push(temp);
        }
        const carParksCollection = collection(db, 'CarParks');
        const carParksSnapshot = await getDocs(query(carParksCollection, where('ppCode', 'in', parkingHistory)));
        const carParksData = carParksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        for (let carParkElement of carParksData) {
          for(let parkingHistElement of parkingHistory){
            if(carParkElement.ppCode == parkingHistElement){
              let temp = {label:(carParkElement.ppName), value:(parkingHistory[j])}
              carParksList.push(temp);
            }
          }
        }
  
        setCarParks(carParksList);
        setSelectedCarPark(carParksList.length > 0 ? carParksList[0].value : null);
        

      } catch(error) {
        console.log(`Error fetching parking history for customerID: ${customerID}`);
        
      }
    }
    fetchCarParks();
  }, []);
  
  const updateRating = async () => {
    try{
      const ratingCollection = collection(db, 'Rating');
      //console.log(`Selected CarParkID: ${selectedCarPark}`);
      const ratingSnapshot = await getDocs(query(ratingCollection, where('CarParkID', '==', selectedCarPark)));
      const ratingData = ratingSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      //Creates a new Rating document if none of selectedCarPark found
      if(ratingData.length ==0){
        await addDoc(ratingCollection, {
          CarParkID: selectedCarPark,
          AvgRating: rating,
          ReviewCount: 1
        });
        console.log(`New document in Rating for CarParkID ${selectedCarPark} created!`);
      }else{ //Else calculates new AvgRating and updates it
        const newReviewCount = ratingData[0].ReviewCount + 1;
        const newAvgRating = (ratingData[0].AvgRating + rating) / (newReviewCount);
        console.log(`New average = (${ratingData[0].AvgRating} + ${rating}) / (${newReviewCount}) = ${newAvgRating}`)

        await updateDoc(doc(db, 'Rating', ratingData[0].id), {
          AvgRating: newAvgRating,
          ReviewCount: newReviewCount
        })
        console.log(`AvgRating ${newAvgRating} and ReviewCount ${newReviewCount} updated successfully!`);
      }

    }catch(error){
      console.log(`Error updating Rating for CarParkID ${selectedCarPark}`)
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (rating && comment.trim() !== '' && selectedCarPark) {
      try{
        const feedbackCollection = collection(db, 'Feedback');
        let newFeedbackObject = {
          CarParkID: selectedCarPark,
          CustomerID: customerID,
          comment: comment,
          rating: rating
        };
        await addDoc(feedbackCollection, newFeedbackObject)
      }catch(error){
        console.log(`Error submitting feedback for ${selectedCarPark}`);
      }finally{
          console.log(`Feedback for ${selectedCarPark} submitted successfully!`);
          setComment('');
          setRating(0);
          updateRating();
      }
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
          style={styles.dropDown}
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          value={selectedCarPark}
          setValue={setSelectedCarPark}
          items={carParks}
          setItems={setCarParks}
          containerStyle={{ height: 40, width: '50%' }}
          
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedCarPark(item.value)}
        />
      ) : (
        <Text>No parking history found.</Text>
      )}

      <StarRating
      style={styles.rating} 
      rating={rating} 
      onChange={setRating} 
      />

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
    width: "100%",
    marginTop: "7%",
    marginLeft: "0%",
    marginRight: "0%",
    marginBottom: "30%"
  },

  rating:{
    marginTop: "35%"
  },

  reviewInput: {
    height: "30%",
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