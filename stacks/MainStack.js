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
import progress from "../recoil/progress";

const MainStack = () => {
  const [user_data, setUser] = useRecoilState(userData);
  const [learning, setLearning] = useRecoilState(learningData);
  const [progressData, setprogress] = useRecoilState(progress);
  const [state, setState] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("progress").then((value) => {
      if (value !== null) {
        setprogress(JSON.parse(value));
      }
      console.info("progress", progressData);
    });
  }, []);

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
      // will be removed later
      AsyncStorage.getItem("cosmopolitanx").then((value) => {
        if (value !== null) {
          setLearning(JSON.parse(value));
        }
      });
      //  update database
    }
    check();
  }, [learning]);

  // track progress
  // useEffect(() => {
  //   AsyncStorage.getItem("progress").then((value) => {
  //     if (value !== null) {
  //       setprogress(JSON.parse(value));
  //     }
  //     console.info("progress undate", progressData);
  //   });
  // }, [progressData]);

  return (
    <View style={{ flex: 1 }}>
      {user_data === null ? <BoardStack /> : <AppStack />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
