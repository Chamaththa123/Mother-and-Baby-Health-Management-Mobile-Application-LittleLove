import { View, Text ,StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const AddBaby = ({ route }) => {
  const { pregnancyId } = route.params;
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
      title: `Create Child Profile`,
      headerTitleAlign: "center",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>{pregnancyId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:10
    }
});
export default AddBaby;
