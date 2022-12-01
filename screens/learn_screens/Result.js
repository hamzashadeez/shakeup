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
import { COLORS } from "../../Theme";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import Record from "../../components/Record";
import { useRecoilState } from "recoil";
import recordData from "../../recoil/recordData";

const Result = ({ navigation }) => {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [records, _] = useRecoilState(recordData);

  const reset = () => {
    navigation.navigate("opencard");
  };
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
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          {false && (
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
          {false && (
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
          {false && (
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
          {false && (
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
          <ScrollView
            horizontal
            style={{ height: 160, marginTop: 10, paddingVertical: 3 }}
          >
            {records.map((record) => (
              <Record data={record} key={record.timeStamp} />
            ))}
          </ScrollView>
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => reset()}
              style={{
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            >
              <FontAwesome name="repeat" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "60%",
                height: 40,
                borderRadius: 5,
                backgroundColor: "#6EB528AD",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Truculenta-Regular",
                  fontSize: 18,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Play Another Card
              </Text>
            </TouchableOpacity>
          </View>
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
              flex: 1,
              // width: "100%",
              // width: 500,
              // height: 200,
              margin: 120,
              transform: [{ rotateZ: "90deg" }],
            }}
          />
          {/* <Image
            resizeMode="contain"
            source={require("../../assets/Cosmopolitan_Back.png")}
            style={{ width: "100%", height: "35%", marginTop: 15 }}
          /> */}
        </View>
      </Modal>
      {/* end Moda; */}
    </CustomScreen>
  );
};

export default Result;

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
