import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../../firebase/config';

const AddVaccine = ({ data, navigation }) => {

    // const { item } = route.params;
    // const [babyname, setbabyname] = useState(''); // Initialize with an empty string
    // const [bday, setbday] = useState(''); // Initialize with an empty string
    // const [btime, setbtime] = useState(''); // Initialize with an empty string
    // const [gender, setgender] = useState(''); // Initialize with an empty string
    // const [bweight, setbweight] = useState(''); // Initialize with an empty string
    // const [blength, setblength] = useState(''); // Initialize with an empty string

    // const addSubject = () => {
    //     // Create a new subject entry for the user in Firebase
    //     const babyRef = ref(db, 'Baby');
    
    //     // Generate a new unique key for the subject
    //     const newBabyKey = push(babyRef);
    
    //     set(newBabyKey, {
    //       motherId: item.id,
    //       babyname: babyname,
    //       bday: bday,
    //       btime: btime,
    //       gender: gender,
    //       bweight: bweight,
    //       blength: blength,
    //     })
    //       .then(() => {
    //         alert('Marks added successfully');
    //         setbabyname('');
    //         setbday('');
    //         setbtime('');
    // //         setgender('');
    // //         setbweight('');
    //         setblength('');
    //       })
    //       .catch((error) => {
    //         alert(error.message);
    //       });
    //   };

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        {/* Card Content */}
        <Text style={styles.cardTitle}>{data}</Text>
        <Text style={styles.cardDetails}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </View>

      <Text style={styles.text}>Add Subject</Text>

      {/* <View style={styles.item}>
        <TextInput
          placeholder="Subject Name"
          value={babyname}
          onChangeText={(babyname) => setbabyname(babyname)}
        />
        <TextInput
          placeholder="Mark"
          value={bday}
          onChangeText={(bday) => setbday(bday)}
          keyboardType="numeric"
        />

<TextInput
          placeholder="Mark"
          value={btime}
          onChangeText={(btime) => setbtime(btime)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Mark"
          value={gender}
          onChangeText={(gender) => setgender(gender)}
        />
        <TextInput
          placeholder="Mark"
          value={bweight}
          onChangeText={(bweight) => setbweight(bweight)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Mark"
          value={blength}
          onChangeText={(blength) => setblength(blength)}
          keyboardType="numeric"
        />
        <Button title="Add Subject" onPress={addSubject} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default AddVaccine;
