import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";

const PersonalDetails = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Registered No</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{name.register_No}</Text>
        </View>
        <Text style={styles.label}>Mother Name</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{name.name}</Text>
        </View>
        <Text style={styles.label}>Registered Email</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{name.email}</Text>
        </View>
        <Text style={styles.label}>D.D.H.S Division</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{name.DDHS}</Text>
        </View>
        <Text style={styles.label}>P.H.M Area</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{name.PHM}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#FF25A9",
    borderWidth: 1,
    width: "100%",
  },
  detailText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default PersonalDetails;
