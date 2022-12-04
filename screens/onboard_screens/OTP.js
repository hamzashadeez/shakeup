import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API, Auth, graphqlOperation } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";
import { createUserData, deleteUserData } from "../../src/graphql/mutations";
import uuid from "react-native-uuid";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ball } from "../../components/ProgressBar";
import authData from "../../recoil/authData";

const OTP = ({ navigation, route }) => {
  const [otpcode, setOTP] = useState("");
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [_, setUser] = useRecoilState(userData);
  const [showError, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAuth, setUserAuth] = useRecoilState(authData);

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(userAuth.username);
      console.log("code resent successfully");
      Toast.show({
        type: "success",
        text1: "Resent Confirmation Code Successful",
        position: "bottom",
      });
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  const changeText = (text) => {
    setOTP(text);
  };
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  const changeEmail = async () => {
    // Delete the existing email;
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false.
    })
      .then((user) => {
        user.deleteUser((error, data) => {
          if (error) {
            throw error;
          }
          if (data) console.log(data);

          // Delete all user data in your system

          // Log the user out
          Auth.signOut({ global: true });
        });
      })
      .catch((err) => console.log(err));
    // change state email to ""
    setUserAuth({ ...userAuth, email: "" });
    // Delete from DB as well
    // await API.graphql(
    //   graphqlOperation(deleteUserData, { input: { id: userAuth.email } })
    // );
    // navigate to email screen
    navigation.navigate("email");
  };

  const submit = async () => {
    if (loading === true) return;
    try {
      setLoading(true);
      await Auth.confirmSignUp(userAuth.username, otpcode).then(() => {
        console.log("Succefully Registed");
      });

      const newUser = {
        // id: uuid.v4(),
        name: userAuth.fullname,
        username: userAuth.username,
        id: userAuth.email,
        email: userAuth.email,
      };
      console.log(newUser);

      await API.graphql(graphqlOperation(createUserData, { input: newUser }))
        .then(() => console.log("Added"))
        .catch((err) => console.log("error from DB: ", err));

      setLoading(false);
      navigation.navigate("createpassword");
      // setUser({ name, username, email, password });
    } catch (error) {
      setErrorMessage(true);
      setLoading(false);
      console.log("error confirming sign up from OTP", error);
    }
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

  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 7, flex: 1 }}>
          {/* progress */}
          <View style={styles.progressContainer}>
            <View style={styles.line}></View>
            <Ball borderred fill onPress={() => navigation.goBack()} />
            <Ball borderred fill onPress={() => gotoUsername()} />
            <Ball borderred fill onPress={() => gotoEmail()} />
            <Ball borderred onPress={() => navigation.goBack()} />
          </View>
          {/* end progress */}

          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginTop: 10,
              marginBottom: 12,
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#EEEFF0",
              fontFamily: "Truculenta-Regular",
            }}
          >
            To verify your email, we've sent a One Time Password (OTP) to{" "}
            {userAuth.email}
          </Text>
          <TouchableOpacity
            onPress={() => changeEmail()}
            style={{
              width: "40%",
              marginLeft: "30%",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.green2,
                fontFamily: "Truculenta-Regular",
                textAlign: "center",
              }}
            >
              (change)
            </Text>
          </TouchableOpacity>

          {/* form */}
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#EEEFF0",
                  fontFamily: "Truculenta-Regular",
                }}
              >
                OTP Code
              </Text>
              <TouchableOpacity onPress={() => resendConfirmationCode()}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.green2,
                    fontFamily: "Truculenta-Regular",
                  }}
                >
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={otpcode}
              onChangeText={(e) => changeText(e)}
              placeholder="00000"
              onFocus={() => {
                setErrorMessage(false);
                setColoredBoarder(COLORS.orange);
              }}
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                },
              ]}
            />
          </View>
          {showError && (
            <Text
              style={{
                color: COLORS.yellow,
                fontSize: 16,
                fontFamily: "Truculenta-Regular",
              }}
            >
              Error: Incorrect OTP Code
            </Text>
          )}
          {!loading && (
            <TouchableOpacity
              onPress={() => submit()}
              disabled={otpcode.length > 3 ? false : true}
              style={[
                styles.btn,
                {
                  backgroundColor: true ? COLORS.orange : "#E3E4E6",
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "Truculenta-Regular",
                  color: true ? "white" : "#000",
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
          height: 260,
          zIndex: -10,
          position: "absolute",
          bottom: -10,
        }}
      />
      <Toast config={toastConfig} />
    </Screen>
  );
};

export default OTP;

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
  line: {
    height: 2,
    width: "90%",
    marginHorizontal: 20,
    backgroundColor: "white",
    position: "absolute",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 28,
    position: "relative",
  },
});
