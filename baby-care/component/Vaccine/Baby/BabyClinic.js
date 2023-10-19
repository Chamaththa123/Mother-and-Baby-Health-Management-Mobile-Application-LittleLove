import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const ClinicDetails = ({ data }) => {
  const navigation = useNavigation();
  const [clinicData, setClinicData] = useState([]);

  useEffect(() => {
    const clinicRef = ref(db, 'Clinic');
    const userClinicQuery = query(
      clinicRef,
      orderByChild('babyId'),
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

  // Calculate BMI function
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  // Determine BMI status and set text color
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return { status: 'Under Nutrition', color: 'red', backgroundColor: "#FF3F3F" };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return { status: 'Proper Nutrition', color: 'green', backgroundColor: "#1DFE24" };
    } else {
      return { status: 'Over Nutrition', color: 'orange', backgroundColor: "orange" };
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('AddBabyClinic', { data });
            }}
          >
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
        </View>

        {clinicData.map((item, index) => {
          const bmiStatus = getBMIStatus(calculateBMI(item.weight, item.height));
          return (
            <View style={styles.card} key={index}>
              <Text style={styles.cardText}>
                <Text style={styles.cardHeader}>Baby Age (months) :</Text> {item.age} Months
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardHeader}>Baby Weight (Kg) :</Text> {item.weight} Kg
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardHeader}>Baby Height (cm) :</Text> {item.height} cm
              </Text>
              <Text style={[styles.cardText, { color: bmiStatus.color }]}>
                <Text style={styles.cardHeader}>Baby BMI Rate :</Text> {calculateBMI(item.weight, item.height)} kg/m^2
              </Text>

              <View style={[styles.card2, { backgroundColor: bmiStatus.backgroundColor }]}>
                <Text style={[styles.cardStatus, { color: bmiStatus.color }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>{bmiStatus.status}</Text>
                </Text>
              </View>

            </View>
          );
        })}
        {clinicData.length === 0 && (
          <Text>No clinic data available for this user.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
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
  card2: {
    marginVertical: 5,
    padding: 6,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1.5,
  },
  cardText: {
    fontSize: 16,
  },
  cardStatus: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black'
  },
  cardHeader: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    height: 50,
    width: 130,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default ClinicDetails;
