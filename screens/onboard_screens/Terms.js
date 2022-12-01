import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Terms = ({ navigation }) => {
  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginTop: 66,
              marginBottom: 12,
            }}
          >
            Terms & Conditions
          </Text>

          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 300,
              // marginTop: -100,
              zIndex: -10,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default Terms;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    padding: 15,
    marginTop: 20,
    borderRadius: 4,
    fontSize: 18,
    borderColor: COLORS.orange,
    fontFamily: "Truculenta-Regular",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
