import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { COLORS } from "../../Theme";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import userData from "../../recoil/userData";
import { useRecoilState, useRecoilValue } from "recoil";
import { Auth } from "aws-amplify";

const Profile = ({ navigation }) => {
  const [_, setUser] = useRecoilState(userData);
  // logout function
  async function signOut() {
    try {
      await Auth.signOut().then(() => setUser(null));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
      navigation.navigate("accountdeleted", { data: _ });
    } catch (error) {
      console.log("Error deleting user", error);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const deleteAccount = () => {
    setShowModal(!showModal);
  };
  return (
    <CustomScreen>
      <CustomHeader name={"Profile"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}
      >
        <Text style={styles.label}>Name</Text>
        <TouchableOpacity
          style={{ zIndex: 15 }}
          onPress={() => navigation.navigate("change_name", { data: _ })}
        >
          <View style={styles.relative}>
            <TextInput editable={false} value={_?.name} style={styles.input} />
            <Entypo
              style={styles.chevron}
              name="chevron-thin-right"
              size={24}
              color="#111"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.flex}>
          <Text style={styles.label}>Username</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("change_username", { data: _ })}
          >
            <Text style={styles.label2}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ zIndex: 15, position: "relative" }}
          onPress={() => navigation.navigate("change_username", { data: _ })}
        >
          <Entypo
            style={styles.chevron}
            name="chevron-thin-right"
            size={24}
            color="#111"
          />
          <TextInput
            editable={false}
            value={_?.username}
            style={styles.input}
          />
        </TouchableOpacity>
        {/* Email */}
        <View style={styles.flex}>
          <Text style={styles.label}>Email Address</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("change_email", { data: _ })}
          >
            <Text style={styles.label2}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ zIndex: 15, position: "relative" }}
          onPress={() => navigation.navigate("change_email", { data: _ })}
        >
          <Entypo
            style={styles.chevron}
            name="chevron-thin-right"
            size={24}
            color="#111"
          />
          <TextInput editable={false} value={_?.email} style={styles.input} />
        </TouchableOpacity>

        {/* change password */}
        <TouchableOpacity
          style={styles.changeBtn}
          onPress={() => navigation.navigate("change_password", { data: _ })}
        >
          <Image
            source={require("../../assets/password_change.png")}
            resizeMode="contain"
            style={{ width: 24, height: 27, margin: 0, marginRight: 0 }}
          />
          <Text style={[styles.label, { paddingHorizontal: 7 }]}>
            Change Password
          </Text>
        </TouchableOpacity>

        {/* bottom controls */}
        {/* end */}
      </ScrollView>
      <View
        style={{
          flex: 0.2,
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: 25,
        }}
      >
        <TouchableOpacity style={styles.btn} onPress={() => deleteAccount()}>
          <Image
            source={require("../../assets/delete.png")}
            resizeMode="contain"
            style={{ width: 24, height: 27, margin: 0, marginHorizontal: 5 }}
          />
          <Text style={styles.label}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Image
            source={require("../../assets/logout.png")}
            resizeMode="contain"
            style={{ width: 24, height: 27, margin: 0, marginHorizontal: 5 }}
          />
          <Text style={styles.label}>Log Out</Text>
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        isVisible={showModal}
        // onRequestClose={() => setShowModal(false)}
      >
        <View style={{ backgroundColor: "rgba(0,0,0,.1)", flex: 1 }}>
          <View style={styles.modalView}>
            <Text style={styles.boldText}>Deleting Account?</Text>
            <Text style={[styles.label, { color: "#000000DE" }]}>
              Deleting your account cannot be undone, Are you sure?
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{ paddingLeft: 7, paddingVertical: 5 }}
              >
                <Text style={styles.label}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingLeft: 7, paddingVertical: 5 }}
                onPress={() => {
                  setShowModal(false);
                  deleteUser();
                }}
              >
                <Text style={styles.label}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* End Modal */}
    </CustomScreen>
  );
};

export default Profile;

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
  boldText: {
    fontFamily: "Truculenta-Bold",
    fontSize: 20,
    color: "#000000DE",
    marginBottom: 15,
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
    color: "#000000DE",
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
  btn: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "82%",
    marginLeft: "9%",
    marginTop: "20%",
    padding: 24,
    elevation: 1,
    borderRadius: 3,
  },
});
