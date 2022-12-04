import {
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS, hp } from "../../Theme";
import PasswordField from "../../components/PasswordField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import { useRecoilState } from "recoil";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import userData from "../../recoil/userData";
import CustomHeader from "../../components/CustomHeader";
import CustomScreen from "../../components/CustomScreen";

const NewPassword2 = ({ navigation, route }) => {
  const { username } = route.params;

  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [btnLabel, setBtnLabel] = useState("Save");
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
  const [coloredBoarder3, setColoredBoarder3] = useState("white");
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
        setColoredBoarder(COLORS.orange);
        setColoredBoarder2(COLORS.orange);
        setShowCountErrorLabel(true);
      }
    } else {
      tempMatch = false;
      setmatch(false);
      setColoredBoarder(COLORS.orange);
      setColoredBoarder2(COLORS.orange);
      setCPassword("");
      setShowMatchErrorLabel(true);
    }

    if (tempValid && tempMatch) {
      // change password here
      setLoading(true);
      setBtnLabel("Saving");
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
            setTimeout(() => navigation.navigate("home"), 2000);
          })
          .catch((err) => {
            console.log("New password: ", err);
            Alert.alert("Error!", err.message);
            setBtnLabel("Save");

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
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CustomHeader name={"New Password"} />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          {/* controls */}
          <View style={[styles.flex, { marginTop: 0 }]}>
            {/* backBtn */}
            <TouchableOpacity
              style={{ padding: 5, paddingLeft: 0 }}
              onPress={() => navigation.goBack()}
            >
              <Entypo name="chevron-thin-left" size={24} color="#111" />
            </TouchableOpacity>
            {/* save btn */}
            {/* {showSaveBtn && ( */}
            {true && (
              <TouchableOpacity
                style={[styles.flex, { marginTop: 0 }]}
                onPress={() => next()}
              >
                {btnLabel === "Saving" && (
                  <ActivityIndicator size={20} color="#333" />
                )}
                <Text style={[styles.label, { fontSize: 24, marginLeft: 10 }]}>
                  {btnLabel}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* form */}
          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
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
              onFocus={() => setColoredBoarder3(COLORS.primary)}
              onEndEditing={() => setColoredBoarder3("white")}
              style={[
                styles.input,
                { borderColor: coloredBoarder3, marginBottom: 7 },
              ]}
            />
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Create Password
            </Text>
            <PasswordField
              value={password}
              secureTextEntry={true}
              onFocus={() => setColoredBoarder(COLORS.primary)}
              onEndEditing={() => setColoredBoarder("white")}
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
                color: "gray",
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
              onFocus={() => setColoredBoarder2(COLORS.primary)}
              placeholder="Confirm Password"
              onEndEditing={() => setColoredBoarder2("white")}
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
                  color: COLORS.orange,
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
                  color: COLORS.orange,
                  fontSize: 16,
                  marginTop: 5,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Password do not match
              </Text>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </CustomScreen>
  );
};

export default NewPassword2;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0000000F",
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
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  label: {
    fontFamily: "Truculenta-Regular",
    fontSize: 16,
    color: "#000000DE",
  },
});
