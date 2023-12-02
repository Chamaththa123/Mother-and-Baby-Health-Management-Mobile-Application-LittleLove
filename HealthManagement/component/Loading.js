import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import MyImage from "../assets/logo.png";

const Loading = ({ route, navigation }) => {
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Image source={MyImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.redText}>Little </Text>
        <Text style={styles.blueText}> Love</Text>
      </View>
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "30%",
    height: "16%",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1%",
  },
  redText: {
    color: "#57ADF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  blueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  text:{
    fontSize:17,
    color:'#FF25A9',
    margin:30
  }
});

export default Loading;
