import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import LoginButton from "./Components/LoginButton";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.createAccount}>Create Account</Text>
      <View style={styles.icon1Row}>
        <FontAwesomeIcon name="lock" style={styles.icon1}></FontAwesomeIcon>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.password1}
        ></TextInput>
      </View>
      <View style={styles.icon2Row}>
        <FeatherIcon name="user" style={styles.icon2}></FeatherIcon>
        <TextInput
          placeholder="Username"
          style={styles.placeholder1}
        ></TextInput>
      </View>
      <View style={styles.icon3Row}>
        <EntypoIcon name="mail" style={styles.icon3}></EntypoIcon>
        <TextInput placeholder="E-mail" style={styles.eMail}></TextInput>
      </View>
      <View style={styles.icon4Row}>
        <EntypoIcon name="mobile" style={styles.icon4}></EntypoIcon>
        <TextInput
          placeholder="Mobile"
          keyboardType="numeric"
          dataDetector="phoneNumber"
          style={styles.mobile}
        ></TextInput>
      </View>
      <View style={styles.create4Row}>
        <Text style={styles.create4}>Create</Text>
        <View style={styles.loginButtonStack}>
          <LoginButton style={styles.loginButton}></LoginButton>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
            style={styles.button}
          ></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.loremIpsum}>
        Or create account using social media
      </Text>
      <View style={styles.icon5Row}>
        <EntypoIcon
          name="facebook-with-circle"
          style={styles.icon5}
        ></EntypoIcon>
        <MaterialCommunityIconsIcon
          name="twitter-circle"
          style={styles.icon6}
        ></MaterialCommunityIconsIcon>
        <MaterialCommunityIconsIcon
          name="google"
          style={styles.icon7}
        ></MaterialCommunityIconsIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    createAccount: {
        fontFamily: "arial-regular",
        color: "#121212",
        height: 62,
        width: 184,
        fontSize: 25,
        marginTop: 126,
        marginLeft: 88
    },
    icon1: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginTop: 7
    },
    password1: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 152,
        marginLeft: 17
    },
    icon1Row: {
        height: 34,
        flexDirection: "row",
        marginTop: 77,
        marginLeft: 90,
        marginRight: 88
    },
    icon2: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginTop: 7
    },
    placeholder1: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 34,
        width: 152,
        marginLeft: 12
    },
    icon2Row: {
        height: 34,
        flexDirection: "row",
        marginTop: -101,
        marginLeft: 88,
        marginRight: 88
    },
    icon3: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginTop: 11
    },
    eMail: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 45,
        width: 121,
        marginLeft: 14
    },
    icon3Row: {
        height: 45,
        flexDirection: "row",
        marginTop: 93,
        marginLeft: 88,
        marginRight: 117
    },
    icon4: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginTop: 8
    },
    mobile: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 39,
        width: 100,
        marginLeft: 12
    },
    icon4Row: {
        height: 39,
        flexDirection: "row",
        marginTop: 22,
        marginLeft: 88,
        marginRight: 140
    },
    create4: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 39,
        width: 67,
        fontSize: 20
    },
    loginButton: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 42,
        height: 26
    },
    button: {
        top: 0,
        left: 0,
        width: 42,
        height: 26,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        opacity: 0
    },
    loginButtonStack: {
        width: 42,
        height: 26
    },
    create4Row: {
        height: 39,
        flexDirection: "row",
        marginTop: 51,
        marginLeft: 205,
        marginRight: 46
    },
    loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 12,
        marginTop: 53,
        marginLeft: 84
    },
    icon5: {
        color: "rgba(18,30,215,1)",
        fontSize: 40
    },
    icon6: {
        color: "rgba(50,178,230,1)",
        fontSize: 40,
        marginLeft: 22,
        marginTop: 1
    },
    icon7: {
        color: "rgba(207,43,30,1)",
        fontSize: 40,
        marginLeft: 22,
        marginTop: 1
    },
    icon5Row: {
        height: 44,
        flexDirection: "row",
        marginTop: 22,
        marginLeft: 100,
        marginRight: 96
    }
});

export default SignUpScreen;
