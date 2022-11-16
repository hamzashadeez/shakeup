import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import CustomScreen from "../../components/CustomScreen";

const Dog = ({ navigation }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("drag");
  //   }, 2500);
  // }, []);
  return (
    <CustomScreen>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          source={require("../../assets/ShakeUp.png")}
        />
      </View>
    </CustomScreen>
  );
};

export default Dog;

const styles = StyleSheet.create({});
