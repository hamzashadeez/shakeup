import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { BaseToast } from "react-native-toast-message";

const ChangeEmail = ({ navigation }) => {
  const [email, setEmail] = useState("john@gmail.com");
  const [borderOne, setBorderOne] = useState(0);
  const [borderTwo, setBorderTwo] = useState(0);
  const [show, showText] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Save");
  const [user] = useState({
    email: "john@gmail.com",
  });

  const infoHasChanged = (email) => {
    let userFieldValues = { email };
    if (JSON.stringify(userFieldValues) === JSON.stringify(user)) {
      setShowSaveBtn(false);
    } else {
      setShowSaveBtn(true);
    }
  };

  const verifyOTP = () => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Changes Successfully Saved",
        position: "bottom",
      });
      setShowModal(false);
    }, 200);
  };

  function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
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

  const saveNewInfo = () => {
    // save the new info
    showText(!validateEmail(email));
    if(validateEmail(email) === true){
      setBtnLabel("Saving");
      setTimeout(() => {
        setShowSaveBtn(false);
        setBtnLabel("Save");
        setShowModal(true);
      }, 100);

    }else{
      setShowSaveBtn(false);
    }
  };

  return (
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
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
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onFocus={() => {showText(false);setBorderOne(2)}}
              onEndEditing={() => setBorderOne(0)}
              keyboardType='email-address'
              onChangeText={(e) => {
                setEmail(e);
                infoHasChanged();
              }}
              style={[styles.input, { borderWidth: borderOne }]}
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
              Error: Invalid input
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
                {email}
              </Text>
              <TextInput
                onFocus={() => setBorderTwo(2)}
                onEndEditing={() => setBorderTwo(0)}
                placeholder="00000"
                style={[styles.input, { borderWidth: borderTwo }]}
              />
              <TouchableOpacity
                onPress={() => verifyOTP()}
                style={[
                  styles.input,
                  {
                    justifyContent: "center",
                    marginTop: 25,
                    alignItems: "center",
                    backgroundColor: COLORS.primary,
                  },
                ]}
              >
                <Text style={[styles.label, { color: "white" }]}>Verify</Text>
              </TouchableOpacity>

              <TouchableOpacity
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
  modalView: { backgroundColor: "white", flex: 1, marginTop: 25, padding: 20 },
});
