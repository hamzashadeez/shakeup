import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const ForgotPassword2 = ({ navigation, route }) => {
  const [user_data, setUser] = useRecoilState(userData);
  let name = "";
  //   const { name, family_name, middle_name } = route.params.data;
  const [btnLabel, setBtnLabel] = useState("Save");
  const [email, setEmail] = useState("");
  const [border, setBorder] = useState(0);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [borderColor, setBorderColor] = useState("white");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const forgotpassword = async () => {
    // Send confirmation code to user's email
    // console.log("Presssed");
    if (email === "") return;

    setLoading(true);
    setBtnLabel(true);
    if (validateEmail(email)) {
      Auth.forgotPassword(email)
        .then((data) => {
          // if everything is successfull...
          setBtnLabel("Saving");

          Toast.show({
            type: "success",
            text1: "Check your mail",
            position: "bottom",
          });
          setTimeout(() => {
            navigation.navigate("newpassword", { username: email });
          }, 1200);
          setLoading(false);
          setShowSaveBtn(false);
        })
        .catch((err) => {
          setBtnLabel("Save");

          if (err.message === "Username/client id combination not found.") {
            Alert.alert("Alert!", "User not found");
          } else {
            alert(err);
          }
          console.log(err.message);
          setLoading(false);
          setShowSaveBtn(false);
        });
    } else {
      setShowValidEmail(true);
      setLoading(false);
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
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CustomHeader name={"Forgot Password"} />
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
            {/* save btn */}
            {showSaveBtn && (
              <TouchableOpacity
                style={[styles.flex, { marginTop: 0 }]}
                onPress={() => forgotpassword()}
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
              value={email}
              onFocus={() => setBorder(2)}
              placeholder="Insert Email Address"
              onChangeText={(e) => {
                setShowSaveBtn(true);
                setEmail(e);
              }}
              onEndEditing={() => setBorder(0)}
              style={[styles.input, { borderWidth: border }]}
            />
          </View>
          {/* end */}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </CustomScreen>
  );
};

export default ForgotPassword2;

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
    color: "#000000DE",
    borderColor: COLORS.primary,
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
