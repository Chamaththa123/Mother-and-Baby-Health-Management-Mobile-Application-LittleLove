import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView,TextInput,Button } from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../../firebase/config';



const backgroundImage = require('../../assets/bg.png');
const localImage = require('../../assets/mother.png');

const OtherPage = ({ route, navigation }) => {
  const { data } = route.params;

  const [age, setage] = useState(''); // Initialize with an empty string
  const [type, settype] = useState(''); // Initialize with an empty string
  const [date, setdate] = useState(''); // Initialize with an empty string
  const [batch, setbatch] = useState(''); // Initialize with an empty string


  const addVaccine = () => {
    // Create a new subject entry for the user in Firebase
    const vaccineRef = ref(db, 'Vaccine');

    // Generate a new unique key for the subject
    const newVaccineKey = push(vaccineRef);

    set(newVaccineKey, {
      UserId: data.id,
      age: age,
      type: type,
      date: date,
      batch: batch,
    })
      .then(() => {
        alert('Vaccine details added successfully');
        setage('');
        settype('');
        setdate('');
        setbatch('');
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

          <Text style={styles.header}>Enter Vaccination Details</Text>

        <TextInput
          placeholder="Enter Age"
          value={age}
          onChangeText={(age) => setage(age)} style={styles.textBoxes}
        />
        <TextInput
          placeholder="Enter Vaccine Type"
          value={type}
          onChangeText={(type) => settype(type)} style={styles.textBoxes}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Date"
          value={date}
          onChangeText={(date) => setdate(date)} style={styles.textBoxes}
        />
        <TextInput
          placeholder="Enter Vaccine Batch No"
          value={batch}
          onChangeText={(batch) => setbatch(batch)} style={styles.textBoxes}
          keyboardType="numeric"
        />

<TouchableOpacity
          style={styles.buttonStyle}
          onPress={addVaccine}
        >
          <Text style={styles.buttonText}>Submit Vaccine Details</Text>
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

export default OtherPage;
