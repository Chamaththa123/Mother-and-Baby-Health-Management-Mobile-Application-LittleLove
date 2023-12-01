import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

const MidWifeProfile = ({ navigation }) => {

  const [name, setName] = useState({});

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 20,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "My Profile",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => {
            console.log("Signing out...");
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log("Sign-out successful");
                navigation.navigate("Start");
              })
              .catch((error) => {
                console.error("Sign-out error:", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  

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