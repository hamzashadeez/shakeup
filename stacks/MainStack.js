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
    function getUser() {
      return Auth.currentAuthenticatedUser()
        .then((userData) => userData)
        .catch(() => console.log("Not signed in"));
    }
    const syncUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUser({
          ...authUser?.attributes,
          // username: authUser?.attributes.preferred_username,
        });
        // check database
        // const user = await API.graphql(
        //   graphqlOperation(getUsers, { id: authUser.attributes.email })
        // );

        // if (user.data.getUsers) {
        //   // console.log("already in DB", user.data.getUsers);
        //   return;
        // }

        // const newUser = {
        //   id: authUser.attributes.email,
        //   email: authUser.attributes.email,
        //   username: authUser.attributes.preferred_username,
        //   name: authUser.attributes.name,
        //   password: "",
        //   last: "",
        //   middle: "",
        // };

        // await API.graphql(graphqlOperation(createUsers, { input: newUser }))
        //   .then(() => console.log("Added"))
        //   .catch((err) => console.log("error from DB: ", err));
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
