import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import BoardStack from "./BoardStack";
import AppStack from "./AppStack";
import { Auth } from "aws-amplify";

const MainStack = () => {
  const [user_data, setUser] = useRecoilState(userData);
  const [state, setState] = useState(null);

  const emptyObject = {
    email: "",
    password: "",
    username: "",
    name: "",
  };

  // Auth.currentAuthenticatedUser()

  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(authUser.attributes);
      // setState(authUser.attributes);
      setUser(authUser.attributes);
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
