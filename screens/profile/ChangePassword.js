import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { BaseToast } from "react-native-toast-message";
import PasswordField from "../../components/PasswordField";

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [borderOne, setBorderOne] = useState(0);
  const [borderTwo, setBorderTwo] = useState(0);
  const [borderThree, setBorderThree] = useState(0);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Save");
  const [user] = useState({
    password: "hamza1",
  });

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
    if (password === user.password) {
      // save the new info
      setBtnLabel("Saving");
      if (cpassword === newpassword) {
        setTimeout(() => {
          setShowSaveBtn(false);
          setBtnLabel("Save");
          Toast.show({
            type: "success",
            text1: "Successfully Changed",
            position: "bottom",
          });
        }, 50);
      } else {
        Toast.show({
          type: "error",
          text1: "Password didn't match",
          position: "bottom",
        });
        setBtnLabel("Save");
        setShowSaveBtn(false);
        return;
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Incorrect Password",
        position: "bottom",
      });
      setBtnLabel("Save");
      setShowSaveBtn(false);
      return;
    }
  };

  return (
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
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
                onPress={() => navigation.navigate("change_username")}
              >
                <Text style={styles.label2}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            {/* field */}
            <PasswordField
              value={password}
              onFocus={() => setBorderOne(2)}
              onEndEditing={() => setBorderOne(0)}
              onChangeText={(e) => {
                setPassword(e);
                infoHasChanged(e);
              }}
              style={[styles.input, { borderWidth: borderOne }]}
            />
            <Text style={[styles.label, { marginTop: 20 }]}>New Password</Text>
            <PasswordField
              value={newpassword}
              onFocus={() => setBorderTwo(2)}
              onEndEditing={() => setBorderTwo(0)}
              onChangeText={(e) => {setNewPassword(e); setShowSaveBtn(true);}}
              style={[styles.input, { borderWidth: borderTwo }]}
            />
            <Text style={[styles.label, { marginTop: 20 }]}>
              Confirm New Password
            </Text>
            <PasswordField
              value={cpassword}
              onFocus={() => setBorderThree(2)}
              onEndEditing={() => setBorderThree(0)}
              onChangeText={(e) => {setcPassword(e); setShowSaveBtn(true)}}
              style={[styles.input, { borderWidth: borderThree }]}
            />
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
