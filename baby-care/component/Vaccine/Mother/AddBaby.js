import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../../../firebase/config';
import backgroundImage from '../../../assets/bg.png';
import { Picker } from '@react-native-picker/picker';

const AddBaby = ({ route, navigation }) => {
  const { item } = route.params;
  const [babyname, setbabyname] = useState('');
  const [bday, setbday] = useState('');
  const [btime, setbtime] = useState('');
  const [gender, setgender] = useState('male');
  const [bweight, setbweight] = useState('');
  const [blength, setblength] = useState('');

  const addBaby = () => {
    const babyRef = ref(db, 'Baby');
    const newBabyKey = push(babyRef);

    set(newBabyKey, {
      motherId: item.id,
      babyname: babyname,
      bday: bday,
      btime: btime,
      gender: gender,
      bweight: bweight,
      blength: blength,
    })
      .then(() => {
        alert('Baby details added successfully');
        setbabyname('');
        setbday('');
        setbtime('');
        setgender('male');
        setbweight('');
        setblength('');
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
      title: item.name,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Create Baby Profile</Text>
          <Text style={styles.inputDetails}>Baby Name</Text>
          <TextInput
            placeholder="Enter Baby Name"
            value={babyname}
            onChangeText={setbabyname}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>BirthDay</Text>
          <TextInput
            placeholder="Enter BirthDay"
            value={bday}
            onChangeText={setbday}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Time of Birth</Text>
          <TextInput
            placeholder="Enter Time of Birth"
            value={btime}
            onChangeText={setbtime}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setgender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <Text style={styles.inputDetails}>Birth Weight (cm)</Text>
          <TextInput
            placeholder="Enter Birth Weight"
            value={bweight}
            onChangeText={setbweight}
            style={styles.textBoxes}
          />
          <Text style={styles.inputDetails}>Length at Birth (cm)</Text>
          <TextInput
            placeholder="Enter Length at Birth"
            value={blength}
            onChangeText={setblength}
            style={styles.textBoxes}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={addBaby}>
            <Text style={styles.buttonText}>Create Baby Profile</Text>
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

export default AddBaby;
