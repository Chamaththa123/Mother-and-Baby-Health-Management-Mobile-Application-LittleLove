import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { db } from '../../../firebase/config';

const backgroundImage = require('../../../assets/bg.png');

const AddBabyVaccine = ({ route, navigation }) => {
  const { data } = route.params;

  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [batch, setBatch] = useState('');

  const addBabyVaccine = () => {
    // Create a new vaccine entry for the baby in Firebase
    const vaccineRef = ref(db, 'Vaccine');

    // Generate a new unique key for the vaccine entry
    const newVaccineKey = push(vaccineRef);

    set(newVaccineKey, {
      babyId: data.id,
      age: age,
      type: type,
      date: date,
      batch: batch,
    })
      .then(() => {
        alert('Vaccine details added successfully');
        setAge('');
        setType('');
        setDate('');
        setBatch('');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5bf6db',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      title: data.babyname,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Enter Baby Vaccination Details</Text>
          <Text style={styles.inputDetails}>Baby Age (Months)</Text>
          <TextInput
            placeholder="Enter Baby Age"
            value={age}
            onChangeText={(age) => setAge(age)}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Type of Vaccine</Text>
          <TextInput
            placeholder="Enter Type of Vaccine"
            value={type}
            onChangeText={(type) => setType(type)}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Date</Text>
          <TextInput
            placeholder="Enter Date"
            value={date}
            onChangeText={(date) => setDate(date)}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Vaccine Batch No</Text>
          <TextInput
            placeholder="Enter Vaccine Batch No"
            value={batch}
            onChangeText={(batch) => setBatch(batch)}
            style={styles.textBoxes}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={addBabyVaccine}
          >
            <Text style={styles.buttonText}>Submit Vaccine Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  inputDetails: {
    fontSize: 17,
    marginLeft: '5%',
    marginTop: '3%',
    marginBottom: '-3%',
  },
  textBoxes: {
    width: '90%',
    fontSize: 16,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    width: '90%',
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '8%',
    marginLeft: '5%',
    marginBottom: '8%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default AddBabyVaccine;
