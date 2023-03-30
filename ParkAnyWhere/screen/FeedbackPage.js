import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ImageBackground, TextInput } from "react-native";
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
        
        <Text style={styles.header}>What's Up</Text>

        <DropDownPicker
          style={styles.dropDown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
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

        <Button
          style={styles.button}
          title='enter'
          //onPress
        />

      </View>
            
        
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30,
    color: "black"
  },
  reviewInput: {
    height: '40%',
    width: '30%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default FeedbackPage;