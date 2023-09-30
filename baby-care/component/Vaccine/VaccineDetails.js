import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const VaccineDetails = ({ data }) => {
  const navigation = useNavigation();
  const [vaccineData, setVaccineData] = useState([]);

  useEffect(() => {
    // Query the Firebase database to retrieve vaccine data for the specific user
    const vaccineRef = ref(db, 'Vaccine');
    const userVaccineQuery = query(
      vaccineRef,
      orderByChild('motherId'),
      equalTo(data.id)
    );

    const unsubscribe = onValue(userVaccineQuery, (snapshot) => {
      if (snapshot.exists()) {
        const vaccineData = snapshot.val();
        const vaccineArray = Object.values(vaccineData);
        setVaccineData(vaccineArray);
      } else {
        // If no vaccine data found for the user, set an empty array
        setVaccineData([]);
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
          navigation.navigate('AddVaccine', { data });
        }}
      >
        <Text style={styles.buttonText}>Go to Other Page</Text>
      </TouchableOpacity>
      </View>
      
      {vaccineData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>Age: {item.age}</Text>
            <Text style={styles.cardText}>Vaccine Type: {item.type}</Text>
            <Text style={styles.cardText}>Date: {item.date}</Text>
            <Text style={styles.cardText}>Batch: {item.batch}</Text>
          </View>
        ))}
        {vaccineData.length === 0 && (
          <Text>No vaccine data available for this user.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:10,
    marginRight:10
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    height: 50,
    width:150
  },
  buttonContainer: {
    marginBottom: 10,
  },  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VaccineDetails;
