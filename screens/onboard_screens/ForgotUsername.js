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
import PasswordField from "../../components/PasswordField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotUsername = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [valid, setValid] = useState(null);
  const [match, setmatch] = useState(null);
  const [showMatchErorrLabel, setShowMatchErrorLabel] = useState(false);
  const [showCountErrorLabel, setShowCountErrorLabel] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [coloredBoarder2, setColoredBoarder2] = useState("white");
  const [showAvatar, setAvatar] = useState(true);

  let tempValid = valid;
  let tempMatch = match;

  const changeText = (text) => {
    setCPassword(text);
    realtimeValidation();
    setShowMatchErrorLabel(false);
    setShowCountErrorLabel(false);
  };

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
      setShowMatchErrorLabel(true);
    }

    if (tempValid && tempMatch) {
      navigation.navigate("home");
    }
  };
  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
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
            Reset Password
          </Text>

          {/* form */}
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              New Password
            </Text>
            <PasswordField
              value={password}
              onFocus={() => {
                setAvatar(false);
                setColoredBoarder(COLORS.orange);
              }}
              onEndEditing={() => {
                setAvatar(true);
                setColoredBoarder(COLORS.primary);
              }}
              onChangeText={(e) => {
                setPassword(e);
                realtimeValidation();
                setShowMatchErrorLabel(false);
                setShowCountErrorLabel(false);
              }}
              placeholder="Create Password"
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                },
              ]}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
                marginTop: 10,
              }}
            >
              Confirm New Password
            </Text>
            <PasswordField
              value={cpassword}
              onChangeText={(e) => changeText(e)}
              onEndEditing={() => {
                setAvatar(true);
                setColoredBoarder2(COLORS.primary);
              }}
              onFocus={() => {
                setAvatar(false);
                setColoredBoarder2(COLORS.orange);
              }}
              placeholder="Confirm Password"
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
          <TouchableOpacity
            onPress={() => next()}
            style={[
              styles.btn,
              {
                backgroundColor: "#E3E4E6",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "Truculenta-Regular",
                color: "#000",
                fontSize: 18,
              }}
            >
              Continue
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
            height: hp("40%"),
            zIndex: -10,
            opacity: 0.12,
            position: "absolute",
            bottom: -10,
          }}
        />
      )}
    </Screen>
  );
};

export default ForgotUsername;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 50,
    marginTop: 5,
    paddingLeft: 15,
    borderRadius: 4,
    fontSize: 18,
    borderWidth: 2,
    fontFamily: "Truculenta-Regular",
  },
  btn: {
    height: 50,
    padding: 15,
    marginTop: 25,
    borderRadius: 4,
    fontSize: 18,
    borderColor: COLORS.orange,
    fontFamily: "Truculenta-Regular",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
