import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
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
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={styles.detailText}>Mother Email</Text>
          <Text style={styles.detailText2}>{motherDetails?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>Mother Phone No</Text>
          <Text style={styles.detailText2}>{motherDetails?.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>D.D.H.S Division</Text>
          <Text style={styles.detailText2}>{motherDetails?.DDHS}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>P.H.M Area</Text>
          <Text style={styles.detailText2}>{motherDetails?.PHM}</Text>
        </View>
      </View>
      <View style={styles.card2}>
        <Text style={styles.topic}>Pregnancy</Text>

        <TouchableOpacity
        style={styles.buttonStyle}
        // onPress={() => loginUser(email, password)}
      >
        <Text style={styles.buttonText}>Add Mother Pregnancy</Text>
      </TouchableOpacity>

      </View>
      <Text style={styles.detailText}>Name: {motherDetails?.name}</Text>
      <Text style={styles.detailText}>
        Registered No.: {motherDetails.register_No}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  detailText2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
  },
  topic: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 0,
    
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
    marginLeft: 15,
  },
  headerRNo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: -18,
    marginLeft: 65,
  },
  card: {
    backgroundColor: "#FF25A9",
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    margin: 10,
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    margin: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  Image: {
    width: 50,
    height: 50,
  },
  buttonStyle: {
    backgroundColor: "#57ADF8",
    borderRadius: 10,
    width: 185,
    height: 50,
    margin: 10,
    marginLeft: 0,
    marginBottom: 20,
    borderColor: "#57ADF8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default MotherDetails;
