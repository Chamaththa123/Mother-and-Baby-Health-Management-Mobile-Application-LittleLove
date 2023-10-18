import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../../firebase/config';
import { LineChart } from 'react-native-chart-kit';
import BMIGraphs from '../../Mother/Health Graphs/MotherBMIGraphs';
import BabyBMIGraph from './BabyBMIGraph';

const BabyHealthGraphs = ({ data }) => {
  const navigation = useNavigation();
  const [clinicData, setClinicData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
    },
    buttonStyle: {
      backgroundColor: '#5bf6db',
      padding: 13,
      borderRadius: 10,
      height: 50,
      width: 130,
    },
    buttonContainer: {
      marginBottom: 10,
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  useEffect(() => {
    const clinicRef = ref(db, 'Clinic');
    const userClinicQuery = query(clinicRef, orderByChild('babyId'), equalTo(data.id));

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Weight Chart for Baby</Text>
        {clinicData.length > 0 && (
          <LineChart
            data={{
              labels: clinicData.map((item) => item.age),
              datasets: [
                {
                  data: clinicData.map((item) => item.weight),
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={220}
            yAxisSuffix="kg"
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        )}

        <Text>Height Chart for Baby</Text>
        {clinicData.length > 0 && (
          <LineChart
            data={{
              labels: clinicData.map((item) => item.age),
              datasets: [
                {
                  data: clinicData.map((item) => item.height),
                  color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={220}
            yAxisSuffix="cm"
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        )}

        {clinicData.length === 0 && (
          <Text>No clinic data available for this user.</Text>
        )}

        <BabyBMIGraph data={data} />
      </View>
    </ScrollView>
  );
};

export default BabyHealthGraphs;
