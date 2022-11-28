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
import { createUserData } from "../../src/graphql/mutations";

const OTP = ({ navigation, route }) => {
  const { name, username, email, password } = route.params;
  // let email = "ebbg@gmail.com";
  const [otpcode, setOTP] = useState("");
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [_, setUser] = useRecoilState(userData);
  const [showError, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeText = (text) => {
    setOTP(text);
  };
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  const submit = async () => {
    if (loading === true) return;
    try {
      setLoading(true);
      await Auth.confirmSignUp(username, otpcode).then(() => {
        console.log("Succefully Registed");
      });

      const newUser = {
        id: email,
        email,
        username,
        name,
      };

      await API.graphql(graphqlOperation(createUserData, { input: newUser }));
      // .then(() => console.log("Added"))
      // .catch((err) => console.log("error from DB: ", err));

      navigation.navigate("createpassword", { name, email, username });
      // setUser({ name, username, email, password });
    } catch (error) {
      setErrorMessage(true);
      setLoading(false);
      console.log("error confirming sign up from OTP", error);
    }
  };

  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 7, flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/3.png")}
              resizeMode="contain"
              style={{ width: "100%", height: 28 }}
            />
          </TouchableOpacity>

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
            {email}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
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
              <TouchableOpacity>
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
          height: 300,
          zIndex: -10,
          position: "absolute",
          bottom: -10,
        }}
      />
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
});
