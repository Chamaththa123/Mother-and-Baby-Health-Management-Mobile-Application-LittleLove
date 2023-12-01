import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";
import QRCode from "react-native-qrcode-svg";

const Qr = ({ navigation }) => {
  const [name, setName] = useState({});
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        setQrData(snapshot.data().register_No);
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
      title: "My QR Code",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {qrData ? <QRCode value={qrData} size={300} /> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Qr;
