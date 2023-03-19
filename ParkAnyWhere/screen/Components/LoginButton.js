import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function LoginButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="arrow-long-right" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(23,32,174,1)",
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    alignSelf: "center"
  }
});

export default LoginButton;
