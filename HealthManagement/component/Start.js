import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import MyImage from "../assets/logo.png";

const Start = ({ route, navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.container} onPress={handleLoginPress}>
        <Image source={MyImage} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.redText}>Little </Text>
          <Text style={styles.blueText}> Love</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "400",
    textAlign: "center",
  },
  blueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default Start;
