import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView,TextInput,Button } from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../../firebase/config';



const backgroundImage = require('../../assets/bg.png');
const localImage = require('../../assets/mother.png');

const AddClinic = ({ route, navigation }) => {
  const { data } = route.params;

  const [age, setage] = useState(''); // Initialize with an empty string
  const [weight, setweight] = useState(''); // Initialize with an empty string
  const [height, setheight] = useState(''); // Initialize with an empty string
  const [bp, setbp] = useState(''); // Initialize with an empty string


  const addClinic = () => {
    // Create a new subject entry for the user in Firebase
    const clinicRef = ref(db, 'Clinic');

    // Generate a new unique key for the subject
    const newClinicKey = push(clinicRef);

    set(newClinicKey, {
      motherId: data.id,
      age: age,
      weight: weight,
      height: height,
      bp: bp,
    })
      .then(() => {
        alert('Clinic details added successfully');
        setage('');
        setweight('');
        setheight('');
        setbp('');
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  useEffect(() => {
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

          <Text style={styles.header}>Enter Clinic Details</Text>

        <TextInput
          placeholder="Enter Age"
          value={age}
          onChangeText={(age) => setage(age)} style={styles.textBoxes}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Weight"
          value={weight}
          onChangeText={(weight) => setweight(weight)} style={styles.textBoxes}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Enter height"
          value={height}
          onChangeText={(height) => setheight(height)} style={styles.textBoxes}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter bp"
          value={bp}
          onChangeText={(bp) => setbp(bp)} style={styles.textBoxes}
          keyboardType="numeric"
        />

<TouchableOpacity
          style={styles.buttonStyle}
          onPress={addClinic}
        >
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
  item: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    borderWidth: 2, // Add border width
    borderColor: '#5bf6db', // Add border color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    resizeMode: 'cover',
    marginLeft: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  text1: {
    fontSize: 17,
    fontWeight: '900',
    color: '#323232',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 5,
    height: 50,
    margin: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },   textBoxes: {
    width: '90%',
    fontSize: 16,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 20,
    marginLeft:20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color for text input
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    width: '90%',
    height: 50,
    margin: 10,
    marginLeft:20,
    borderColor: 'gray',
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  header:{
    fontSize:20,
    fontWeight: 'bold',
    marginTop:100,
    marginBottom:0,
    marginLeft:20
  }
});

export default AddClinic;
