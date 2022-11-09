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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const OTP = ({ navigation, route }) => {
  const { name, username, email } = route.params;
  const [otpcode, setOTP] = useState("");
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [_, setUser] = useRecoilState(userData);
  const [showError, setErrorMessage] = useState(false);

  const changeText = (text) => {
    setOTP(text);
  };

  const submit = async () => {
    try {
      await Auth.confirmSignUp(email, otpcode).then((user) => {
        setUser({ name, username, email });
      });
    } catch (error) {
      setErrorMessage(true);
      console.log("error confirming sign up", error);
    }
    // if OTP is correct, Navigate to Update State
    //else, display error message
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
            Verify OTP Code
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#EEEFF0",
              fontFamily: "Truculenta-Regular",
            }}
          >
            We have sent an OTP Code to your email address
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
              OTP Code
            </Text>
            <TextInput
              value={otpcode}
              onChangeText={(e) => changeText(e)}
              placeholder="00000"
              onFocus={() => {
                setErrorMessage(true);
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
          {/* end form */}
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
