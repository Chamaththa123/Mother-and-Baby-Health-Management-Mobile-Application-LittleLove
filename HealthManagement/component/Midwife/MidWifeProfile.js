import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";

// const headerImage = require("../assets/logo.png");
const Mother = require("../../assets/nurse.png");

const MidWifeProfile = ({ navigation }) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={Mother} style={styles.midwifeImage} />
          <Text style={styles.headerWelcome}>{name.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.btn}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
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
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
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
  btn: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
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

export default MidWifeProfile;
