import { View, Text ,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DeliveryInformation = ({ pregnancyId }) => {
    const navigation = useNavigation();


  return (
    <View style={styles.container}>
        <View style={styles.row}>
        <Text style={styles.detailText}>Place of Delivery</Text>
        <Text style={styles.detailText}>ssf</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.detailText}>Date of Delivery</Text>
        <Text style={styles.detailText}>ssf</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.detailText}>Type of Delivery</Text>
        <Text style={styles.detailText}>ssf</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.detailText}>Complications</Text>
        <Text style={styles.detailText}>ssf</Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,
   margin:10,
   marginTop:20
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
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
  detailText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight:'700'
  },
});
export default DeliveryInformation;
