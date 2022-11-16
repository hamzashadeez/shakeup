import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../Theme";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import learningData from "../recoil/learningData";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = () => {
  const [showModal, setShowModal] = useState(false);
  const [learning, setLearning] = useRecoilState(learningData);

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Image
          resizeMode="contain"
          source={require("../assets/Cosmopolitan_Front.png")}
          style={{ width: 130, height: 76 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text2}>Cosmopolitan</Text>
          {learning && (
            <TouchableOpacity
              style={styles.btnCircle}
              onPress={() => {
                AsyncStorage.setItem("cosmopolitan", JSON.stringify(!learning));
                setLearning(!learning);

                console.log(learning);
              }}
            >
              <AntDesign name="plus" size={18} color="white" />
            </TouchableOpacity>
          )}
          {!learning && (
            <TouchableOpacity
              style={[styles.btnCircle, { backgroundColor: "#AB1D38" }]}
              onPress={() => {
                AsyncStorage.setItem("cosmopolitan", JSON.stringify(!learning));
                setLearning(!learning);

                console.log(learning);
              }}
            >
              <AntDesign name="minus" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.labelsCont}
        >
          <View style={styles.labels}>
            <Text style={styles.text3}>Vodka</Text>
          </View>
          <View style={styles.labels}>
            <Text style={styles.text3}>Triple Sec</Text>
          </View>
          <View style={[styles.labels, { backgroundColor: "#3DBEBC" }]}>
            <Text style={styles.text3}>4 ingredients</Text>
          </View>
          <View style={styles.labels}>
            <Text style={styles.text3}>Vodka</Text>
          </View>
        </ScrollView>
      </View>
      {/* Modal */}
      <Modal animationType="slide" isVisible={showModal}>
        <View style={{ flex: 1, paddingTop: "5%" }}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{ display: "flex", alignSelf: "flex-end", padding: 10 }}
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            source={require("../assets/Cosmopolitan_Front.png")}
            style={{ width: "100%", height: "35%" }}
          />
          <Image
            resizeMode="contain"
            source={require("../assets/Cosmopolitan_Back.png")}
            style={{ width: "100%", height: "35%", marginTop: 15 }}
          />
        </View>
      </Modal>
      {/* end Moda; */}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    margin: 13,
    borderBottomColor: "#0000001F",
    borderTopColor: "#0000001F",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    height: 100,
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
  },
  text2: {
    color: "#000000DE",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 15,
  },
  text3: {
    color: "#000000DE",
    fontFamily: "Truculenta-SemiBold",
    fontSize: 11,
  },
  btnCircle: {
    backgroundColor: COLORS.primary,
    height: 30,
    width: 30,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  labels: {
    backgroundColor: "#FDBC47",
    padding: 2,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 2,
    height: 20,
    alignSelf: "flex-end",
  },
  labelsCont: {
    display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "flex-end",
    flex: 1,
  },
});
