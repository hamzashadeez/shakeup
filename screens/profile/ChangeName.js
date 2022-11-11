import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Auth } from "aws-amplify";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";

const ChangeName = ({ navigation, route }) => {
  const [user_data, setUser] = useRecoilState(userData);
  const { name, family_name, middle_name } = route.params.data;
  const [firstName, setFirstName] = useState(name);
  const [middle, setMiddleName] = useState("Optional");
  const [btnLabel, setBtnLabel] = useState("Save");
  const [LastName, setLastName] = useState("Optional");
  const [borderTwo, setBorderTwo] = useState(0);
  const [borderThree, setBorderThree] = useState(0);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [borderColor, setBorderColor] = useState("white");
  const saveNewInfo = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();

      if (firstName.length > 1) {
        setBtnLabel("Saving");
        let result = await Auth.updateUserAttributes(user, {
          name: firstName,
          family_name: LastName,
          middle_name: middle,
        }).then(async () => {
          // get the user again
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          setUser({
            ...authUser.attributes,
            username: authUser.attributes.preferred_username,
          });
        });
        setTimeout(() => {
          setShowSaveBtn(false);
          setBtnLabel("Save");
          Toast.show({
            type: "success",
            text1: "Changes Successfully Saved",
            position: "bottom",
          });
        }, 50);
      } else {
        setBorderColor(COLORS.red);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
    // save the new info
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
        <CustomHeader name={"Name"} />
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
            <Text style={styles.label}>First Name</Text>
            <TextInput
              value={firstName}
              onFocus={() => {
                setShowErrorMessage(false);
                setBorderColor(COLORS.primary);
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
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Middle</Text>
            <TextInput
              value={middle}
              onChangeText={(e) => {
                setShowSaveBtn(true);
                setMiddleName(e);
              }}
              placeholder={middle ? middle : "Optional"}
              onFocus={() => setBorderTwo(2)}
              onEndEditing={() => setBorderTwo(0)}
              style={[styles.input, { borderColor: "white" }]}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              value={LastName}
              onFocus={() => setBorderThree(2)}
              placeholder={LastName ? LastName : "Optional"}
              onChangeText={(e) => {
                setShowSaveBtn(true);
                setLastName(e);
              }}
              onEndEditing={() => setBorderThree(0)}
              style={[styles.input, { borderColor: "white" }]}
            />
          </View>
          {/* end */}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </CustomScreen>
  );
};

export default ChangeName;

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
