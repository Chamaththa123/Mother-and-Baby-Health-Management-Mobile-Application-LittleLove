import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase/config";

const headerImage = require("../../assets/logo.png");
const Mother = require("../../assets/mother.png");

const MotherProfile = ({ navigation }) => {
  const [name, setName] = useState({});

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 20,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "My Profile",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const handleImagePress = () => {
    navigation.navigate("MotherProfile");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.headerWelcome}>{name.name}</Text>
          <Image source={Mother} style={styles.midwifeImage} />
        </View>
        <Text style={styles.headerName}>{name.email}</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerImage: {
    marginTop: "10%",
    width: 70,
    height: 70,
  },
  midwifeImage: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  headerWelcome: {
    fontSize: 19,
    color: "#FF25A9",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: 30,
  },
  headerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF25A9",
    marginTop: "-4.9%",
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "94%",
    margin: 10,
    borderWidth: 1,
    borderColor: "#FF25A9",
  },
  menucard: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: 100,
    borderWidth: 1,
    borderColor: "#57ADF8",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#616161",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default MotherProfile;
