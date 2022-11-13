import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import { Auth } from "aws-amplify";
import HomeHeader from "../components/HomeHeader";
import GeneralScreen from "../components/GeneralScreen";
import Item from "../components/Item";

const Discover = () => {
  const [_, setUser] = useRecoilState(userData);
  useEffect(() => {
    const getuser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // setUser({
      //   ...authUser.attributes,
      //   username: authUser.attributes.preferred_username,
      // });
      console.log("user ", authUser.attributes);
    };

    getuser();
  }, []);
  return (
    <>
      <HomeHeader />
      <GeneralScreen>
        {/* content goes here */}
        <View style={{ height: 10 }} />
        <Item />
        {/* <Item /> */}
      </GeneralScreen>
    </>
  );
};

export default Discover;

const styles = StyleSheet.create({});
