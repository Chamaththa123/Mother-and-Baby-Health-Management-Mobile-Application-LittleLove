import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ImageBackground } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { db } from '../firebase/config';
import { HeaderTitle } from '@react-navigation/elements';

const backgroundImage = require('../assets/bg.png'); // Replace with the actual path to your background image

const Add = ({ navigation }) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [occupation, setoccupation] = useState('');
  const [registeredNo, setregisteredNo] = useState('');
  const [DDSH, setDDSH] = useState('');
  const [PHM, setPHM] = useState('');

  function create() {
    const usersRef = ref(db, 'mother');
    const newUserRef = push(usersRef);

    set(newUserRef, {
      name: name,
      email: email,
      address:address,
      occupation:occupation,
      registeredNo:registeredNo,
      DDSH:DDSH,
      PHM:PHM
    })
      .then(() => {
        alert('Data added successfully');
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

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello, React Native!</Text>

        <TextInput
          value={name}
          onChangeText={(name) => {
            setname(name);
          }}
          placeholder="Name"
          style={styles.textBoxes}
        />
        <TextInput
          value={email}
          onChangeText={(email) => {
            setemail(email);
          }}
          placeholder="Email"
          style={styles.textBoxes}
        />

<TextInput
          value={address}
          onChangeText={(address) => {
            setaddress(address);
          }}
          placeholder="address"
          style={styles.textBoxes}
        />

<TextInput
          value={occupation}
          onChangeText={(occupation) => {
            setoccupation(occupation);
          }}
          placeholder="occupation"
          style={styles.textBoxes}
        />

<TextInput
          value={registeredNo}
          onChangeText={(registeredNo) => {
            setregisteredNo(registeredNo);
          }}
          placeholder="registeredNo"
          style={styles.textBoxes}
        />

<TextInput
          value={DDSH}
          onChangeText={(DDSH) => {
            setDDSH(DDSH);
          }}
          placeholder="DDSH"
          style={styles.textBoxes}
        />

<TextInput
          value={PHM}
          onChangeText={(PHM) => {
            setPHM(PHM);
          }}
          placeholder="PHM"
          style={styles.textBoxes}
        />

        <Button title="Add Data" onPress={create} />
        <Button title='Go to Home Screen' onPress={() => navigation.navigate('Tab')} />
      </View>
    </ImageBackground>
  );
};

Add.navigationOptions = {
  headerShown: false,
  headerTitle: () => <HeaderTitle>Custom Header Title</HeaderTitle>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white', // Text color on the background image
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color for text input
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Add;
