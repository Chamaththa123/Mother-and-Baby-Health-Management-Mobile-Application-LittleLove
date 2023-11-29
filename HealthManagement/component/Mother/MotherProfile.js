import { View, Text } from 'react-native'
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";


const MotherProfile = () => {
  const navigation = useNavigation();

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
  return (
    <View>
      <Text>MotherProfile</Text>
    </View>
  )
}

export default MotherProfile