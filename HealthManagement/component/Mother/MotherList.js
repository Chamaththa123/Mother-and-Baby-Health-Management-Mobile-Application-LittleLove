import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";

const MotherList = () => {

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
          title: "All Mothers List",
          headerTitleAlign: 'center',
        });
      }, [navigation]);
      
  
  const [mothersList, setMothersList] = useState([]);

  const getMothersList = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .where("role", "==", 0) // Assuming role 0 identifies mothers
        .get();

      const mothers = [];
      snapshot.forEach((doc) => {
        mothers.push({ id: doc.id, ...doc.data() });
      });

      setMothersList(mothers);
    } catch (error) {
      console.log("Error getting mothers list:", error);
    }
  };

  useEffect(() => {
    getMothersList();
  }, []);

  const renderMothers = () => {
    return mothersList.map((mother) => (
      <TouchableOpacity key={mother.id} style={styles.motherItem}>
        <Text style={styles.motherName}>{mother.name}</Text>
        {/* Display additional details here if needed */}
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <ScrollView style={styles.scrollView}>{renderMothers()}</ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
  },
  motherItem: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf:'center',
    borderWidth:1,
    borderColor:'#FF25A9'
  },
  motherName: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MotherList;
