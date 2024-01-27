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
  Alert,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { firebase } from "../../firebase/config";
import PersonalDetails from "./PersonalDetails";

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

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => {
            console.log("Signing out...");
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log("Sign-out successful");
                navigation.navigate("Start");
              })
              .catch((error) => {
                console.error("Sign-out error:", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [activeSections1, setActiveSections1] = useState([]);

  const SECTIONS1 = [
    {
      title: "Personal Details",
    },
  ];

  const renderHeader1 = (section, _, isActive) => (
    <View style={styles.header_acc}>
      <Text style={styles.headerText_acc}>{section.title}</Text>
    </View>
  );

  const renderContent1 = (section) => <PersonalDetails />;

  const handleQrPress = () => {
    navigation.navigate("QR");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.headerWelcome}>{name.name}</Text>
          <Image source={Mother} style={styles.midwifeImage} />
        </View>
        <Text style={styles.headerName}>{name.email}</Text>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS1}
          activeSections={activeSections1}
          renderHeader={renderHeader1}
          renderContent={renderContent1}
          onChange={setActiveSections1}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle2}
        onPress={handleQrPress}
      >
        <Text style={styles.buttonText2}>QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle2}
      >
        <Text style={styles.buttonText2}>Visit Online Shop</Text>
      </TouchableOpacity>
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
  header_acc: {
    backgroundColor: "#fff",
    padding: 10,
  },
  headerText_acc: {
    fontSize: 18,
    fontWeight: "bold",
  },
  midwifeImage: {
    width: 90,
    height:90,
  },
  headerText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  headerWelcome: {
    fontSize: 22,
    color: "#403A3A",
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
    color: "#403A3A",
    marginTop:-40,
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
    marginBottom:30
  },
  accordion: {
    marginTop: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#FF25A9",
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: 100,
    height: 50,
    marginTop: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle2: {
    // backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: "95%",
    height: 60,
    marginTop: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
    justifyContent: "center",
    margin:10
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MotherProfile;
