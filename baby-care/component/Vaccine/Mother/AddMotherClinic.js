import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  ref,
  push,
  set,
} from 'firebase/database';
import { db } from '../../../firebase/config';

const backgroundImage = require('../../../assets/bg.png');

const AddClinic = ({ route, navigation }) => {
  const { data } = route.params;

  const [week, setWeek] = useState('');
  const [weight, setWeight] = useState('');
  const [fundalHeight, setFundalHeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  const addClinic = () => {
    const clinicRef = ref(db, 'Clinic');
    const newClinicKey = push(clinicRef);
    set(newClinicKey, {
      motherId: data.id,
      week,
      weight,
      F_height: fundalHeight,
      bp: bloodPressure,
    })
      .then(() => {
        alert('Clinic details added successfully');
        setWeek('');
        setWeight('');
        setFundalHeight('');
        setBloodPressure('');
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
      title: data.name,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Enter Mother Clinic Details</Text>
          <Text style={styles.inputDetails}>Mother Gestational Duration (Weeks)</Text>
          <TextInput
            placeholder="Enter Week"
            value={week}
            onChangeText={setWeek}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Maternal Weight (Kg)</Text>
          <TextInput
            placeholder="Enter Weight"
            value={weight}
            onChangeText={setWeight}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Fundal Height (cm)</Text>
          <TextInput
            placeholder="Enter Fundal Height"
            value={fundalHeight}
            onChangeText={setFundalHeight}
            style={styles.textBoxes}
            keyboardType="numeric"
          />
          <Text style={styles.inputDetails}>Blood Pressure (mm Hg)</Text>
          <TextInput
            placeholder="Enter Blood Pressure"
            value={bloodPressure}
            onChangeText={setBloodPressure}
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

export default AddClinic;
