import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";

const Home = () => {
  return (
    <Screen>
      <Header />
      <View style={{ flex: 1, display: "flex", alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30, color: 'white', fontWeight: "bold"}}>Home Screen</Text>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
