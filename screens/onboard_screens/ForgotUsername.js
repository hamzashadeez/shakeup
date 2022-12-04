import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import { COLORS, hp } from "../../Theme";
import { Entypo } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const ForgotUsername = ({ navigation }) => {
  const [email, setName] = useState("");
  const [valid, setValid] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [showAvatar, setAvatar] = useState(true);
  const [showValidEmail, setShowValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeText = (text) => {
    setShowValidEmail();
    setName(text);
    if (text.length > 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  function validateEmail(email) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const forgotpassword = async () => {
    // setLoading(true);
    // if (validateEmail(email)) {
    //   Auth.forgotPassword(email)
    //     .then((data) => {
    //       // if everything is successfull...
    //       Toast.show({
    //         type: "success",
    //         text1: "Check your mail",
    //         position: "bottom",
    //       });
    //       setTimeout(() => {
    //         navigation.navigate("newpassword", { username: email });
    //       }, 1000);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       alert(err);
    //       console.log(err);
    //       setLoading(false);
    //     });
    // } else {
    //   setShowValidEmail(true);
    // }
  };

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: COLORS.green }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          color: "white",
          fontFamily: "Truculenta-Regular",
        }}
      />
    ),
  };

  // Collect confirmation code and new password, then
  // Auth.forgotPasswordSubmit(username, code, new_password)
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  const next = () => {
    // save username and go to the username screen
    if (valid) {
      navigation.navigate("login");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen>
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
            onPress={() => navigation.navigate("signup")}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* end header */}
        <View style={{ paddingHorizontal: 15, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              position: "relative",
            }}
          >
            <TouchableOpacity
              style={[styles.backBtn, { position: "absolute", zIndex: 30 }]}
              onPress={() => navigation.navigate("login")}
            >
              <Entypo name="chevron-thin-left" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "white",
                fontFamily: "Truculenta-Regular",
                textAlign: "center",
                flex: 1,
              }}
            >
              Forgot Username
            </Text>
          </View>

          {/* form */}
          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={(e) => changeText(e)}
              keyboardType="email-address"
              placeholder="Insert Email Address"
              onFocus={() => {
                setColoredBoarder(COLORS.orange);
              }}
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
            {showValidEmail && (
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Invalid input
              </Text>
            )}
          </View>
          {!loading && (
            <TouchableOpacity
              onPress={() => forgotpassword()}
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
                Submit
              </Text>
            </TouchableOpacity>
          )}
          {loading && (
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: COLORS.orange,
                },
              ]}
            >
              <ActivityIndicator color="#fff" size={16} />
            </TouchableOpacity>
          )}
        </View>
        {showAvatar && (
          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: hp("35%"),
              zIndex: -10,
              opacity: 0.12,
              position: "absolute",
              bottom: -10,
            }}
          />
        )}
        <Toast config={toastConfig} />
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ForgotUsername;

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
  backBtn: {
    padding: 10,
  },
});
