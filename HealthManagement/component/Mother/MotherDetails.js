import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";
import MyImage from "../../assets/logo.png";

const Mother = require("../../assets/mother.png");
const Pregnancy = require("../../assets/prenatal-care.png");

const MotherDetails = ({ route }) => {
  const navigation = useNavigation();
  const { motherId } = route.params;
  const [motherDetails, setMotherDetails] = useState(null);
  const [pregnancyDetails, setPregnancyDetails] = useState([]);
  useEffect(() => {
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
  }, [motherId]);

  useEffect(() => {
    const fetchPregnancyDetails = async () => {
      try {
        if (motherId) {
          const snapshot = await firebase
            .firestore()
            .collection("pregnancy")
            .where("motherId", "==", motherId)
            .get();

          const details = [];
          snapshot.forEach((doc) => {
            details.push({ id: doc.id, ...doc.data() });
          });
          setPregnancyDetails(details);
        }
      } catch (error) {
        console.log("Error fetching pregnancy details:", error);
      }
    };

    fetchPregnancyDetails();
  }, [motherId]);

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
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [motherDetails, navigation]);

  if (!motherDetails) {
    return (
      <View style={styles.Lcontainer}>
        <Image source={MyImage} style={styles.Limage} />
        <View style={styles.LtextContainer}>
          <Text style={styles.LredText}>Little </Text>
          <Text style={styles.LblueText}> Love</Text>
        </View>
        <Text style={styles.Ltext}>Loading</Text>
      </View>
    );
  }

  //handle addpregnancy
  const handleAddPregnancy = () => {
    navigation.navigate("AddPregnancy", { motherId });
  };

  // handle pregnancy click
  const handlePregnancyClick = (pregnancyId) => {
    navigation.navigate("PregnancyDetails", { pregnancyId });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={Mother} style={styles.Image} />
          <Text style={styles.headerName}>{motherDetails?.name}</Text>
        </View>
        <Text style={styles.headerRNo}>{motherDetails.register_No}</Text>
      </View>
      <View style={{marginTop:20}}>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            Email
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <Text style={styles.detailText2}>{motherDetails?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            Phone
            No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <Text style={styles.detailText2}>{motherDetails?.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>D.D.H.S Division</Text>
          <Text style={styles.detailText2}>{motherDetails?.DDHS}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            P.H.M
            Area&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <Text style={styles.detailText2}>{motherDetails?.PHM}</Text>
        </View>
      </View>

      {/* mother preganacy */}
      <View>
        <View style={styles.row1}>
          <Text style={styles.topic}>Pregnancy Period</Text>
        </View>
        <Text  style={styles.info}>(Use add button to add pregnancy details)</Text>
        {pregnancyDetails.map((detail) => (
          <TouchableOpacity
            key={detail.id}
            style={styles.card3}
            onPress={() => handlePregnancyClick(detail.id)}
          >
            <View style={styles.row}>
              <Image source={Pregnancy} style={styles.Image2} />
              <Text style={styles.detailText3}>Pregnancy {detail.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    <View style={styles.footer}>
    <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleAddPregnancy}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Lcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Limage: {
    width: "30%",
    height: "16%",
  },
  LtextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1%",
  },
  LredText: {
    color: "#57ADF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  LblueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  Ltext: {
    fontSize: 22,
    color: "#FF25A9",
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding:10
  },
  scrollContainer: {
    flex: 1,
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailText2: {
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 30,
    marginTop: 10,
  },
  detailText3: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 6,
  },
  topic: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 20,
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
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 10,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
  },
  card3: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 0,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: "#fff",
    padding: 1,
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
  },
  info:{
    margin:0,
    marginBottom:20,
    marginLeft:0,
    fontSize:13
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Image: {
    width: 50,
    height: 50,
  },
  Image2: {
    width: 35,
    height: 35,
  },
  buttonStyle: {
    backgroundColor: "#57ADF8",
    borderRadius: 10,
    width: 60,
    height: 50,
    marginLeft: 0,
    marginBottom: 5,
    borderColor: "#57ADF8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'flex-end'
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default MotherDetails;
