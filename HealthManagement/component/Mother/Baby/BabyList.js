import { View, Text ,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BabyList = ({ pregnancyId }) => {
    const navigation = useNavigation();


  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <View>
            <Text style={styles.header}>Baby</Text>
            <Text  style={styles.info}>(Use add button to add baby details)</Text>
            </View>
        
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 20,
    padding: 10,
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
  info:{
    margin:0,
    marginBottom:20,
    marginLeft:0,
    fontSize:13
  },
});
export default BabyList;
