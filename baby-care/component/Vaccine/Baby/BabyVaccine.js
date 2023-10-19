import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const BabyVaccine = ({ data }) => {
  const navigation = useNavigation();
  const [vaccineData, setVaccineData] = useState([]);

  useEffect(() => {
    // Query the Firebase database to retrieve vaccine data for the specific user
    const vaccineRef = ref(db, 'BabyVaccine');
    const userVaccineQuery = query(
      vaccineRef,
      orderByChild('babyId'),
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
              navigation.navigate('AddBabyVaccine', { data });
            }}
          >
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
        </View>

         {vaccineData.map((item, index) => (
          <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.cardText}><Text style={styles.cardHeader}>Age:</Text> {item.age}</Text>
              <Text style={styles.cardText}><Text style={styles.cardHeader}>Date:</Text> {item.date}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.cardText2}><Text style={styles.cardHeader}>Vaccine Type:</Text> {item.type}</Text>
              <Text style={styles.cardText2}><Text style={styles.cardHeader}>Batch:</Text> {item.batch}</Text>
            </View>
          </View>
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
  cardText2: {
    fontSize: 16,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },cardHeader:{
fontWeight:'bold'
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    height: 50,
    width: 130,
    borderColor: 'gray',
    borderWidth: 0.5,

  },
  buttonContainer: {
    marginBottom: 10,
    marginTop:10
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns items horizontally with space between them
  },
});

export default BabyVaccine;
