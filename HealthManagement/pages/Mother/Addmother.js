import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const Addmother = () => {
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "Create Mother Profile",
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container1}>
      
      <Text style={styles.inputDetails}>Mother Email</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.inputDetails}>Mother Name</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      /><Text style={styles.inputDetails}>Mother Registered No</Text>
      <TextInput
        placeholder="Enter Registered No"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      /><Text style={styles.inputDetails}>DDHS Division</Text>
      <TextInput
        placeholder="Enter DDHS Division"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      /><Text style={styles.inputDetails}>PHM Area</Text>
      <TextInput
        placeholder="Enter PHM Area"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      /><Text style={styles.inputDetails}>Mother Address</Text>
      <TextInput
        placeholder="Enter Address"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.inputDetails}>Mother Occupation</Text>
      <TextInput
        placeholder="Enter Occupation"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.inputDetails}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        // secureTextEntry={!showPassword}
        style={styles.textBoxes}
        // value={password}
        // onChangeText={(password) => setPassword(password)}
        autoCorrect={false}
      />
      
      
      <TouchableOpacity
        // onPress={() => loginUser(email, password)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    container1: {
      flexGrow: 1, // Allows the content to expand within the ScrollView
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "left",
    },
    buttonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
    },
    inputDetails: {
      fontSize: 15,
      marginLeft: "5%",
      marginTop: "3%",
      marginBottom: "-3%",
      textAlign: "left",
    },
    textBoxes: {
      width: "90%",
      fontSize: 16,
      padding: 12,
      borderColor: "#FF25A9",
      borderWidth: 1,
      borderRadius: 10,
      margin: 20,
      marginBottom: "2%",
      marginLeft: 20,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    buttonStyle: {
      backgroundColor: "#FF25A9",
      padding: 13,
      borderRadius: 10,
      width: "90%",
      height: 50,
      margin: 10,
      marginLeft: 20,
      marginBottom: 20,
      borderColor: "#FF25A9",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
  });

export default Addmother