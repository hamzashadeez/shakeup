import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const Screen = ({ children }) => {
  return <View style={styles.main}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primary,
    position: "relative",
    paddingTop: Platform.OS === "ios" ? 44 : 0,
  },
});
