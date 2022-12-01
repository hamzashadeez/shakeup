import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../Theme";

const CustomHeader = ({name}) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.text}>ShakeUP</Text>
        <Image
          source={require("../assets/cup.png")}
          style={styles.cup}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 10,
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontFamily: "Truculenta-Regular",
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

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
    marginBottom: 4,
  },
});
