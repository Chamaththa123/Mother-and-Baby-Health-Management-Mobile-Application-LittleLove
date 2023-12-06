import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { firebase } from "../../firebase/config";

const chartConfig = {
    backgroundGradientFrom: '#FFBEBE',
    backgroundGradientTo: '#51E043',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#867EAA'
    }
  };

const MaternalWeight = ({pregnancyId}) => {
    const [clinicDetails, setClinicDetails] = useState([]);

    useEffect(() => {
        const fetchClinicDetails = async () => {
          try {
            const clinicRef = firebase.firestore().collection("clinic");
            const snapshot = await clinicRef
              .where("pregnancyId", "==", pregnancyId)
              .get();
    
            const details = [];
            snapshot.forEach((doc) => {
              details.push({ id: doc.id, ...doc.data() });
            });
            // Sort clinic details by week in ascending order
            details.sort((a, b) => parseInt(a.week) - parseInt(b.week));
            setClinicDetails(details);
          } catch (error) {
            console.error("Error fetching Clinic details: ", error);
          }
        };
    
        fetchClinicDetails();
      }, [pregnancyId]);

      const chartData = {
        labels: clinicDetails.map((detail) => detail.week),
        datasets: [
          {
            data: clinicDetails.map((detail) => detail.weight),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }
        ]
      };
  return (
    <View>
     <View>
      <LineChart
        data={chartData}
        width={400}
        height={200}
        chartConfig={chartConfig}
      />
    </View>
    </View>
  )
}

export default MaternalWeight