import {
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS, hp } from "../../Theme";
import PasswordField from "../../components/PasswordField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import { useRecoilState } from "recoil";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import userData from "../../recoil/userData";

const NewPassword = ({ navigation, route }) => {
  const { name, username, email } = route.params;
  // let username = "";
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [valid, setValid] = useState(null);
  const [match, setmatch] = useState(null);
  const [showMatchErorrLabel, setShowMatchErrorLabel] = useState(false);
  const [showCountErrorLabel, setShowCountErrorLabel] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [user_data, setUser] = useRecoilState(userData);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [coloredBoarder2, setColoredBoarder2] = useState("white");
  let tempValid = valid;
  let tempMatch = match;

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

  const next = async () => {
    // save username and go to the username screen
    if (code.length < 5) {
      alert("Incorrect Verification code");
      return;
    }
    //
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
      // change password here
      setLoading(true);
      try {
        // Collect confirmation code and new password, then
        Auth.forgotPasswordSubmit(username, code, password)
          .then(() => {
            setLoading(false);
            Toast.show({
              type: "success",
              text1: "Password Changed Successfully",
              position: "bottom",
            });
            setTimeout(() => navigation.navigate("login"), 3000);
          })
          .catch((err) => {
            console.log("New password: ", err);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.log("Error from password ", error);
        alert(error);
      }
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
              marginBottom: hp("1.97%"),
              marginTop: hp("3.12%"),
            }}
          >
            New Password
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
              Verification Code
            </Text>
            <TextInput
              value={code}
              onChangeText={(e) => setCode(e)}
              keyboardType="numeric"
              placeholder="e.g 000000"
              style={[
                styles.input,
                { borderColor: COLORS.primary, marginBottom: 7 },
              ]}
            />
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
                  marginTop: 5,
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
                  marginTop: 5,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Password do not match
              </Text>
            )}
          </View>

          {/*end checkbox*/}
          {!loading && (
            <TouchableOpacity
              onPress={() => next()}
              disabled={password.length > 5 ? false : true}
              style={[
                styles.btn,
                {
                  backgroundColor: password.length > 5 ? COLORS.orange : "#fff",
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "Truculenta-Regular",
                  color: password.length > 5 ? "#fff" : "#000",
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
      <Toast config={toastConfig} />

      {/* <Image
        source={require("../../assets/ShakeUp.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 300,
          zIndex: -10,
          position: "absolute",
          bottom: -10,
        }}
      /> */}
    </Screen>
  );
};

export default NewPassword;

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
    marginTop: 25,
    borderRadius: 4,
    fontSize: 18,
    borderColor: COLORS.primary,
    borderWidth: 2,
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
