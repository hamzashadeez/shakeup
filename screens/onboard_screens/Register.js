import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS, hp } from "../../Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRecoilS, useRecoilState } from "recoil";
import authData from "../../recoil/authData";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(null);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [show, showText] = useState(false);
  const [showAvatar, setAvatar] = useState(true);
  const [userAuth, setUserAuth] = useRecoilState(authData);

  const changeText = (text) => {
    setName(text);
    if (text.length > 0 && text.length < 2) {
      console.log(true);
    } else {
      if (text.length !== 0) {
        setValid(true);
        showText(false);
      } else {
        setValid(null);
        setColoredBoarder("white");
      }
    }
  };

  const validateText = (text) => {
    if (text.length > 0 && text.length < 2) {
      setValid(false);
      showText(true);
      setColoredBoarder(COLORS.yellow);
    } else {
      if (text.length !== 0) {
        setValid(true);
        setUserAuth({ ...userAuth, fullname: name });
        navigation.navigate("username");
      } else {
        setValid(null);
      }
      showText(false);
    }
  };

  const signUp = () => {
    validateText(name);
    // if (valid) {
    //   navigation.navigate("username");
    // }
  };
  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* <Header /> */}
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // height: "9%",
            padding: 10,
            flexDirection: "row",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text}>ShakeUP</Text>
            <Image
              source={require("../../assets/cup.png")}
              style={styles.cup}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={{
              paddingVertical: 10,
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        {/* end header */}
        <View style={{ paddingHorizontal: 15, flex: 1, position: "relative" }}>
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginBottom: hp("1.97%"),
              marginTop: hp("8.12%"),
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              color: "#EEEFF0",
              fontFamily: "Truculenta-Regular",
            }}
          >
            Welcome to learning cocktails!
          </Text>

          {/* form */}
          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              First Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(e) => changeText(e)}
              placeholder="Enter First Name"
              onFocus={() => {
                setAvatar(false);
                setColoredBoarder(COLORS.orange);
              }}
              onEndEditing={() => setAvatar(true)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                  // valid === null
                  //   ? "white"
                  //   : valid === true
                  //   ? COLORS.orange
                  //   : COLORS.yellow,
                },
              ]}
            />
          </View>
          {show && (
            <Text
              style={{
                color: COLORS.yellow,
                fontSize: 16,
                fontFamily: "Truculenta-Regular",
              }}
            >
              Error: Must be 2 or more characters
            </Text>
          )}
          <TouchableOpacity
            onPress={() => signUp()}
            disabled={valid ? false : true}
            style={[
              styles.btn,
              { backgroundColor: valid ? COLORS.orange : "#E3E4E6" },
            ]}
          >
            <Text
              style={{
                fontFamily: "Truculenta-Regular",
                color: valid ? "white" : "#000",
                fontSize: 18,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          {/* end form */}
        </View>
      </KeyboardAwareScrollView>
      {showAvatar && (
        <Image
          source={require("../../assets/ShakeUp.png")}
          resizeMode="contain"
          style={{
            width: "100%",
            height: hp("35%"),
            zIndex: -10,
            position: "absolute",
            bottom: -10,
          }}
        />
      )}
    </Screen>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 50,
    paddingLeft: 15,
    marginTop: 5,
    borderRadius: 4,
    fontSize: 18,
    borderWidth: 2,
    fontFamily: "Truculenta-Regular",
  },
  btn: {
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    fontSize: 18,
    borderColor: COLORS.orange,
    fontFamily: "Truculenta-Regular",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 22,
  },
  cup: {
    height: 27,
    width: 21,
    marginLeft: -18,
    marginBottom: 4,
  },
});
