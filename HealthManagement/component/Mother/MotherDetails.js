import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

const Mother = require("../../assets/mother.png");
const MotherDetails = ({ route }) => {
  const navigation = useNavigation();

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
        title: `${motherDetails?.name}'s Profile`,
        headerTitleAlign: "center",
      });
    }
  }, [motherDetails, navigation]);

  if (!motherDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
          <Image source={Mother} style={styles.Image} />
            <Text style={styles.headerName}>{motherDetails?.name}</Text>
          </View>
          <Text style={styles.headerRNo}>{motherDetails.register_No}</Text>
        </View>
      <Text style={styles.detailText}>Name: {motherDetails?.name}</Text>
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
    backgroundColor: "white",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
    marginLeft:15
  },
  headerRNo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: -18,
    marginLeft:65
  },
  card: {
    backgroundColor: "#FF25A9",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    margin: 10,
    alignSelf:'center'
  },
  card2: {
    backgroundColor: "#fff",
    borderWidth:1,
    borderColor:'#FF25A9',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    margin: 10,
    alignSelf:'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  Image: {
    width: 50,
    height: 50,
  },
});

export default MotherDetails;
