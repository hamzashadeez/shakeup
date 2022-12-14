import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import userData from "../../recoil/userData";
import { Auth } from "aws-amplify";
import HomeHeader from "../../components/HomeHeader";
import GeneralScreen from "../../components/GeneralScreen";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../Theme";
import learningData from "../../recoil/learningData";
import Card from "../../assets/card.svg";
import StartingIcon from "../../assets/not_started.svg";
import ProgressIcon from "../../assets/in_progress.svg";
import Completed from "../../assets/completed.svg";
import progress from "../../recoil/progress";

const Learn = ({ navigation }) => {
  const [_, setUser] = useRecoilState(userData);
  const [learning, setLearning] = useRecoilState(learningData);
  const [progressData, setProgressData] = useRecoilState(progress);

  console.log(progressData);
  return (
    <>
      <GeneralScreen>
        {/* content goes here */}
        <HomeHeader />
        <View style={{ height: 10 }} />
        {learning === true && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("learn_stack", { screen: "opencard" })
            }
            style={{
              display: "flex",
              backgroundColor: "#0000000F",
              marginHorizontal: 13,
              flexDirection: "row",
              alignItems: "center",
              padding: 13,
              height: 70,
            }}
          >
            <Text style={{ marginRight: 20 }}>
              <Card />
              {/* <AntDesign name="creditcard" size={20} color="black" /> */}
            </Text>
            <Text style={styles.text2}>Cosmopolitan</Text>
            {progressData === 0 && <StartingIcon />}
            {progressData > 0 && progressData < 11 && <ProgressIcon />}
            {progressData === 11 && <Completed />}
          </TouchableOpacity>
        )}
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
