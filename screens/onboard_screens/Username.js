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
import Header from "../../components/Header";
import { COLORS } from "../../Theme";

const Username = ({ navigation, route }) => {
  const { fullname } = route.params;
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
      navigation.navigate("email", { name: fullname, username: name });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen>
        <Header />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          <Image
            source={require("../../assets/1.png")}
            resizeMode="contain"
            style={{ width: "100%", height: 28 }}
          />

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
              Username
            </Text>
            <TextInput
              value={name}
              onChangeText={(e) => changeText(e)}
              placeholder="Enter Username"
              onFocus={() => setColoredBoarder(COLORS.orange)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            disabled={valid ? false : true}
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
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default Username;

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
});
