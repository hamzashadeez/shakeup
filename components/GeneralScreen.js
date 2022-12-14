import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Platform,
} from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const GeneralScreen = ({ children }) => {
  return (
    <View style={styles.main}>
      {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
      {/* <View style={styles.abs}></View> */}
      {children}
      {/* </ScrollView> */}
    </View>
  );
};

export default GeneralScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    // paddingTop: Platform.OS === "ios" ? 40 : 0,
    position: "relative",
  },
  abs: {
    position: "absolute",
    width: "100%",
    height: 40,
    top: 0,
    left: 0,
    backgroundColor: COLORS.orange,
    zIndex: 100,
  },
});
