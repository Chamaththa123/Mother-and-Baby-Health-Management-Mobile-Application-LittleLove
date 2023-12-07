import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../../../firebase/config";

const ClinicInfo = ({ pregnancyId }) => {
  const [clinicDetails, setClinicDetails] = useState([]);

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        const clinicRef = firebase.firestore().collection("clinicdetails");
        const snapshot = await clinicRef
          .where("pregnancyId", "==", pregnancyId)
          .get();

        const details = [];
        snapshot.forEach((doc) => {
          details.push({ id: doc.id, ...doc.data() });
        });
        setClinicDetails(details);
      } catch (error) {
        console.error("Error fetching Clinic details: ", error);
      }
    };

    fetchClinicDetails();
  }, [pregnancyId]);

  const renderClinicDetails = () => {
    const sortedClinicDetails = clinicDetails.slice().sort((a, b) => {
      return parseInt(b.week) - parseInt(a.week);
    });

    return sortedClinicDetails.map((clinic, index) => (
      <View key={index} style={styles.card1}>
        <View style={styles.row1}>
          <Text style={styles.type}>Gestational Weeks:{clinic.week}</Text>
          <Text>{clinic.date}</Text>
        </View>
        <View style={styles.row1}>
          <Text>Blood Pressure: {clinic.bp} Hgmm</Text>
          <Text>Fundal Height: {clinic.f_weight} cm</Text>
        </View>
        <Text>Fundal Height: {clinic.f_weight} cm</Text>
        <View style={styles.row}>
          <Text>
            Oedema
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <View
            style={[
              styles.card3,
              {
                backgroundColor:
                  clinic.oedema === "1"
                    ? "#00FF00"
                    : clinic.oedema === "0"
                    ? "#FF0000"
                    : "#CCCCCC",
              },
            ]}
          ></View>
        </View>
        <View style={styles.row}>
          <Text>
            Fetal Movements &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <View
            style={[
              styles.card3,
              {
                backgroundColor:
                  clinic.fm === "1"
                    ? "#00FF00"
                    : clinic.fm === "0"
                    ? "#FF0000"
                    : "#CCCCCC",
              },
            ]}
          ></View>
        </View>
        <View style={styles.row}>
          <Text>
            Fetal hart Sounds&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
          <View
            style={[
              styles.card3,
              {
                backgroundColor:
                  clinic.fhs === "1"
                    ? "#00FF00"
                    : clinic.fhs === "0"
                    ? "#FF0000"
                    : "#CCCCCC",
              },
            ]}
          ></View>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header2}>Clinic Information</Text>
        {clinicDetails.length > 0 ? (
          renderClinicDetails()
        ) : (
          <Text>No Clinic information available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  progress: {
    fontSize: 16,
    marginBottom: "-3%",
  },
  header2: {
    fontSize: 17,
    fontWeight: "bold",
  },
  precentage: {
    fontSize: 16,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#57ADF8",
  },
  card1: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    margin: 10,
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "#00FF00",
    borderWidth: 1,
    borderColor: "#00FF00",
    borderRadius: 10,
    width: 8,
    height: 15,
    alignSelf: "center",
    marginLeft: -8,
  },
  card3: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    width: 30,
    height: 12,
    alignSelf: "center",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: 60,
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  coloredText: {
    marginRight: 10,
    color: "red", // Change this to your preferred color
  },
  defaultText: {
    marginRight: 10,
    color: "black", // Change this to your default color
  },
});
export default ClinicInfo;
