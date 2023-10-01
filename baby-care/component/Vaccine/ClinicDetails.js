import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const ClinicDetails = ({ data }) => {
  const navigation = useNavigation();
  const [clinicData, setClinicData] = useState([]);

  useEffect(() => {
    // Query the Firebase database to retrieve clinic data for the specific user
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
        setClinicData(clinicArray); // Fix here: Use setClinicData instead of setVaccineData
      } else {
        // If no clinic data found for the user, set an empty array
        setClinicData([]);
      }
    });

    // Clean up the listener when the component unmounts
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
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Age:</Text> {item.age}</Text>
                <Text style={styles.cardText}><Text style={styles.cardHeader}>Date:</Text> {item.weight}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.cardText2}><Text style={styles.cardHeader}>Vaccine Type:</Text> {item.height}</Text>
                <Text style={styles.cardText2}><Text style={styles.cardHeader}>Batch:</Text> {item.bp}</Text>
              </View>
            </View>
          </View>
        ))}
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
    marginRight: 10
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
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
  cardText2: {
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
    justifyContent: 'space-between', // Aligns items horizontally with space between them
  },
});

export default ClinicDetails;
