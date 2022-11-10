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
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser.attributes);
      // check database
      const user = await API.graphql(
        graphqlOperation(getUsers, { id: authUser.attributes.email })
      );

      if (user.data.getUsers) {
        return;
      }

      const newUser = {
        id: authUser.attributes.email,
        email: authUser.attributes.email,
        username: authUser.attributes.preferred_username,
        name: authUser.attributes.name,
        password: "",
      };

      await API.graphql(graphqlOperation(createUsers, { input: newUser }));
    };

    syncUser();
  }, [user_data]);

  return (
    <View style={{ flex: 1 }}>
      {user_data === null ? <BoardStack /> : <AppStack />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
