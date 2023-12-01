import { View, Text } from 'react-native'
import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";

const Qr = () => {
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
  return (
    <View>
      <Text>{name.register_No}</Text>
    </View>
  )
}

export default Qr