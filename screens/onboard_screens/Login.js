import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";
import PasswordField from "../../components/PasswordField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import userData from "../../recoil/userData";
import { useRecoilState } from "recoil";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listUsers, getUsers } from "../../src/graphql/queries";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coloredBoarder, setColoredBoarder] = useState("white");
  const [coloredBoarder2, setColoredBoarder2] = useState("white");
  const [_, setUser] = useRecoilState(userData);
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // useEffect(() => {
  //   API.graphql(graphqlOperation(listUsers)).then((result) =>
  //     console.log(result.data?.listUsers?.items)
  //   );
  // }, []);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const data = await API.graphql(
  //       graphqlOperation(getUsers, {
  //         id: "564fbec1-6605-4594-b680-c011b2ab72bc",
  //       })
  //     );
  //     console.log(data.data.getUsers);
  //   };
  //   getUserData();
  // }, []);
  // Log in
  async function signIn() {
    setLoading(true);
    try {
      const user = await Auth.signIn(email, password).then(() => {
        console.log("Signed Successfully");
      });
    } catch (error) {
      setLoading(false);
      setShowErrorMessage(true);
      console.log("error signing in", error);
    }
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    setUser({
      ...authUser.attributes,
      username: authUser.attributes.preferred_username,
    });
    // const userStored = await API.graphql(
    //   graphqlOperation(getUsers, { id: email })
    // );
    // if (userStored.data.getUsers) {
    //   setUser(userStored.data.getUsers);
    //   // console.log("user fetched data ", userStored.data.getUsers);
    //   return;
    // }
  }
  return (
    <Screen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
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
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: "white",
              fontFamily: "Truculenta-Regular",
              marginTop: 66,
            }}
          >
            Log In
          </Text>

          {/* form */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Enter Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholder="Enter Email"
              keyboardType="email-address"
              onFocus={() => {
                setShowErrorMessage(false);
                setColoredBoarder(COLORS.orange);
              }}
              onEndEditing={() => setColoredBoarder(COLORS.primary)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder,
                },
              ]}
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#EEEFF0",
                fontFamily: "Truculenta-Regular",
              }}
            >
              Enter Password
            </Text>
            <PasswordField
              value={password}
              onChangeText={(e) => setPassword(e)}
              placeholder="Enter password"
              onFocus={() => {
                setShowErrorMessage(false);
                setColoredBoarder2(COLORS.orange);
              }}
              onEndEditing={() => setColoredBoarder2(COLORS.primary)}
              style={[
                styles.input,
                {
                  borderColor: coloredBoarder2,
                },
              ]}
            />
            {showErrorMessage && (
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Error: Incorrcet email or password
              </Text>
            )}
          </View>
          {!loading && (
            <TouchableOpacity
              onPress={() => signIn()}
              disabled={email !== "" && password !== "" ? false : true}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    email !== "" && password !== "" ? COLORS.orange : "#E3E4E6",
                },
              ]}
            >
              <Text
                style={{
                  color: email !== "" && password !== "" ? "white" : "#777",
                  fontSize: 16,
                  fontFamily: "Truculenta-Regular",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          )}
          {/* loader */}
          {loading && (
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: COLORS.orange,
                },
              ]}
            >
              <ActivityIndicator color="#fff" size={16} />
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Text />
          </TouchableOpacity>
          {/* end form */}

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("forgotusername")}
              style={{
                display: "flex",
                alignItems: "flex-start",
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
                Forgot Username
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("forgotpassword")}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 5,
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
                Forgot Password
              </Text>
            </TouchableOpacity>

            <Image
              source={require("../../assets/ShakeUp.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: 300,
                marginTop: -70,
                zIndex: -10,
                opacity: 0.12,
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default Login;

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
    display: "flex",
    // height: 54,
    padding: 15,
    marginTop: 20,
    borderRadius: 3,
    fontSize: 18,
    fontFamily: "Truculenta-Regular",
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
});
