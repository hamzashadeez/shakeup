import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import { Auth } from "aws-amplify";

const Discover = () => {
  const [_, setUser] = useRecoilState(userData);
  useEffect(() => {
    const getuser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser({
        ...authUser.attributes,
        username: authUser.attributes.preferred_username,
      });
      console.log(_);
    };

    // getuser();
  }, []);
  return (
    <View>
      <Text>Discover</Text>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
