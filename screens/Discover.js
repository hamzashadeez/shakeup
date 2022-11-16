import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import { Auth } from "aws-amplify";
import HomeHeader from "../components/HomeHeader";
import GeneralScreen from "../components/GeneralScreen";
import Item from "../components/Item";
import Logo from "../assets/svg/Club_Soda.svg";

const Discover = () => {
  const [_, setUser] = useRecoilState(userData);
  const [learning, setLearning] = useState(false);

  return (
    <>
      <HomeHeader />
      <GeneralScreen>
        <View style={{ height: 10 }} />
        <Item />
      </GeneralScreen>
    </>
  );
};

export default Discover;

const styles = StyleSheet.create({});
