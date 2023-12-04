import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";

const Clinic = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
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
        fontSize: 20,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "Care At Clinic",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "clinic":
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Clinic Content</Text>
          </View>
        );
      case "vaccine":
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Vaccine Content</Text>
          </View>
        );
      case "health":
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>health Content</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: "white" }}
      renderLabel={({ route, focused, color }) => (
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setIndex(route.key === "clinic" ? 0 : 1)}
        >
          <Text style={{ color: focused ? "blue" : "black" }}>
            {route.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Clinic;
