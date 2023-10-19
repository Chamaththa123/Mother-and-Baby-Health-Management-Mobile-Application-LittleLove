import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../firebase/config';

const backgroundImage = require('../assets/bg.png'); // Replace with the actual path to your background image

const Add = ({ navigation }) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [occupation, setoccupation] = useState('');
  const [registeredNo, setregisteredNo] = useState('');
  const [DDSH, setDDSH] = useState('');
  const [PHM, setPHM] = useState('');

  function createMother() {
    const usersRef = ref(db, 'mother');
    const newUserRef = push(usersRef);

    set(newUserRef, {
      name: name,
      email: email,
      address: address,
      occupation: occupation,
      registeredNo: registeredNo,
      DDSH: DDSH,
      PHM: PHM
    })
      .then(() => {
        alert('Create Mother Profile Successfully');
        setname('');
        setemail('');
        setaddress('');
        setoccupation('');
        setregisteredNo('');
        setDDSH('');
        setPHM('');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5bf6db',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      title: "",
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Create Mother Profile</Text>
          <Text style={styles.inputDetails}>Mother Name</Text>
          <TextInput
            placeholder="Enter Mother Name"
            value={name}
            onChangeText={setname}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Email</Text>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setemail}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Address</Text>
          <TextInput
            placeholder="Enter Address"
            value={address}
            onChangeText={setaddress}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Occupation</Text>
          <TextInput
            placeholder="Enter Occupation"
            value={occupation}
            onChangeText={setoccupation}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Registered No</Text>
          <TextInput
            placeholder="Enter Registered No"
            value={registeredNo}
            onChangeText={setregisteredNo}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>DDSH Division</Text>
          <TextInput
            placeholder="Enter DDSH Division"
            value={DDSH}
            onChangeText={setDDSH}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>PHM Area</Text>
          <TextInput
            placeholder="Enter PHM Area"
            value={PHM}
            onChangeText={setPHM}
            style={styles.textBoxes}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={createMother}>
            <Text style={styles.buttonText}>Create Mother Profile</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  picker: {
    width: '100%',
  },
});

export default Add;
