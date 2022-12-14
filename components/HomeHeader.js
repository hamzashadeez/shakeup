import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { COLORS } from "../Theme";
import { AntDesign } from "@expo/vector-icons";

const HomeHeader = () => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>ShakeUP</Text>
          <Image
            source={require("../assets/cup.png")}
            style={styles.cup}
            resizeMode="contain"
          />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={{
            backgroundColor: "#eee",
            height: 40,
            flex: 1,
            marginLeft: 7,
            paddingHorizontal: 15,
          }}
        />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text2}>All Liquors</Text>
          <AntDesign
            name="caretdown"
            size={14}
            color="white"
            style={{ marginLeft: 7 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  controls: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    display: "flex",
    marginTop: -10,
    alignItems: "center",
    padding: 7,
    justifyContent: "space-between",
    paddingHorizontal: 13,
  },
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    padding: 13,
    paddingTop: 24,
  },
  btn: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 22,
  },
  text2: {
    color: "white",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 15,
  },
  cup: {
    height: 27,
    width: 21,
    marginLeft: -18,
    marginBottom: 4,
  },
});
