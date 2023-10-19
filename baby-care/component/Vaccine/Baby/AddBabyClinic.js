import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { db } from '../../../firebase/config';

const backgroundImage = require('../../../assets/bg.png');

const AddBabyClinic = ({ route, navigation }) => {
  const { data } = route.params;

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const addClinic = () => {
    // Create a new clinic entry for the baby in Firebase
    const clinicRef = ref(db, 'Clinic');

    // Generate a new unique key for the clinic entry
    const newClinicKey = push(clinicRef);

    set(newClinicKey, {
      babyId: data.id,
      age: age,
      weight: weight,
      height: height,
    })
      .then(() => {
        alert('Clinic details added successfully');
        setAge('');
        setWeight('');
        setHeight('');
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
          <Text style={styles.header}>Enter Baby Clinic Details</Text>
          <Text style={styles.inputDetails}>Baby Age (months)</Text>
          <TextInput
            placeholder="Enter Baby Age"
            value={age}
            onChangeText={setAge}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Baby Weight (Kg)</Text>
          <TextInput
            placeholder="Enter Baby Weight"
            value={weight}
            onChangeText={setWeight}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Baby Height (cm)</Text>
          <TextInput
            placeholder="Enter Baby Height"
            value={height}
            onChangeText={setHeight}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={addClinic}>
            <Text style={styles.buttonText}>Submit Clinic Details</Text>
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
    marginTop: '10%',
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

export default AddBabyClinic;
