import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ImageBackground, TextInput, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import StarRating from "react-native-star-rating-widget";


const FeedbackPage = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'CarparkA', value: 'Carpark A'},
        {label: 'Carpark B', value: 'Carpark B'},
        {label: 'Carpark C', value: 'Carpark C'}
      ]);

      const [rating, setRating] = useState(0);

      const [review, setReview] = useState('');

    return (
      <View style={styles.container}>

        <ImageBackground
          source={require("../assets/LoginBG.png")}
          resizeMode={"stretch"}
          style={styles.backgroundImage}
          imageStyle={styles.imageBG}
        >
        
        <View style={styles.content}>

          <Text style={styles.header}>What's Up</Text>

          <DropDownPicker
            containerProps={{
              height: open === true ? 220 : null,
            }}
            style={styles.dropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="choose a carpark"
          />

          <StarRating
            rating={rating}
            onChange={setRating}
          />

          <TextInput
            style={styles.reviewInput}
            onChangeText={setReview}
            value={review}
            placeholder='tell us about it'
          />

          {/* add onPress handler */}
          <Pressable style={styles.button}> 
            <Text style={styles.buttonText}>enter</Text>
          </Pressable>
          {/* <Button
            buttonStyle={styles.button}
            color= "#ED7B7B"
            title='enter'
            //onPress
          /> */}
        
        </View>

        </ImageBackground>

      </View>
            
        
    )
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    width: "100%",
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
    height: '40%',
    width: '50%',
    margin: "7%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
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
})

export default FeedbackPage;