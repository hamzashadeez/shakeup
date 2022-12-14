import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS, hp } from "../../Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import authData from "../../recoil/authData";
import { useRecoilState } from "recoil";
import { Ball } from "../../components/ProgressBar";

const Email = ({ navigation, route }) => {
  // const { name, username, data } = route.params;
  const data = [];
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(null);
  const [show, showText] = useState(false);
  const [emailExistError, setEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [showAvatar, setAvatar] = useState(true);
  const [userAuth, setUserAuth] = useRecoilState(authData);

  function validateEmail(email) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const changeText = (text) => {
    setEmail(text);
    showText(false);
  };

  const gotoEmail = () => {
    if (userAuth.email !== "") {
      navigation.navigate("email");
    }
  };
  const gotoOTP = () => {
    // if (userAuth.password !== "") {
    //   navigation.navigate("email");
    // }
  };

  const gotoUsername = () => {
    if (userAuth.username !== "") {
      navigation.navigate("username");
    }
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
          username: userAuth.username,
          password: "password",
          attributes: {
            email,
            // preferred_username: "",
            name: userAuth.fullname,
            family_name: "",
            middle_name: "",
          },
          autoSignIn: {
            enabled: true,
          },
        });
        setUserAuth({ ...userAuth, email });

        navigation.navigate("otp");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === "User already exists") {
          setEmailExist(true);
        } else {
          Alert.alert("Alert!", error.message);
        }
        console.log("error signing up:", error.message);
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
        {/* <Header /> */}
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // height: "9%",
            padding: 10,
            flexDirection: "row",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text}>ShakeUP</Text>
            <Image
              source={require("../../assets/cup.png")}
              style={styles.cup}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={{
              paddingVertical: 10,
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        {/* end */}
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          {/* progress */}
          <View style={styles.progressContainer}>
            <View style={styles.line}></View>
            <Ball borderred fill onPress={() => navigation.goBack()} />
            <Ball borderred fill onPress={() => gotoUsername()} />
            <Ball borderred onPress={() => gotoEmail()} />
            <Ball onPress={() => gotoOTP()} />
          </View>
          {/* end progress */}
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginBottom: hp("1.97%"),
              marginTop: hp("4.12%"),
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
                setAvatar(false);
                setEmailExist(false);
                setColoredBoarder(COLORS.orange);
              }}
              onEndEditing={() => setAvatar(true)}
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
              Error: Invalid Email Address
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
      {showAvatar && (
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
      )}
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
  text: {
    color: "white",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 22,
  },
  cup: {
    height: 27,
    width: 21,
    marginLeft: -18,
    marginBottom: 4,
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
