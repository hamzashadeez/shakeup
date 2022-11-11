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
import { createUsers } from "../../src/graphql/mutations";

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
      await Auth.confirmSignUp(email, otpcode).then(() => {
        console.log("Succefully Registed");
      });
      navigation.navigate("createpassword", { name, email });
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
              fontSize: 22,
              textAlign: "center",
              color: "#EEEFF0",
              fontFamily: "Truculenta-Regular",
            }}
          >
            To verify your email, we've sent a One Time Password (OTP) to{" "}
            {email}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("email")}
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
          <View style={{ marginTop: 32 }}>
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

          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 300,
              // marginTop: -100,
              zIndex: -10,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default OTP;

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
    marginTop: 20,
    borderRadius: 3,
    fontSize: 18,
    borderColor: COLORS.orange,
    fontFamily: "Truculenta-Regular",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
