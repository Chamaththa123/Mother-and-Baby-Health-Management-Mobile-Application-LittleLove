import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

const MotherDetails = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 20,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: motherDetails.name+"'s Profile",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const [motherDetails, setMotherDetails] = useState(null);

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

  if (!motherDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Name: {motherDetails.name}</Text>
      <Text style={styles.detailText}>
        Registered No.: {motherDetails.register_No}
      </Text>
      {/* Add other details you want to display */}
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
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MotherDetails;
