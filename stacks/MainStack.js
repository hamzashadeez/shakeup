import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import BoardStack from "./BoardStack";
import AppStack from "./AppStack";
import { API, Auth, graphqlOperation } from "aws-amplify";
// import { getUsers } from "../src/graphql/queries";
// import { createUsers } from "../src/graphql/mutations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import learningData from "../recoil/learningData";

const MainStack = () => {
  const [user_data, setUser] = useRecoilState(userData);
  const [learning, setLearning] = useRecoilState(learningData);
  const [state, setState] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUser({
          ...authUser?.attributes,
        });
      } catch (error) {
        console.log("MainStack: ", error);
      }
    };

    syncUser();
  }, []);
  //
  useEffect(() => {
    async function check() {
      AsyncStorage.getItem("cosmopolitan").then((value) => {
        if (value !== null) {
          setLearning(JSON.parse(value));
        }
      });
      //  update database
    }
    check();
  }, [learning]);

  return (
    <View style={{ flex: 1 }}>
      {user_data === null ? <BoardStack /> : <AppStack />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
