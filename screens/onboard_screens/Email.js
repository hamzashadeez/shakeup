import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";

const Email = ({ navigation, route }) => {
  const { name, username, data } = route.params;
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(null);
  const [show, showText] = useState(false);
  const [emailExistError, setEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");

  function validateEmail(email) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const changeText = (text) => {
    setEmail(text);
    showText(false);
  };

  async function signUp() {
    if (loading === true) return;
    const found = data.some((item) => item.email === email);

    if (found) {
      setEmailExist(true);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const user = await Auth.signUp({
          username,
          password: "password",
          attributes: {
            email,
            // preferred_username: "",
            name,
            family_name: "",
            middle_name: "",
          },
          autoSignIn: {
            enabled: true,
          },
        });

        navigation.navigate("otp", {
          name,
          username,
          email,
        });
      } catch (error) {
        setLoading(false);
        console.log("error signing up:", error);
      }
    }
  }

  const submit = () => {
    if (email.length === 0) {
      setValid(null);
      showText(false);
    } else {
      setValid(validateEmail(email));
      showText(!validateEmail(email));
    }
    if (validateEmail(email)) {
      setLoading(true);
      signUp();
    } else {
      setColoredBoarder(COLORS.yellow);
    }
  };

  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          <Image
            source={require("../../assets/2.png")}
            resizeMode="contain"
            style={{ width: "100%", height: 28 }}
          />
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginTop: 20,
              marginBottom: 12,
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
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={(e) => changeText(e)}
              placeholder="Enter Email"
              onFocus={() => {
                setEmailExist(false);
                setColoredBoarder(COLORS.orange);
              }}
              keyboardType="email-address"
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
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
              Error: Invalid input
            </Text>
          )}
          {emailExistError && (
            <Text
              style={{
                color: COLORS.yellow,
                fontSize: 16,
                fontFamily: "Truculenta-Regular",
              }}
            >
              Error: Email Address Not Available
            </Text>
          )}
          {!loading && (
            <TouchableOpacity
              onPress={() => submit()}
              disabled={email.length > 3 ? false : true}
              style={[
                styles.btn,
                {
                  backgroundColor: validateEmail(email)
                    ? COLORS.orange
                    : "#E3E4E6",
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "Truculenta-Regular",
                  color: validateEmail(email) ? "white" : "#000",
                  fontSize: 18,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          )}
          {/* end form */}
          {/* loader */}
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
      </KeyboardAwareScrollView>
      <Image
        source={require("../../assets/ShakeUp.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 300,
          zIndex: -10,
          position: "absolute",
          bottom: -10,
        }}
      />
    </Screen>
  );
};

export default Email;

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
});
