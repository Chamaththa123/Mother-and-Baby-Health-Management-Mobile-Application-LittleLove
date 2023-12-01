import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet ,Alert,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

const AddPregnancy = ({ route }) => {
  const { motherId } = route.params || { motherId: null };
  const navigation = useNavigation();
  const [motherDetails, setMotherDetails] = useState(null);
  const [babyName, setBabyName] = useState("");
  const [babyAge, setBabyAge] = useState("");

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

  useEffect(() => {
    const fetchMotherDetails = async () => {
      try {
        if (motherId) {
          const doc = await firebase.firestore().collection("users").doc(motherId).get();
          if (doc.exists) {
            setMotherDetails(doc.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Error getting mother details:", error);
      }
    };

    fetchMotherDetails();
  }, [motherId]);

  const handleAddBaby = async () => {
    try {
      if (motherId && babyName && babyAge) {
        await firebase.firestore().collection("babies").add({
          motherId: motherId,
          name: babyName,
          age: babyAge,
        });

        // Show an alert after adding the baby details
        Alert.alert(
          "Success",
          "Baby details added successfully",
          [
            {
              text: "OK",
              onPress: () => {
                setBabyName(""); // Clearing input fields
                setBabyAge("");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error("Invalid data provided");
      }
    } catch (error) {
      console.error("Error adding baby: ", error);
    }
  };


  if (!motherDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Obstetric History</Text>
        <View>
          <Text style={styles.detailText}>01. Date of last menstrual period</Text>
          <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
        </View>
        <View >
          <Text style={styles.detailText}>02. Expected date of birth</Text>
          <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
        </View>
        <View >
          <Text style={styles.detailText}>03. The date of the first felt fetal movement</Text>
          <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
        </View>
        <View >
          <Text style={styles.detailText}>04. Number of gestational weeks at registration</Text>
          <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        // onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
        </View>
        <Text style={styles.detailText}>Mother Name: {motherDetails?.name}</Text>
        <Text style={styles.detailText}>Add Baby:</Text>
        <TextInput
          style={styles.input}
          placeholder="Baby's Name"
          value={babyName}
          onChangeText={(text) => setBabyName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Baby's Age"
          value={babyAge}
          onChangeText={(text) => setBabyAge(text)}
          keyboardType="numeric"
        />
        <Button title="Add Baby" onPress={handleAddBaby} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailText2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  textBoxes: {
    width: "100%",
    fontSize: 16,
    padding: 12,
    borderColor: "#FF25A9",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default AddPregnancy;
