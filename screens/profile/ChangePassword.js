import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { BaseToast } from "react-native-toast-message";
import PasswordField from "../../components/PasswordField";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [borderColorOne, setBorderColorOne] = useState("white");
  const [borderColorTwo, setBorderColorTwo] = useState("white");
  const [borderColorThree, setBorderColorThree] = useState("white");
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Save");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [user] = useState({
    password: "hamza1",
  });

  const [user_data, setUser] = useRecoilState(userData);

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

    error: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: COLORS.orange }}
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

  const infoHasChanged = (text) => {
    let userFieldValues = { password: text };
    // if (JSON.stringify(userFieldValues) === JSON.stringify(user)) {
    //   setShowSaveBtn(false);
    // } else {
    setShowSaveBtn(true);
    // }
  };

  const saveNewInfo = () => {
    if (newpassword.length < 6) {
      setError2(true);
      setBorderColorTwo(COLORS.red);
      setBtnLabel("Save");
      return;
    }

    if (cpassword === newpassword) {
      setShowSaveBtn(false);
      setBtnLabel("Save");
      // function is here
      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, password, newpassword);
        })
        .then((data) => {
          Toast.show({
            type: "success",
            text1: "Successfully Changed",
            position: "bottom",
          });
          console.log(data);
        })
        .catch((err) => {
          if (
            err ===
            "password error [NotAuthorizedException: Incorrect username or password.]"
          ) {
            // console.log("Incorrect Password");
            setError1(true);
            setBorderColorOne(COLORS.red);
            setBtnLabel("Save");
            setShowSaveBtn(false);
          } else if (
            (err =
              "password error [LimitExceededException: Attempt limit exceeded, please try after some time.]")
          ) {
            Alert.alert(
              "Limit Exceeded",
              "Attempt limit exceeded, please try after some time"
            );
          } else {
            console.log("password error", err);
          }
        });

      // end of function
    } else {
      setError3(true);
      setBorderColorThree(COLORS.red);
      setBtnLabel("Save");
      return;
    }

    // if (password === user.password) {
    //   // save the new info
    //   setBtnLabel("Saving");
    // } else {
    //   setError1(true);
    //   setBorderColorOne(COLORS.red);
    //   setBtnLabel("Save");
    //   setShowSaveBtn(false);
    //   return;
    // }

    // if (newpassword.length < 6) {
    //   setError2(true);
    //   setBorderColorTwo(COLORS.red);
    //   setBtnLabel("Save");
    //   return;
    // }

    // if (cpassword === newpassword) {
    //   setTimeout(() => {
    //     setShowSaveBtn(false);
    //     setBtnLabel("Save");
    //     // function is here
    //     Toast.show({
    //       type: "success",
    //       text1: "Successfully Changed",
    //       position: "bottom",
    //     });
    //   }, 50);
    // } else {
    //   setError3(true);
    //   setBorderColorThree(COLORS.red);
    //   setBtnLabel("Save");
    //   return;
    // }
  };

  return (
    <CustomScreen>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={{ backgroundColor: "white" }}
      >
        <CustomHeader name={"Change Password"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, padding: 20 }}
        >
          <View style={[styles.flex, { marginTop: 0 }]}>
            {/* backBtn */}
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.goBack()}
            >
              <Entypo name="chevron-thin-left" size={24} color="#111" />
            </TouchableOpacity>
            {showSaveBtn && (
              <TouchableOpacity
                style={[styles.flex, { marginTop: 0 }]}
                onPress={() => saveNewInfo()}
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

          <View style={{ marginTop: 20 }}>
            <View style={styles.flex}>
              <Text style={styles.label}>Current Password</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("forgot_password2")}
              >
                <Text style={styles.label2}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            {/* field */}
            <PasswordField
              value={password}
              onFocus={() => {
                setError1(false);
                setBorderColorOne(COLORS.primary);
              }}
              onEndEditing={() => setBorderColorOne("white")}
              onChangeText={(e) => {
                setPassword(e);
                infoHasChanged(e);
              }}
              style={[styles.input, { borderColor: borderColorOne }]}
            />
            {/* Error Message */}
            {error1 && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Incorrect Password
              </Text>
            )}

            <Text style={[styles.label, { marginTop: 20 }]}>New Password</Text>
            <PasswordField
              value={newpassword}
              onFocus={() => {
                setError2(false);
                setBorderColorTwo(COLORS.primary);
              }}
              onEndEditing={() => setBorderColorTwo("white")}
              onChangeText={(e) => {
                setNewPassword(e);
                setShowSaveBtn(true);
              }}
              style={[styles.input, { borderColor: borderColorTwo }]}
            />
            {/* Error Message */}
            {error2 && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Minimum 6 characters
              </Text>
            )}
            <Text style={[styles.label, { marginTop: 20 }]}>
              Confirm New Password
            </Text>
            <PasswordField
              value={cpassword}
              onFocus={() => {
                setError3(false);
                setBorderColorThree(COLORS.primary);
              }}
              onEndEditing={() => setBorderColorThree("white")}
              onChangeText={(e) => {
                setcPassword(e);
                setShowSaveBtn(true);
              }}
              style={[styles.input, { borderColor: borderColorThree }]}
            />
            {/* Error Message */}
            {error3 && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Passwords don't match
              </Text>
            )}
          </View>

          {/* end */}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </CustomScreen>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
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
  label2: {
    fontFamily: "Truculenta-Regular",
    fontSize: 16,
    color: COLORS.primary,
  },
  input: {
    backgroundColor: "#0000000F",
    height: 50,
    padding: 15,
    marginTop: 5,
    borderRadius: 3,
    fontSize: 18,
    fontFamily: "Truculenta-Regular",
    borderWidth: 2,
    color: "#000000DE",
  },
  relative: {
    position: "relative",
  },
  chevron: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  changeBtn: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
});
