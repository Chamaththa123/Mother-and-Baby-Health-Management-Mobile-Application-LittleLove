import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

const AddPregnancy = ({ route }) => {
  const { motherId } = route.params;
  const navigation = useNavigation();
  const [motherDetails, setMotherDetails] = useState([]);

  //set header
  useEffect(() => {
    if (motherDetails) {
      navigation.setOptions({
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#57ADF8",
          fontSize: 20,
        },
        headerTintColor: "#57ADF8",
        headerShown: true,
        title: `Add ${motherDetails?.name}'s Pregnancy`,
        headerTitleAlign: "center",
      });
    }
  }, [motherDetails, navigation]);

  //fetch mother details
  useEffect(() => {
    const { motherId } = route.params;

    const fetchMotherDetails = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(motherId)
          .get();
        if (doc.exists) {
          setMotherDetails(doc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting mother details:", error);
      }
    };

    fetchMotherDetails();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Mother ID: {motherId}</Text>
      <Text style={styles.detailText}>Mother Name: {motherDetails?.name}</Text>
      {/* Display other details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default AddPregnancy;
