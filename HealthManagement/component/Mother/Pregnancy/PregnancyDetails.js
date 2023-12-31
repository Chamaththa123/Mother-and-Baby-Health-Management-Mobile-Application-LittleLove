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
import Accordion from "react-native-collapsible/Accordion";
import BabyList from "../Baby/BabyList";
import DeliveryInformation from "./DeliveryInformation";

const PregnancyDetails = ({ route }) => {
  const navigation = useNavigation();
  const { pregnancyId } = route.params;
  const [PregnancyDetails, setPregnancyDetails] = useState(null);
  const [activeSections1, setActiveSections1] = useState([]);
  const [activeSections2, setActiveSections2] = useState([]);

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

  useEffect(() => {
    if (PregnancyDetails) {
      navigation.setOptions({
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#57ADF8",
          fontSize: 19,
        },
        headerTintColor: "#57ADF8",
        headerShown: true,
        title: `${PregnancyDetails?.time} - Pregnancy Record`,
        headerTitleAlign: "center",
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [PregnancyDetails, navigation]);

  if (!PregnancyDetails) {
    return (
      <View style={styles.Lcontainer}>
        <Image source={MyImage} style={styles.Limage} />
        <View style={styles.LtextContainer}>
          <Text style={styles.LredText}>Little </Text>
          <Text style={styles.LblueText}> Love</Text>
        </View>
        <Text style={styles.Ltext}>Loading</Text>
      </View>
    );
  }

  const SECTIONS1 = [
    {
      title: "Mother Health Condition",
    },
  ];

  const renderHeader1 = (section, _, isActive) => (
    <View style={styles.header_Acc}>
      <Text style={styles.headerText__Acc}>{section.title}</Text>
    </View>
  );

  const renderContent1 = (section) => (
    <View>
    <View style={[styles.card1, { marginTop: 10 }]}>
    <View
      style={[
        styles.row,
        { paddingRight: 10, marginTop: 15, marginBottom: 10 },
      ]}
    >
      <View style={[styles.card3, { backgroundColor: "#00FF00" }]}></View>
      <Text style={styles.detailText}>Yes</Text>
      <View style={[styles.card3, { backgroundColor: "#FF0000" }]}></View>
      <Text style={styles.detailText}>No</Text>
      <View style={[styles.card3, { backgroundColor: "#CCCCCC" }]}></View>
      <Text style={styles.detailText}>Not mentioned</Text>
    </View>
    </View>
    <View>
      <Text style={styles.header}>Risk Conditions</Text>
      <Text style={styles.header2}>Previous Pregnancies</Text>
      <View style={styles.row}>
        <Text style={styles.detailText}>Previous abortions</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.abortions === "1"
                  ? "#00FF00"
                  : PregnancyDetails.abortions === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Gestational diseases</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Gestational === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Gestational === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <Text style={styles.header2}>Presnet Pregnancy</Text>
      <View style={styles.row}>
        <Text style={styles.detailText}>Antepartum vaginal bleeding</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Antepartum === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Antepartum === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Multiple pregnancy</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Multiple === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Multiple === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Casual position</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Casual === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Casual === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Others</Text>
      </View>
      <Text style={styles.other}>{PregnancyDetails.POthers}</Text>
    </View>

    <View >
      <Text style={styles.header}>Other Maternal Conditions</Text>
      <View style={styles.row}>
        <Text style={styles.detailText}>Diabetes</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Diabetes === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Diabetes === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Malaria</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.malaria === "1"
                  ? "#00FF00"
                  : PregnancyDetails.malaria === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Heart Disease</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Heart === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Heart === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Renal Disease</Text>
        <View
          style={[
            styles.card3,
            {
              backgroundColor:
                PregnancyDetails.Renal === "1"
                  ? "#00FF00"
                  : PregnancyDetails.Renal === "0"
                  ? "#FF0000"
                  : "#CCCCCC",
            },
          ]}
        ></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Others</Text>
      </View>
      <Text style={styles.other}>{PregnancyDetails.OOthers}</Text>
    </View>
  </View>
  );

  const navigateToClinic = () => {
    navigation.navigate("Clinic", { pregnancyId: pregnancyId });
  };

  const SECTIONS2 = [
    {
      title: "Delivery Information",
    },
  ];

  const renderHeader2 = (section, _, isActive) => (
    <View style={styles.header_Acc}>
      <Text style={styles.headerText__Acc}>{section.title}</Text>
    </View>
  );

  const renderContent2 = (section) => (
    <DeliveryInformation pregnancyId={pregnancyId} />
  );

  const navigateToAddBaby = () => {
    navigation.navigate('AddBaby', { pregnancyId: pregnancyId });
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      <BabyList pregnancyId={pregnancyId} />
      <View>
        <Text style={styles.header}>Obstetric History</Text>
        <View style={styles.row}>
          <Text style={styles.detailText}>01. Date of last menstrual period</Text>
          <View >
            <Text style={styles.detailText}>{PregnancyDetails.menstrual}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>02. Expected period of delivery</Text>
          <View >
            <Text style={[styles.detailText]}>{PregnancyDetails.delivery}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            03. The date of the first felt fetal movement
          </Text>
          <View >
            <Text style={styles.detailText}>{PregnancyDetails.movement}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>
            04. No of gestational weeks at registration
          </Text>
          <View >
            <Text style={styles.detailText}>{PregnancyDetails.weeks}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS1}
          activeSections={activeSections1}
          renderHeader={renderHeader1}
          renderContent={renderContent1}
          onChange={setActiveSections1}
        />
      </View>

      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS2}
          activeSections={activeSections2}
          renderHeader={renderHeader2}
          renderContent={renderContent2}
          onChange={setActiveSections2}
        />
      </View>
    
      <TouchableOpacity style={styles.buttonStyle} onPress={navigateToClinic}>
        <Text style={styles.buttonText}>Care at Clinic</Text>
      </TouchableOpacity>
    </ScrollView>
    <View style={styles.footer}>
    <TouchableOpacity style={styles.buttonStyle1} onPress={navigateToAddBaby}>
          <Text style={styles.buttonText1}>
            Add
          </Text>
        </TouchableOpacity>
  </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Lcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Limage: {
    width: "30%",
    height: "16%",
  },
  LtextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1%",
  },
  LredText: {
    color: "#57ADF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  LblueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  Ltext: {
    fontSize: 22,
    color: "#FF25A9",
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
    padding:10
  },

  card1: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: 20,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
    width: "98%",
    margin: 10,
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF25A9",
    marginTop: -5,
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  card3: {
    width: 20,
    height: 10,
    marginTop: 5.5,
    borderRadius: 10,
    margin: 10,
  },
  other: {
    margin: 20,
    marginTop: 0,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  buttonStyle1: {
    backgroundColor: "#57ADF8",
    borderRadius: 10,
    width: 60,
    height: 50,
    marginLeft: 0,
    marginBottom: 5,
    borderColor: "#57ADF8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'flex-end'
  },
  header: {
    fontSize: 18,
    color: "#FF25A9",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
    
  },
  detailText: {
    fontSize: 15,
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:10
  },
  header2: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#57ADF8",
    marginLeft: 5,
  },
  header_Acc: {
    backgroundColor: "#fff",
    padding: 10,
  },
  headerText__Acc: {
    fontSize: 15,
    marginLeft: 3,
  },
  content: {
    padding: 0,
    backgroundColor: "#fff",
  },
  accordion: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FF25A9",
    borderRadius: 10,
    padding: 2.5,
    marginBottom:10
  },
  buttonText: {
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
    borderColor: "#FF25A9",
    borderWidth: 1,
    justifyContent: "center",
    color: "white",
    padding: 12.5,
    margin: 10,
    alignSelf: "center",
    marginBottom:20
  },
});
export default PregnancyDetails;
