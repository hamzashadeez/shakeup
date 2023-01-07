import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import { Entypo } from "@expo/vector-icons";
import { COLORS, hp } from "../../Theme";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const OpenCard = ({ navigation }) => {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  return (
    <CustomScreen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ padding: 5, paddingLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-thin-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.label}>Cosmopolitan</Text>
      </View>
      {/* end header */}
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          {show === false && (
            <TouchableOpacity
              style={{ padding: 3 }}
              onPress={() => setShow(false)}
            >
              <MaterialCommunityIcons
                name="credit-card"
                size={17}
                color={COLORS.primary}
              />
              <MaterialCommunityIcons
                name="credit-card"
                size={17}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          )}
          {show === true && (
            <TouchableOpacity
              style={{ padding: 3 }}
              onPress={() => setShow(false)}
            >
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={17}
                color="black"
              />
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={17}
                color="black"
              />
            </TouchableOpacity>
          )}
          {show === false && (
            <TouchableOpacity
              style={{ padding: 3 }}
              onPress={() => setShow(true)}
            >
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={17}
                color={"black"}
              />
            </TouchableOpacity>
          )}
          {show === true && (
            <TouchableOpacity
              style={{ padding: 3 }}
              onPress={() => setShow(true)}
            >
              <MaterialCommunityIcons
                name="credit-card"
                size={17}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ padding: 7 }}
              onPress={() => setShowModal(true)}
            >
              <MaterialCommunityIcons
                name="arrow-expand"
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ height: "100%" }}>
          <Image
            resizeMode="contain"
            source={require("../../assets/Cosmopolitan_Front.png")}
            style={{ width: "94%", marginLeft: "3%", height: 200 }}
          />
          {show === false && (
            <Image
              resizeMode="contain"
              source={require("../../assets/Cosmopolitan_Front.png")}
              style={{
                width: "94%",
                marginLeft: "3%",
                height: 200,
                marginTop: 10,
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("play")}
            style={{
              backgroundColor: COLORS.primary,
              width: "90%",
              marginLeft: "5%",
              padding: 10,
              borderRadius: 5,
              marginTop: 50,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Truculenta-Regular",
                color: "#fff",
              }}
            >
              Play
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal animationType="slide" isVisible={showModal}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            paddingTop: "5%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{
              padding: 15,
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 40,
              paddingBottom: 25,
            }}
          >
            <AntDesign name="close" size={35} color="white" />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            source={require("../../assets/Cosmopolitan_Front.png")}
            style={{
              width: hp("80%"),
              margin: 120,
              transform: [{ rotateZ: "90deg" }],
            }}
          />
        </View>
      </Modal>
      {/* end Moda; */}
    </CustomScreen>
  );
};

export default OpenCard;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 55,
    // justifyContent: "space-between",
  },
  label: {
    fontFamily: "Truculenta-Regular",
    fontSize: 24,
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
});
