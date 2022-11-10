import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import BoardStack from "./BoardStack";
import AppStack from "./AppStack";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUsers } from "../src/graphql/queries";
import { createUsers } from "../src/graphql/mutations";

const MainStack = () => {
  const [user_data, setUser] = useRecoilState(userData);
  const [state, setState] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUser({
          ...authUser.attributes,
          username: authUser.attributes.preferred_username,
        });
        // check database
        const user = await API.graphql(
          graphqlOperation(getUsers, { id: authUser.attributes.email })
        );

        if (user.data.getUsers) {
          // console.log("already in DB", user.data.getUsers);
          return;
        }

        const newUser = {
          id: authUser.attributes.email,
          email: authUser.attributes.email,
          username: authUser.attributes.preferred_username,
          name: authUser.attributes.name,
          password: "",
          last: "",
          middle: "",
        };

        await API.graphql(
          graphqlOperation(createUsers, { input: newUser })
        ).then(() => console.log("Added"));
      } catch (error) {
        console.log(error);
      }
    };

    syncUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {user_data === null ? <BoardStack /> : <AppStack />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
