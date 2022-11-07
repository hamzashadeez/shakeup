import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const Balls = ({ fill, border }) => {
  return (
    <View
      style={[
        styles.ball,
        {
          backgroundColor: fill ? COLORS.orange : "white",
          borderWidth: border ? 2 : 0,
        },
      ]}
    />
  );
};

export default Balls;

const styles = StyleSheet.create({
  ball: {
    width: 26,
    height: 26,
    borderRadius: 13,
    elevation: 2,
    borderColor: COLORS.orange,
  },
});
