import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const BPGraphs = ({ data }) => {
  const [clinicData, setClinicData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const clinicRef = ref(db, 'Clinic');
    const userClinicQuery = query(
      clinicRef,
      orderByChild('motherId'),
      equalTo(data.id)
    );

    const unsubscribe = onValue(userClinicQuery, (snapshot) => {
      if (snapshot.exists()) {
        const clinicData = snapshot.val();
        const clinicArray = Object.values(clinicData);
        clinicArray.reverse();
        setClinicData(clinicArray);
      } else {
        setClinicData([]);
      }
    });
    return () => unsubscribe();
  }, [data.id]);

  // Calculate chart data with BP and age
  const generateChartData = () => {
    const labels = clinicData.map((clinicDetail) => clinicDetail.age);
    const bpData = clinicData.map((clinicDetail) => clinicDetail.bp); // Assuming you have a 'bp' field in clinic details

    // Calculate statistics
    const maxBP = Math.max(...bpData);
    const minBP = Math.min(...bpData);
    const avgBP = bpData.reduce((sum, value) => sum + value, 0) / bpData.length;

    return {
      labels,
      datasets: [
        {
          data: bpData,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'BP',
        },
      ],
      maxBP,
      minBP,
      avgBP,
    };
  };

  const chartData = generateChartData();

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    },
    xAxisLabel: 'Age',
    yAxisLabel: 'BP',
  };

  // Calculate chart height as a percentage of the screen height
  const chartHeight = screenHeight * 0.4; // You can adjust this percentage as needed

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
    },
    chartContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {clinicData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Blood Pressure (BP) Chart</Text>
            <LineChart
              data={chartData}
              width={screenWidth - 20}
              height={chartHeight}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
            <Text style={{ marginTop: -20 }}>Week</Text>
            <Text style={{ marginTop: 10 }}>Max BP: {chartData.maxBP}</Text>
            <Text>Min BP: {chartData.minBP}</Text>
            <Text>Avg BP: {chartData.avgBP.toFixed(2)}</Text>
          </View>
        )}

        {clinicData.length === 0 && (
          <Text>No clinic data available for this user.</Text>
        )}

        {/* Legends for BP */}
        <View style={styles.legendContainer}>
          <View style={[styles.legendDot, { backgroundColor: 'red' }]} />
          <Text>BP Value</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BPGraphs;
