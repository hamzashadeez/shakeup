import { Image, StyleSheet, View, Text } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "9%",
        padding: 10,
        flexDirection: "row",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text}>ShakeUP</Text>
        <Image
          source={require("../assets/cup.png")}
          style={styles.cup}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 22,
  },
  cup: {
    height: 27,
    width: 21,
    marginLeft: -18,
    marginBottom: 4
  },
});
