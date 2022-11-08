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

const ChangeName = ({ navigation }) => {
  const [firstName, setFirstName] = useState("John");
  const [middle, setMiddleName] = useState("");
  const [btnLabel, setBtnLabel] = useState("Save");
  const [LastName, setLastName] = useState("");
  const [borderTwo, setBorderTwo] = useState(0);
  const [borderThree, setBorderThree] = useState(0);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [borderColor, setBorderColor] = useState("white");
  const [user] = useState({
    firstName: "John",
    middle: "",
    LastName: "",
  });

  const infoHasChanged = (name) => {
    let userFieldValues = { firstName: name, middle, LastName };
    if (JSON.stringify(userFieldValues) === JSON.stringify(user)) {
      setShowSaveBtn(false);
    } else {
      setShowSaveBtn(true);
    }
  };

  const saveNewInfo = () => {
    // save the new info
    if (firstName.length > 1) {
      setBtnLabel("Saving");
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
                infoHasChanged(e);
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
                Error: Email Address unavailable
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Middle</Text>
            <TextInput
              value={middle}
              placeholder="Optional"
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
              placeholder="Optional"
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
