import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../firebase/config";
import MyImage from "../../../assets/logo.png";

const PregnancyDetails = ({ route }) => {
  const navigation = useNavigation();
  const { pregnancyId } = route.params;
  const [PregnancyDetails, setPregnancyDetails] = useState(null);

  useEffect(() => {
    const fetchPregnancyDetails = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection("pregnancy")
          .doc(pregnancyId)
          .get();
        if (doc.exists) {
          setPregnancyDetails(doc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting mother details:", error);
      }
    };

    fetchPregnancyDetails();
  }, [pregnancyId]);

  useEffect(() => {
    if (PregnancyDetails) {
      navigation.setOptions({
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#57ADF8",
          fontSize: 20,
        },
        headerTintColor: "#57ADF8",
        headerShown: true,
        title: `${PregnancyDetails?.time} - Pregnancy`,
        headerTitleAlign: "center",
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [PregnancyDetails, navigation]);

  if (!PregnancyDetails) {
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.header}>Obstetric History</Text>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            Date of last menstrual period
          </Text>
          <View style={styles.card2}>
            <Text style={styles.detailText}>01/01</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Expected period of delivery
          </Text>
          <View style={styles.card2}>
            <Text style={styles.detailText}>01/01</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          The date of the first felt fetal movement
          </Text>
          <View style={styles.card2}>
            <Text style={styles.detailText}>01/01</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Number of gestational weeks at registration
          </Text>
          <View style={styles.card2}>
            <Text style={styles.detailText}>01/01</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card1,{marginTop:5}]}>
        <Text style={styles.header}>Risk Conditions</Text>
        <Text style={styles.header2}>Previous Pregnancies</Text>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Previous abortions
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.abortions === "1" ? '#00FF00' : '#FF0000' }]}>
            
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Gestational diseases
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.Gestational === "1" ? '#00FF00' : '#FF0000' }]}>
          </View>
        </View>
        <Text style={styles.header2}>Presnet Pregnancy</Text>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Antepartum vaginal bleeding
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.Antepartum === "1" ? '#00FF00' : '#FF0000' }]}>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Multiple pregnancy
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.Multiple === "1" ? '#00FF00' : '#FF0000' }]}>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Casual position
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.Casual === "1" ? '#00FF00' : '#FF0000' }]}>
      
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
          Others
          </Text>
          <View style={[styles.card3, { backgroundColor: PregnancyDetails.Antepartum === "1" ? '#00FF00' : '#FF0000' }]}>
            
          </View>
        </View>
      </View>

      <View style={[styles.card1,{marginTop:5}]}>
        <Text></Text>
        <Text style={styles.header2}>Presnet Pregnancy</Text>
        
      </View>
    </ScrollView>
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
  },
  card1: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 20,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
    width: "95%",
    margin: 10,
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: -5,
    padding: 2,
    borderRadius: 10,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  card3: {
    width: 20,
    height:10,
    marginTop: 5.5,
    borderRadius: 10,
    margin: 10,
  },
  header: {
    fontSize: 18,
    color: "#FF25A9",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom:10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header2: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#57ADF8",
  },
});
export default PregnancyDetails;
