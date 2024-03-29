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
import { firebase } from "../firebase/config";

const headerImage = require("../assets/logo.png");
const Mother = require("../assets/mother.png");

const Homepage1 = ({ navigation }) => {
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
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={headerImage}
            style={{
              width: 60,
              height: 60,
              marginLeft: 10,
              marginTop: 15,
              marginBottom: 15,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "#57ADF8",
              fontSize: 23,
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            Little
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FF25A9",
              fontSize: 23,
              marginTop: 30,
            }}
          >
            {" "}
            Love
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  const handleImagePress = () => {
    navigation.navigate("MotherProfile");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.headerWelcome}>Welcome</Text>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={Mother} style={styles.midwifeImage} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerName}>{name.name}</Text>
      </View>
      {/* Add more components or views here */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0268C2",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerImage: {
    marginTop: "10%",
    width: 100,
    height: 70,
  },
  midwifeImage: {
    width: 90,
    height: 90,
  },
  headerText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  headerWelcome: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: 30,
  },
  headerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginTop: "-10.9%",
    marginBottom:15
  },
  card: {
    backgroundColor: "#FF25A9",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "94%",
    margin: 10,
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

export default Homepage1;
