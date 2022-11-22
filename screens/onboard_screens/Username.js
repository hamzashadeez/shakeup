import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS, hp } from "../../Theme";
import { API, graphqlOperation } from "aws-amplify";
import { listUserData } from "../../src/graphql/queries";

const Username = ({ navigation, route }) => {
  const { fullname } = route.params;
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const [data, setData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [showAvatar, setAvatar] = useState(true);

  const changeText = (text) => {
    setName(text);
    if (text.length > 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    // check database
    const checkUsers = async () => {
      const user = await API.graphql(graphqlOperation(listUserData));
      console.log(user.data.listUserData.items);
      let _ = user.data.listUserData.items;
      setData(_);
      console.log("user: ", data);
    };
    checkUsers();
  }, []);

  const next = () => {
    // save username and go to the username screen
    if (valid === false) return;
    const found = data.some((item) => item.username === name);
    if (found) {
      setShowError(true);
    } else {
      navigation.navigate("email", {
        name: fullname,
        username: name,
        data,
      });
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
              Username
            </Text>
            <TextInput
              value={name}
              onChangeText={(e) => changeText(e)}
              placeholder="Enter Username"
              onFocus={() => {
                setAvatar(false);
                setShowError(false);
                setColoredBoarder(COLORS.orange);
              }}
              onEndEditing={() => setAvatar(true)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                },
              ]}
            />
            {showError && (
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Username Not Available
              </Text>
            )}
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
        </View>
        {showAvatar && (
          <Image
            source={require("../../assets/ShakeUp.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: hp("40%"),
              zIndex: -10,
              position: "absolute",
              bottom: -10,
            }}
          />
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default Username;

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
  },
});
