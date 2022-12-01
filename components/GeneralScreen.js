import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const GeneralScreen = ({ children }) => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
});
