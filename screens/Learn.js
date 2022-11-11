import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import { Auth } from "aws-amplify";
import HomeHeader from "../components/HomeHeader";
import GeneralScreen from "../components/GeneralScreen";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../Theme";

const Learn = () => {
  const [_, setUser] = useRecoilState(userData);
  useEffect(() => {
    const getuser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser({
        ...authUser.attributes,
        username: authUser.attributes.preferred_username,
      });
      console.log(_);
    };

    // getuser();
  }, []);
  return (
    <>
      <HomeHeader />
      <GeneralScreen>
        {/* content goes here */}
        <View style={{ height: 10 }} />
        <View
          style={{
            display: "flex",
            backgroundColor: "#0000000F",
            marginHorizontal: 13,
            flexDirection: "row",
            alignItems: "center",
            padding: 13,
          }}
        >
          <Text style={{ marginRight: 20 }}>
            <AntDesign name="creditcard" size={20} color="black" />
          </Text>
          <Text style={styles.text2}>Cosmopolitan</Text>
          <BouncyCheckbox
            size={23}
            isChecked={true}
            fillColor={"#6EB528"}
            unfillColor="#BCC0C4"
            style={{ borderRadius: 0 }}
            // iconStyle={{ borderRadius: 2 }}
            innerIconStyle={{ borderWidth: 0, color: "blue" }}
            textStyle={{ fontFamily: "Truculenta-Regular" }}
            // onPress={(e) => {
            //   setAgreed(e);
            // }}
          />
        </View>
      </GeneralScreen>
    </>
  );
};

export default Learn;

const styles = StyleSheet.create({
  text2: {
    color: "#000000DE",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 15,
    flex: 1,
  },
});
