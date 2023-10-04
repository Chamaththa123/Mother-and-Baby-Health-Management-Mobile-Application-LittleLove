import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const ClinicDetails = ({ data }) => {
  const navigation = useNavigation();
  const [clinicData, setClinicData] = useState([]);

  const calculateBMI = (weight, height) => {

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal Weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const getBMIStatusStyle = (bmi) => {
    const status = getBMIStatus(bmi);
    switch (status) {
      case "Underweight":
        return styles.bmiStatusUnderweight;
      case "Normal Weight":
        return styles.bmiStatusNormalWeight;
      case "Overweight":
        return styles.bmiStatusOverweight;
      case "Obese":
        return styles.bmiStatusObese;
      default:
        return {};
    }
  };

  const getBPStatus = (bp) => {
    if (bp < 90) {
      return "Low Blood Pressure";
    } else if (bp >= 90 && bp < 120) {
      return "Normal";
    } else if (bp >= 120 && bp < 130) {
      return "Elevated";
    } else if (bp >= 130 && bp < 140) {
      return "High Blood Pressure (Stage 1)";
    } else {
      return "High Blood Pressure (Stage 2)";
    }
  };

  const getBPStatusStyle = (bp) => {
    const status = getBPStatus(bp);
    switch (status) {
      case "Low Blood Pressure":
        return styles.bpStatusLow;
      case "Normal":
        return styles.bpStatusNormal;
      case "Elevated":
        return styles.bpStatusElevated;
      case "High Blood Pressure (Stage 1)":
        return styles.bpStatusStage1;
      case "High Blood Pressure (Stage 2)":
        return styles.bpStatusStage2;
      default:
        return {};
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10
    },
    card: {
      backgroundColor: 'white',
      marginVertical: 5,
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 1.5,
    },
    cardText: {
      fontSize: 16,
    },
    leftColumn: {
      flex: 1,
    },
    rightColumn: {
      flex: 1,
    },
    cardHeader: {
      fontWeight: 'bold',
    },
    buttonStyle: {
      backgroundColor: '#5bf6db',
      padding: 13,
      borderRadius: 10,
      height: 50,
      width: 130
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    bmiStatusUnderweight: {
      color: 'blue',
      fontSize: 16,
    },
    bmiStatusNormalWeight: {
      color: 'green',
      fontSize: 16,
    },
    bmiStatusOverweight: {
      color: 'orange',
      fontSize: 16,
    },
    bmiStatusObese: {
      color: 'red',
      fontSize: 16,
    },
    bpStatusLow: {
      color: 'purple',
      fontSize: 16,
    },
    bpStatusNormal: {
      color: 'green',
      fontSize: 16,
    },
    bpStatusElevated: {
      color: 'yellow',
      fontSize: 16,
    },
    bpStatusStage1: {
      color: 'orange',
      fontSize: 16,
    },
    bpStatusStage2: {
      color: 'red',
      fontSize: 16,
    },
  });

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('AddClinic', { data });
            }}
          >
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
        </View>

        {clinicData.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Week:</Text> {item.age}</Text>
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Weight:</Text> {item.weight}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Weight:</Text> {item.weight}</Text>
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Height:</Text> {item.height}</Text>
              </View>
            </View>
            <Text style={styles.cardText}><Text style={styles.cardHeader}>Blood Pressure:</Text> {item.bp} mm Hg</Text>
            <Text style={styles.cardText}><Text style={styles.cardHeader}>BMI Value:</Text> {calculateBMI(item.weight, item.height)} kg/m^2</Text>
            <Text style={[styles.cardText, getBMIStatusStyle(calculateBMI(item.weight, item.height))]}>
              <Text style={styles.cardHeader}>BMI Status:</Text> {getBMIStatus(calculateBMI(item.weight, item.height))}
            </Text>

            <Text style={[styles.cardText, getBPStatusStyle(item.bp)]}>
              <Text style={styles.cardHeader}>Blood Pressure Status:</Text> {getBPStatus(item.bp)}
            </Text>
          </View>
        ))}
        {clinicData.length === 0 && (
          <Text>No clinic data available for this user.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ClinicDetails;
