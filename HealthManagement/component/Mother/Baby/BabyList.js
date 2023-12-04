import { View, Text ,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BabyList = ({ pregnancyId }) => {
    const navigation = useNavigation();

    const navigateToAddBaby = () => {
        navigation.navigate('AddBaby', { pregnancyId: pregnancyId });
      };

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.row}>
            <Text style={styles.header}>Child</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={navigateToAddBaby}>
          <Text style={styles.buttonText}>
            Add Child
          </Text>
        </TouchableOpacity>
            </View>
        
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,
   margin:10
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 20,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin:5
  },
  header:{
    fontSize: 18,
    fontWeight: "bold",
    marginTop:10
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#57ADF8",
    borderRadius: 10,
    width: 90,
    borderColor: "#57ADF8",
    borderWidth: 1,
    justifyContent: "center",
    color: "white",
    padding: 12.5,
    alignSelf:'center'
  },
});
export default BabyList;
