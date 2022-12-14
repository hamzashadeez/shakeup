import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { BaseToast } from "react-native-toast-message";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const ChangeUsername = ({ navigation, route }) => {
  const { preferred_username } = route.params.data;
  const [firstName, setFirstName] = useState(preferred_username);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Save");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorMessage2, setShowErrorMessage2] = useState(false);
  const [borderColor, setBorderColor] = useState("white");
  const [user_data, setUser] = useRecoilState(userData);

  const usernameList = ["hamza", "joe"];
  console.log("------", preferred_username);

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

  const saveNewInfo = async () => {
    try {
      setBtnLabel("Saving");
      // save the new info
      if (firstName.length > 1) {
        // Update User Attributes here
        let user = await Auth.currentAuthenticatedUser();

        let result = await Auth.updateUserAttributes(user, {
          preferred_username: firstName,
        }).then(async () => {
          // get the user again
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          setUser({
            ...authUser.attributes,
            // username: authUser.attributes.username,
          });
          Toast.show({
            type: "success",
            text1: "Changes Successfully Saved",
            position: "bottom",
          });
          setBtnLabel("Save");
          setShowSaveBtn(false);
        });
        console.log("Changed"); // SUCCESS
      } else {
        setBorderColor(COLORS.red);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Error", error);
    }
  };

  return (
    <CustomScreen>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={{ backgroundColor: "white" }}
      >
        <CustomHeader name={"Username"} />
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
              <Image
                source={require("../../assets/arrow_back.png")}
                resizeMode="contain"
                style={{ width: 24, height: 27, margin: 0, marginRight: 0 }}
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
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={firstName}
              onFocus={() => {
                setShowErrorMessage(false);
                setBorderColor(COLORS.primary);
                setShowErrorMessage2(false);
              }}
              onEndEditing={() => setBorderColor("white")}
              onChangeText={(e) => {
                setFirstName(e);
                setShowSaveBtn(true);
              }}
              style={[styles.input, { borderColor }]}
            />
            {showErrorMessage && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Must be 2 or more characters
              </Text>
            )}
            {showErrorMessage2 && (
              <Text
                style={{
                  color: COLORS.red,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Username unavailable
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

export default ChangeUsername;

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
    color: "#000000DE",
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
});
