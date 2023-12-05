import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../../../firebase/config";
const VaccineInfo = ({ pregnancyId }) => {
  const [vaccineDetails, setVaccineDetails] = useState([]);
  const [vaccineCount, setVaccineCount] = useState(0);

  useEffect(() => {
    const fetchVaccineDetails = async () => {
      try {
        const vaccineRef = firebase.firestore().collection("vaccine");
        const snapshot = await vaccineRef
          .where("pregnancyId", "==", pregnancyId)
          .get();

        const details = [];
        snapshot.forEach((doc) => {
          details.push({ id: doc.id, ...doc.data() });
        });
        setVaccineDetails(details);
        setVaccineCount(details.length);
      } catch (error) {
        console.error("Error fetching vaccine details: ", error);
      }
    };

    fetchVaccineDetails();
  }, [pregnancyId]);

  const renderVaccineDetails = () => {
    return vaccineDetails.map((vaccine, index) => (
      <View key={index} style={styles.card1}>
        <View style={styles.row1}>
          <Text style={styles.type}>{vaccine.type}</Text>
          <Text>{vaccine.date}</Text>
        </View>
        <View style={styles.row1}>
          <Text>Batch No: {vaccine.batch}</Text>
          <Text>Gestational Weeks: {vaccine.week}</Text>
        </View>
      </View>
    ));
  };

  const a = (vaccineCount / 6) * 20;
  const b = (a / 20) * 100;
  const renderTextWithColor = (index) => {
    if (index < a) {
      return <View style={styles.card2}></View>;
    } else {
      return <View style={styles.card3}></View>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.progress}>Current Vaccine Progress</Text>
        <View style={styles.row}>
          {[...Array(20).keys()].map((index) => (
            <React.Fragment key={index}>
              {renderTextWithColor(index)}
            </React.Fragment>
          ))}
          <Text style={styles.precentage}>{b.toFixed(0)}%</Text>
        </View>
        <Text style={styles.header2}>Vaccine Information</Text>
        {vaccineDetails.length > 0 ? (
          renderVaccineDetails()
        ) : (
          <Text>No vaccine information available</Text>
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
    fontSize: 16,
  },
  precentage: {
    fontSize: 16,
  },
  type: {
    fontSize: 18,
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
    backgroundColor: "#CCCCCC",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    width: 8,
    height: 15,
    alignSelf: "center",
    marginLeft: -8,
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
    justifyContent: "space-around",
    margin: "10%",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default VaccineInfo;
