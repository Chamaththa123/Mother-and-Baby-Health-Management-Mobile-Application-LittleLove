import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import VaccineInfo from "./VaccineInfo";
import ClinicInfo from "./ClinicInfo";
import Graphs from "../../../HealthGraphs/Graphs";


const Clinic = ({ route }) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const { pregnancyId } = route.params;
  const [routes] = useState([
    { key: "vaccine", title: "Vaccine Information" },
    { key: "clinic", title: "Clinic Information" },
    { key: "health", title: "Health Graphs" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 19,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "Care At Clinic",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const AddVaccine = () => {
    navigation.navigate("AddVaccine", { pregnancyId: pregnancyId });
  };

  const AddClinic = () => {
    navigation.navigate("AddClinic", { pregnancyId: pregnancyId });
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "clinic":
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              {/* <VaccineInfo pregnancyId={pregnancyId} /> */}
              <ClinicInfo pregnancyId={pregnancyId} />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={AddClinic}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "vaccine":
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <VaccineInfo pregnancyId={pregnancyId} />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={AddVaccine}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "health":
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Graphs pregnancyId={pregnancyId} />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#FF25A9" }}
      style={{ backgroundColor: "white" }}
      renderLabel={({ route, focused, color }) => (
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setIndex(route.key === "clinic" ? 0 : 1)}
        >
          <Text style={{ color: focused ? "#FF25A9" : "#57ADF8" }}>
            {route.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  footer: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: 60,
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginTop: -50,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Clinic;
