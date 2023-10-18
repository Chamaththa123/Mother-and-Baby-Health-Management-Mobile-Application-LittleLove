import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  push,
  onValue,
  set,
} from 'firebase/database';
import { db } from '../../../firebase/config';

// Define image assets
const backgroundImage = require('../../../assets/bg.png');
const localImage = require('../../../assets/mother.png');

const AddClinic = ({ route, navigation }) => {
  // Extract data from the route parameters
  const { data } = route.params;

  // Define state variables for form input fields
  const [week, setWeek] = useState('');
  const [weight, setWeight] = useState('');
  const [fundalHeight, setFundalHeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  // Function to add clinic details to Firebase
  const addClinic = () => {
    // Create a reference to the 'Clinic' location in the Firebase database
    const clinicRef = ref(db, 'Clinic');

    // Generate a new unique key for the clinic entry
    const newClinicKey = push(clinicRef);

    // Set clinic details in Firebase
    set(newClinicKey, {
      motherId: data.id,
      week,
      weight,
      F_height: fundalHeight,
      bp: bloodPressure,
    })
      .then(() => {
        alert('Clinic details added successfully');
        // Clear input fields after submission
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
    // Hide the header when the component is mounted
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={localImage} style={styles.imageStyle} />
          <Text style={styles.name}>{data.name}</Text>
        </View>

        <Text style={styles.header}>Enter Mother Clinic Details</Text>

        {/* Input fields for clinic details */}
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

        {/* Submit button */}
        <TouchableOpacity style={styles.buttonStyle} onPress={addClinic}>
          <Text style={styles.buttonText}>Submit Clinic Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 70,
    marginLeft: 10,
    width: 260,
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginLeft: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
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
});

export default AddClinic;
