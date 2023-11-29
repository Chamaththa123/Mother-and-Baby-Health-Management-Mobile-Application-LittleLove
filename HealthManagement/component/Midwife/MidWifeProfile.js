import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

const MidWifeProfile = () => {
  const handleSignOut = () => {
    console.log('Signing out...');
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Sign-out successful');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        loadUserSubjects();
        loadAllUsers();
      } else {
        console.log('User doesn\'t exist');
      }
    });
  }, []);

  return (
    <View>
      <Text>MidWifeProfile</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text >Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MidWifeProfile