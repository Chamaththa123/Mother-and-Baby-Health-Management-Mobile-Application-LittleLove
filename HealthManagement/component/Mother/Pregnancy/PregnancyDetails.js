import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../firebase/config";
import MyImage from "../../../assets/logo.png";

const PregnancyDetails = ({ route }) => {
    const { pregnancyId } = route.params;
    const [PregnancyDetails, setPregnancyDetails] = useState(null);

    useEffect(() => {
        const fetchPregnancyDetails = async () => {
          try {
            const doc = await firebase
              .firestore()
              .collection("pregnancy")
              .doc(pregnancyId)
              .get();
            if (doc.exists) {
                setPregnancyDetails(doc.data());
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.log("Error getting mother details:", error);
          }
        };
    
        fetchPregnancyDetails();
      }, [pregnancyId]);
  return (
    <View>
      <Text>{PregnancyDetails?.time}dd</Text>
    </View>
  )
}

export default PregnancyDetails