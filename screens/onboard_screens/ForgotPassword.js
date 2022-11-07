import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import { COLORS } from "../../Theme";
import { Entypo } from "@expo/vector-icons";

const ForgotPassword = ({ navigation }) => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");

  const changeText = (text) => {
    setName(text);
    if (text.length > 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const next = () => {
    // save username and go to the username screen
    if (valid) {
      navigation.navigate("login");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen>
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
            onPress={() => navigation.navigate("signup")}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* end header */}
        <View style={{ paddingHorizontal: 15, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.navigate("login")}>
              <Entypo name="chevron-thin-left" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "white",
                fontFamily: "Truculenta-Regular",
                textAlign: "center",
                flex: 1
              }}
            >
              Forgot Password
            </Text>
          </View>

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
              value={name}
              onChangeText={(e) => changeText(e)}
              keyboardType="email-address"
              placeholder="Insert Email Address"
              onFocus={() => setColoredBoarder(COLORS.orange)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                  // valid === null
                  //   ? "white"
                  //   : valid === true
                  //   ? COLORS.orange
                  //   : COLORS.yellow,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={() => next()}
            style={[
              styles.btn,
              { backgroundColor: valid ? COLORS.orange : "#E3E4E6" },
            ]}
          >
            <Text
              style={{
                fontFamily: "Truculenta-Regular",
                color: valid ? "white" : "#000",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
         
          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 300,
              zIndex: -10,
              opacity: 0.12,
            }}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
  backBtn:{
    padding: 10
  }
});
