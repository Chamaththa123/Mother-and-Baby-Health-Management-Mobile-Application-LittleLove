import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { firebase } from "../../firebase/config";

const chartConfig = {
  backgroundGradientFrom: '#F8E8FF',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#867EAA'
  }
};

const MWeight = ({ pregnancyId }) => {
    const [clinicDetails, setClinicDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const windowWidth = Dimensions.get("window").width;
  
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
              const bpValue = parseFloat(detail.weight); // Convert to float
              return isNaN(bpValue) ? 0 : bpValue; // Check for NaN and handle it
            }),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      };
  
    return (
      <View style={{marginLeft:-30}}>
        <LineChart
          data={chartData}
          width={windowWidth}
          height={600}
          chartConfig={chartConfig}
        />
      </View>
    );
  };
  
  export default MWeight;