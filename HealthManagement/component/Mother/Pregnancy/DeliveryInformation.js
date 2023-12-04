import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../firebase/config";

const DeliveryInformation = ({ pregnancyId }) => {
  const navigation = useNavigation();
  // const { pregnancyId } = route.params;
  const [deliveryDetails, setDeliveryDetails] = useState({
    place: "",
    deliveryDate: "",
    type: "",
    complication: "",
  });
  const [addedDetails, setAddedDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (pregnancyId) {
          const snapshot = await firebase
            .firestore()
            .collection("deliveries")
            .where("pregnancyId", "==", pregnancyId)
            .get();

          const details = [];
          snapshot.forEach((doc) => {
            details.push({ id: doc.id, ...doc.data() });
          });
          setAddedDetails(details.length > 0 ? details[0] : null);
        }
      } catch (error) {
        console.log("Error fetching pregnancy details:", error);
      }
    };

    fetchDetails();
  }, [pregnancyId]);

  const handleSaveDeliveryDetails = () => {
    if (!addedDetails) {
      firebase
        .firestore()
        .collection("deliveries")
        .add({
          pregnancyId: pregnancyId,
          place: deliveryDetails.place,
          deliveryDate: deliveryDetails.deliveryDate,
          type: deliveryDetails.type,
          complication: deliveryDetails.complication,
        })
        .then(() => {
          Alert.alert("Delivery Information Added Successfully!");
          setAddedDetails({
            pregnancyId,
            place: deliveryDetails.place,
            deliveryDate: deliveryDetails.deliveryDate,
            type: deliveryDetails.type,
            complication: deliveryDetails.complication,
          });
        })
        .catch((error) => {
          console.error("Error adding delivery details: ", error);
        });
    } else {
      Alert.alert("Delivery details already added for this pregnancy ID!");
    }
  };

  return (
    <View style={styles.container}>
      {!addedDetails ? (
        <>
          <Text style={styles.inputDetails}>Place of Delivery</Text>
          <TextInput
            style={styles.textBoxes}
            placeholder=""
            value={deliveryDetails.place}
            onChangeText={(text) =>
              setDeliveryDetails({ ...deliveryDetails, place: text })
            }
          />
          <Text style={styles.inputDetails}>Date of Delivery</Text>
          <TextInput
            style={styles.textBoxes}
            placeholder=""
            value={deliveryDetails.deliveryDate}
            onChangeText={(text) =>
              setDeliveryDetails({ ...deliveryDetails, deliveryDate: text })
            }
          />
          <View style={styles.radioContainer}>
            <Text style={styles.inputDetails}>Type of Delivery</Text>
            <View style={styles.radioButtons}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  deliveryDetails.type === "Vaginal" &&
                    styles.selectedRadioButton,
                ]}
                onPress={() =>
                  setDeliveryDetails({ ...deliveryDetails, type: "Vaginal" })
                }
              >
                <Text style={{ textAlign: "center" }}>Vaginal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  deliveryDetails.type === "Cesarean" &&
                    styles.selectedRadioButton,
                ]}
                onPress={() =>
                  setDeliveryDetails({ ...deliveryDetails, type: "Cesarean" })
                }
              >
                <Text style={{ textAlign: "center" }}>Cesarean</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  deliveryDetails.type === "Assisted" &&
                    styles.selectedRadioButton,
                ]}
                onPress={() =>
                  setDeliveryDetails({ ...deliveryDetails, type: "Assisted" })
                }
              >
                <Text style={{ textAlign: "center" }}>Assisted</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.inputDetails}>Complication if any (Specify)</Text>
          <TextInput
            style={styles.textBoxes}
            placeholder=""
            value={deliveryDetails.complication}
            onChangeText={(text) =>
              setDeliveryDetails({ ...deliveryDetails, complication: text })
            }
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleSaveDeliveryDetails}
          >
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <View style={styles.row}>
            <Text style={styles.topic}>Place of Delivery</Text>
            <Text style={styles.text1}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {addedDetails.place}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.topic}>Date of Delivery</Text>
            <Text style={styles.text1}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {addedDetails.deliveryDate}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.topic}>Type of Delivery</Text>
            <Text style={styles.text1}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {addedDetails.type}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.topic}>Complication</Text>
            <Text style={styles.text1}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {addedDetails.complication}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
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
    justifyContent: "flex-start",
    margin: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
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
    alignSelf: "center",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "700",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    marginTop: 25,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#FF25A9",
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  selectedRadioButton: {
    backgroundColor: "#00FF00",
    borderColor: "#00FF00",
  },
  inputDetails: {
    fontSize: 15,
    marginLeft: 0,
    marginBottom: "-3%",
  },
  textBoxes: {
    width: "100%",
    fontSize: 16,
    padding: 8,
    borderColor: "#FF25A9",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginLeft: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: "100%",
    height: 50,
    margin: 10,
    marginLeft: 0,
    marginBottom: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  topic: {
    fontWeight: "bold",
  },
  text1: {},
});
export default DeliveryInformation;
