import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../../assets/logo.png";

const MotherList = () => {
  const navigation = useNavigation();
  const [mothersList, setMothersList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (mothersList) {
      navigation.setOptions({
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#57ADF8",
          fontSize: 20,
        },
        headerTintColor: "#57ADF8",
        headerShown: true,
        title: "All Mother List",
        headerTitleAlign: "center",
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [mothersList, navigation]);

  const getMothersList = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .where("role", "==", 0)
        .get();

      const mothers = [];
      snapshot.forEach((doc) => {
        mothers.push({ id: doc.id, ...doc.data() });
      });

      setMothersList(mothers);
    } catch (error) {
      console.log("Error getting mothers list:", error);
    }
  };

  useEffect(() => {
    getMothersList();
  }, []);

  if (!mothersList) {
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

  const filterMothersByRegisterNo = () => {
    return mothersList.filter((mother) =>
      mother.register_No.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMotherClick = (motherId) => {
    navigation.navigate("MotherDetails", { motherId });
  };

  const renderMothers = () => {
    const filteredMothers = filterMothersByRegisterNo();
    return filteredMothers.map((mother) => (
      <TouchableOpacity
        key={mother.id}
        style={styles.motherItem}
        onPress={() => handleMotherClick(mother.id)}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.card}>
            <Text>{mother.register_No}</Text>
          </View>
          <Text style={styles.motherName}>{mother.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Registered No."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <Icon
        name="search"
        size={30}
        color="#57ADF8"
        style={{
          alignSelf: "flex-end",
          marginRight: "7%",
          marginTop: -75,
          marginBottom: 20,
        }}
      />
      <ScrollView style={styles.scrollView}>{renderMothers()}</ScrollView>
    </ScrollView>
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FF25A9",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    width: 70,
    alignSelf: "center",
  },
  motherItem: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#FF25A9",
  },
  motherName: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
  },
  searchInput: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#57ADF8",
    borderRadius: 38,
    padding: 10,
    marginTop: 20,
    marginBottom: 35,
  },
});

export default MotherList;
