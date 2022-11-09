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
import { COLORS } from "../../Theme";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PasswordField from "../../components/PasswordField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";

const CreatePassword = ({ navigation, route }) => {
  const { name, username, email } = route.params;
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [valid, setValid] = useState(null);
  const [match, setmatch] = useState(null);
  const [showMatchErorrLabel, setShowMatchErrorLabel] = useState(false);
  const [showCountErrorLabel, setShowCountErrorLabel] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [coloredBoarder2, setColoredBoarder2] = useState("white");
  let tempValid = valid;
  let tempMatch = match;

  const changeText = (text) => {
    setCPassword(text);
    realtimeValidation();
    setShowMatchErrorLabel(false);
    setShowCountErrorLabel(false);
  };

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          preferred_username: username,
          name,
        },
        autoSignIn: {
          enabled: true,
        },
      }).then(() => {
        navigation.navigate("otp", { name, username, email });
      });
      console.log("sucessfully....", user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  const realtimeValidation = () => {
    if (password === cpassword) {
      tempMatch = true;
      setmatch(true);
    } else {
      tempMatch = false;
      setmatch(false);
    }
    if (cpassword.length > 5 && cpassword.length > 5) {
      tempValid = true;
      setValid(true);
    } else {
      tempValid = false;
      setValid(false);
    }
  };

  const next = () => {
    // save username and go to the username screen
    if (password === cpassword) {
      tempMatch = true;
      setmatch(true);
      setShowMatchErrorLabel(false);
      //
      if (cpassword.length > 5 && cpassword.length > 5) {
        tempValid = true;
        setValid(true);
        setShowCountErrorLabel(false);
      } else {
        // check for matching
        tempValid = false;
        setValid(false);
        setColoredBoarder(COLORS.yellow);
        setColoredBoarder2(COLORS.yellow);
        setShowCountErrorLabel(true);
      }
    } else {
      tempMatch = false;
      setmatch(false);
      setColoredBoarder(COLORS.yellow);
      setColoredBoarder2(COLORS.yellow);
      setCPassword("");
      setShowMatchErrorLabel(true);
    }

    if (tempValid && tempMatch) {
      // signup here
      signUp();
    }
  };
  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          <Image
            source={require("../../assets/3.png")}
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
              Create Password
            </Text>
            <PasswordField
              value={password}
              secureTextEntry={true}
              onFocus={() => setColoredBoarder(COLORS.orange)}
              onEndEditing={() => setColoredBoarder(COLORS.primary)}
              onChangeText={(e) => {
                setPassword(e);
                realtimeValidation();
                setShowMatchErrorLabel(false);
                setShowCountErrorLabel(false);
              }}
              placeholder="Create Password"
              style={[styles.input, { borderColor: coloredBoarder }]}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
                marginTop: 10,
              }}
            >
              Confirm Password
            </Text>
            <PasswordField
              value={cpassword}
              secureTextEntry={true}
              onChangeText={(e) => changeText(e)}
              onFocus={() => setColoredBoarder2(COLORS.orange)}
              placeholder="Confirm Password"
              onEndEditing={() => setColoredBoarder2(COLORS.primary)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder2,
                },
              ]}
            />
            {valid === false && showCountErrorLabel && (
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Must be 6 characters or more
              </Text>
            )}
            {match === false && showMatchErorrLabel && (
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Password didn't match
              </Text>
            )}
          </View>

          {/*checkbox*/}
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.orange}
              unfillColor="#BCC0C4"
              style={{ borderRadius: 0 }}
              iconStyle={{ borderRadius: 2 }}
              innerIconStyle={{ borderWidth: 0, color: "blue" }}
              textStyle={{ fontFamily: "Truculenta-Regular" }}
              onPress={(e) => {
                setAgreed(e);
              }}
            />
            <Text style={styles.text}>
              I Agree to{" "}
              <Text
                onPress={() => navigation.navigate("terms")}
                style={{ color: COLORS.yellow }}
              >
                Terms & Conditions
              </Text>
            </Text>
          </View>
          {/*end checkbox*/}
          <TouchableOpacity
            onPress={() => next()}
            disabled={password.length > 1 && agreed ? false : true}
            style={[
              styles.btn,
              {
                backgroundColor: agreed === true ? COLORS.orange : "#E3E4E6",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "Truculenta-Regular",
                color: agreed === true ? "#fff" : "#000",
                fontSize: 18,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
          {/* end form */}
          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 300,
              zIndex: -10,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 50,
    padding: 15,
    marginTop: 5,
    borderRadius: 3,
    fontSize: 18,
    borderWidth: 2,
    fontFamily: "Truculenta-Regular",
  },
  btn: {
    height: 50,
    padding: 15,
    marginTop: 25,
    borderRadius: 3,
    fontSize: 18,
    borderColor: COLORS.orange,
    fontFamily: "Truculenta-Regular",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Truculenta-Regular",
    marginLeft: -10,
  },
});
