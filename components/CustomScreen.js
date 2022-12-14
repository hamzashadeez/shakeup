import { StyleSheet, Text, SafeAreaView, View, Platform } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const CustomScreen = ({ children }) => {
  return <View style={styles.main}>{children}</View>;
};

export default CustomScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingTop: Platform.OS === "ios" ? 44 : 0,
  },
});
