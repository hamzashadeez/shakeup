import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import authData from "../recoil/authData";
import { useRecoilState } from "recoil";
import { COLORS } from "../Theme";

export const Ball = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 26,
        width: 26,
      }}
    >
      <View
        style={{
          borderColor: props.borderred ? COLORS.orange : "white",
          borderWidth: 2,
          backgroundColor: props.fill ? COLORS.orange : "white",
          height: 20,
          width: 20,
          borderRadius: 13,
        }}
      ></View>
    </TouchableOpacity>
  );
};

const ProgressBar = ({ navigation, route, active }) => {
  const [userAuth, setUserAuth] = useRecoilState(authData);

  const gotoEmail = () => {
    if (userAuth.email !== "") {
      navigation.navigate("email");
    }
  };

  const gotoUsername = () => {
    if (userAuth.username !== "") {
      navigation.navigate("username");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 28,
        position: "relative",
      }}
    >
      <View style={styles.line}></View>
      <Ball index={1} active={active} onPress={() => navigation.goBack()} />
      <Ball index={2} active={active} onPress={() => gotoUsername()} />
      <Ball index={3} active={active} onPress={() => gotoEmail()} />
      <Ball index={4} active={active} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: "90%",
    marginHorizontal: 20,
    backgroundColor: "white",
    position: "absolute",
  },
});
