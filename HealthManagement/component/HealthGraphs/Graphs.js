import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MWeight from "./MWeight";
import FHeight from "./FHeight";
import BP from "./BP";

const Graphs = ({ pregnancyId }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <MWeight pregnancyId={pregnancyId} />
        <FHeight pregnancyId={pregnancyId} />
        <BP pregnancyId={pregnancyId} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    padding: 10,
  },
});

export default Graphs;
