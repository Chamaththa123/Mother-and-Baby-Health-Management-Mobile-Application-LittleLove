import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { firebase } from "../firebase/config";

const headerImage = require("../assets/logo.png");
const Midwife = require("../assets/nurse.png");

const Homepage2 = ({ navigation }) => {
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
    navigation.navigate("MidWifeProfile");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.headerWelcome}>Welcome</Text>
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={Midwife} style={styles.midwifeImage} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerName}>{name.email}</Text>
        </View>

        <Text style={styles.text1}>Manage Mothers & Babies</Text>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.menucard}
            onPress={() => navigation.navigate("Addmother")}
          >
            <Text style={styles.cardText}>Create Mother Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menucard}
            onPress={() => navigation.navigate("MotherList")}
          >
            <Text style={styles.cardText}>All Mothers</Text>
          </TouchableOpacity>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>Scan Mother QR</Text>
          </View>
        </View>

        <Text style={styles.text1}>Manage Midwives & Nurses</Text>
        <View style={styles.row2}>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>
              Create Midwife & Nurse Profile
            </Text>
          </View>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>All Midwives & Nurses</Text>
          </View>
          <View style={{ marginLeft: 100 }}>
            <Text style={styles.cardText}></Text>
          </View>
        </View>

        <Text style={styles.text1}>
          Manage Special Medical Events & Notices
        </Text>
        <View style={styles.row2}>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>
              Add Special Medical Events & Notices
            </Text>
          </View>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>
              All Special Medical Events & Notices
            </Text>
          </View>
          <View style={{ marginLeft: 100 }}>
            <Text style={styles.cardText}></Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 20,
    flex:1
  },
  headerWelcome: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
  },
  headerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: "-4.9%",
  },
  card: {
    backgroundColor: "#FF25A9",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "94%",
    margin: 10,
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
  text1: {
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: 30,
  },
  midwifeImage: {
    width: 50,
    height: 50,
  },
});

export default Homepage2;
