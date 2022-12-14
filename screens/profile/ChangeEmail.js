import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { BaseToast } from "react-native-toast-message";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const ChangeEmail = ({ navigation, route }) => {
  const { email } = route.params.data;
  const [_, setUser] = useRecoilState(userData);
  const [emaili, setEmail] = useState(email);
  const [borderOne, setBorderOne] = useState(0);
  const [borderTwo, setBorderTwo] = useState(0);
  const [show, showText] = useState(false);
  const [emailUnavailable, setEmailUnavailable] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [incorrectOTP, setIncorrectOTP] = useState(false);
  const [otpCode, setOTPCode] = useState("");
  const [borderColor2, setBorderColor2] = useState("white");
  const [btnLabel, setBtnLabel] = useState("Save");
  const [borderColor, setBorderColor] = useState("white");
  const [loading, setLoading] = useState(false);
  const [user] = useState({
    emaili: "john@gmail.com",
  });

  const OTP = "12345";

  const infoHasChanged = (emaili) => {
    let userFieldValues = { emaili };
    if (JSON.stringify(userFieldValues) === JSON.stringify(user)) {
      setShowSaveBtn(false);
    } else {
      setShowSaveBtn(true);
    }
  };

  // Update User Attributes here
  // let user = await Auth.currentAuthenticatedUser();

  // let result = await Auth.updateUserAttributes(user, {
  //   preferred_username: firstName,
  // }).then(async () => {
  //   // get the user again
  //   const authUser = await Auth.currentAuthenticatedUser({
  //     bypassCache: true,
  //   });
  //   setUser({
  //     ...authUser.attributes,
  //     username: authUser.attributes.preferred_username,
  //   });
  //   Toast.show({
  //     type: "success",
  //     text1: "Changes Successfully Saved",
  //     position: "bottom",
  //   });
  //   setBtnLabel("Save");
  //   setShowSaveBtn(false);
  // });
  // console.log("Changed"); // SUCCESS

  const verifyOTP = async () => {
    if (loading === true) return;
    try {
      setLoading(true);
      let result = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        otpCode
      );
      // get the user again
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser({
        ...authUser.attributes,
        username: authUser.attributes.preferred_username,
      });
      Toast.show({
        type: "success",
        text1: "Changes Successfully Saved",
        position: "bottom",
      });
      setBtnLabel("Save");
      setShowSaveBtn(false);

      setShowModal(false);
      console.log("Changed"); // SUCCESS
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
    }
  };

  async function resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
      Toast.show({
        type: "success",
        text1: "Code resent successfully",
        position: "bottom",
      });
    } catch (err) {
      Alert.alert("Error", err);
      console.log("error resending code: ", err);
    }
  }

  function validateEmail(emaili) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(emaili).toLowerCase());
  }

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

  let emailList = ["hamza@gmail.com", "saulawaj@yahoo.com"];

  const saveNewInfo = async () => {
    try {
      showText(!validateEmail(emaili));
      if (validateEmail(emaili) === true) {
        // update
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
          email: emaili,
        }).then(() => setShowModal(true));
      } else {
        setShowSaveBtn(false);
        setBorderColor(COLORS.red);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomScreen>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={{ backgroundColor: "white" }}
      >
        <CustomHeader name={"Email Address"} />
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
              {/* <Entypo name="chevron-thin-left" size={24} color="#111" /> */}
              <Image
                source={require("../../assets/arrow_back.png")}
                resizeMode="contain"
                style={{ width: 24, height: 27, margin: 0, marginLeft: 0 }}
              />
            </TouchableOpacity>
            {/* save btn */}
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
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={emaili}
              onFocus={() => {
                showText(false);
                setEmailUnavailable(false);
                setBorderColor(COLORS.primary);
                setBorderOne(2);
              }}
              onEndEditing={() => setBorderColor("white")}
              keyboardType="email-address"
              onChangeText={(e) => {
                setEmail(e);
                infoHasChanged();
              }}
              style={[styles.input, { borderColor }]}
            />
            {/* error message */}
            {show && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Check your spelling, Invalid format
              </Text>
            )}
            {emailUnavailable && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Email Address unavailable
              </Text>
            )}
          </View>
          {/* Modal */}
          <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{ alignSelf: "flex-end" }}
              >
                <Ionicons name="close" size={35} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.label,
                  { fontSize: 24, textAlign: "center", marginTop: 30 },
                ]}
              >
                OTP CODE
              </Text>
              <Text
                style={[
                  styles.label,
                  { fontSize: 18, textAlign: "center", marginTop: 30 },
                ]}
              >
                Code was sent to
              </Text>
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
              >
                {emaili}
              </Text>
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setIncorrectOTP(false);
                  setBorderColor2(COLORS.primary);
                }}
                onEndEditing={() => setBorderColor2("white")}
                placeholder="00000"
                value={otpCode}
                onChangeText={(e) => setOTPCode(e)}
                style={[styles.input, { borderColor: borderColor2 }]}
              />
              {incorrectOTP && (
                <Text
                  style={{
                    color: COLORS.red,
                    fontSize: 16,
                    fontFamily: "Truculenta-Regular",
                  }}
                >
                  Error: Incorrect OTP code
                </Text>
              )}
              <TouchableOpacity
                onPress={() => verifyOTP()}
                style={[
                  styles.input,
                  {
                    justifyContent: "center",
                    marginTop: 25,
                    borderWidth: 0,
                    alignItems: "center",
                    backgroundColor: COLORS.primary,
                  },
                ]}
              >
                <Text style={[styles.label, { color: "white" }]}>Verify</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => resendConfirmationCode()}
                style={{ marginTop: 25, padding: 15, width: "32%" }}
              >
                <Text style={styles.label2}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* end */}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </CustomScreen>
  );
};

export default ChangeEmail;

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
  modalView: { backgroundColor: "white", flex: 1, marginTop: 25, padding: 20 },
});
