import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { firebase } from "../../firebase/config";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 0, 0,  ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#FF0000",
  },
};

const BP = ({ pregnancyId }) => {
  const [clinicDetails, setClinicDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width - 15;

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
        details.sort((a, b) => parseInt(a.week) - parseInt(b.week));
        setClinicDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Clinic details: ", error);
        setLoading(false);
      }
    };

    if (pregnancyId) {
      fetchClinicDetails();
    }
  }, [pregnancyId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (clinicDetails.length === 0) {
    return <Text>No data available</Text>;
  }

  const chartData = {
    labels: clinicDetails.map((detail) => detail.week),
    datasets: [
      {
        data: clinicDetails.map((detail) => {
          const bpValue = parseFloat(detail.bp); // Convert to float
          return isNaN(bpValue) ? 0 : bpValue; // Check for NaN and handle it
        }),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <Text style={styles.header}>Blood Pressure</Text>
      <View style={{ marginTop: 10, marginLeft: -10 }}>
        <LineChart
          data={chartData}
          width={windowWidth}
          height={700}
          chartConfig={chartConfig}
        />
      </View>
      <Text style={styles.rotatedText}>Blood Pressure (Hgmm)</Text>
      <Text style={styles.xaxios}>Gestational Duration in Weeks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  xaxios: {
    fontSize: 12,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 305,
  },
  rotatedText: {
    transform: [{ rotate: "270deg" }],
    alignSelf: "flex-start",
    marginTop: -450,
    marginLeft: -60,
    fontSize: 12,
  },
});

export default BP;
