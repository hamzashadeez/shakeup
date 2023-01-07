import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Vodka from "../../assets/svg/Vodka.svg";
import Card from "../../components/Card";
import { Col, Row, Grid } from "react-native-easy-grid";
import { quizData } from "../../quiz";
import { useRecoilState } from "recoil";
import selectedCard from "../../recoil/selectedCard";
import questionIndex from "../../recoil/questionIndex";
import score from "../../recoil/score";
import madeDecision from "../../recoil/madeDecision";
import progress from "../../recoil/progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");
const Play = ({ navigation }) => {
  const [select, setSelect] = useRecoilState(selectedCard);
  const [qIndex, setQIndex] = useRecoilState(questionIndex);
  const [qScore, setScore] = useRecoilState(score);
  const [decision, setDecision] = useRecoilState(madeDecision);
  const [choosedAnswer, setChoosedAnswer] = useState(null);
  const [progressData, setProgressData] = useRecoilState(progress);

  const onSelect = (id) => {
    setSelect(id);
  };

  const continueToNextPhase = () => {
    setSelect(0);
    setChoosedAnswer(null);
    setDecision(false);

    if (quizData.length > qIndex + 1) {
      setQIndex(qIndex + 1);
      setProgressData(progressData + 1);
      console.log("progressData ", progressData);
      AsyncStorage.setItem("progress", JSON.stringify(progressData));
    } else {
      navigation.navigate("dog");
      // alert("You reached to the end");
    }
  };

  const checkAnswer = () => {
    setDecision(true);
    if (select === quizData[qIndex].rightAnswer.id) {
      setChoosedAnswer("correct");
      setScore(qScore + 1);
    } else {
      setChoosedAnswer("wrong");
    }
  };
  return (
    <CustomScreen>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            padding: 7,
            paddingLeft: 0,
            paddingRight: 30,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={20} color="#000000DE" />
        </TouchableOpacity>
        <View style={styles.score}>
          <MaterialCommunityIcons
            name="star-outline"
            size={16}
            color="#000000DE"
          />
          <Text style={styles.textScore}>
            {qScore} of {quizData.length + 1}
          </Text>
        </View>
      </View>
      {/* end header */}
      <ScrollView
        style={{ flex: 1, position: "relative", backgroundColor: "white" }}
      >
        {/* questions */}
        <View style={styles.questionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.questionText}>{quizData[qIndex].label}</Text>
            {false && <Text style={styles.hint}>Hint</Text>}
          </View>
          {/* bottles container */}
          {quizData[qIndex].bottle.length > 0 && (
            <ScrollView horizontal style={styles.bottleContainer}>
              {quizData[qIndex].bottle.map((bottle, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginVertical: 10,
                    marginHorizontal: 2,
                    paddingHorizontal: 5,
                  }}
                >
                  {bottle}
                </View>
              ))}
            </ScrollView>
          )}
          {/* end bottles */}
        </View>
        {/* end questions */}

        <Grid style={{ width: "80%", marginLeft: "10%", marginTop: 20 }}>
          <Col>
            <Row style={{ margin: 5 }}>
              <Card onSelect={onSelect} data={quizData[qIndex].option1} />
            </Row>
            <Row style={{ margin: 5 }}>
              <Card onSelect={onSelect} data={quizData[qIndex].option3} />
            </Row>
          </Col>
          <Col>
            <Row style={{ margin: 5 }}>
              <Card onSelect={onSelect} data={quizData[qIndex].option2} />
            </Row>
            <Row style={{ margin: 5 }}>
              <Card onSelect={onSelect} data={quizData[qIndex].option4} />
            </Row>
          </Col>
        </Grid>
      </ScrollView>
      {/* Button Container */}
      {choosedAnswer === null && (
        <View
          style={{
            //   backgroundColor: "#6EB5283D",
            flex: 1,
            height: 110,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            flexDirection: "row",
            paddingBottom: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => checkAnswer()}
            disabled={select === 0 ? true : false}
            style={{
              backgroundColor: select === 0 ? "#0000001F" : "#E28B14",
              width: "80%",
              alignSelf: "flex-end",
              marginLeft: "10%",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Truculenta-Regular",
                color: select === 0 ? "#1A1A1A99" : "#fff",
              }}
            >
              Check
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* sucess btn */}
      {choosedAnswer === "correct" && (
        <View
          style={{
            backgroundColor: "#6EB5283D",
            flex: 1,
            height: 110,
            position: "absolute",
            bottom: 0,
            left: 0,
            display: "flex",
            width: "100%",
            flexDirection: "column",
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginLeft: "10%",
              marginTop: 10,
              color: "#6EB528AD",
              fontFamily: "Truculenta-Regular",
            }}
          >
            Correct
          </Text>
          <TouchableOpacity
            onPress={() => continueToNextPhase()}
            style={{
              backgroundColor: "#6EB528AD",
              width: "80%",
              marginLeft: "10%",
              padding: 10,
              borderRadius: 5,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Truculenta-Regular",
                color: "white",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* end success btn */}

      {/* error */}
      {choosedAnswer === "wrong" && (
        <View
          style={{
            backgroundColor: "#BF45003D",
            flex: 1,
            height: 135,
            position: "absolute",
            bottom: 0,
            left: 0,
            display: "flex",
            width: "100%",
            flexDirection: "column",
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginLeft: "10%",
              marginTop: 10,
              color: "#BF4500",
              fontFamily: "Truculenta-Regular",
            }}
          >
            Incorrect
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginLeft: "10%",
              marginTop: 10,
              color: "#BF4500",
              fontFamily: "Truculenta-Regular",
            }}
          >
            Answer is {quizData[qIndex].rightAnswer.label}
          </Text>
          <TouchableOpacity
            onPress={() => continueToNextPhase()}
            style={{
              backgroundColor: "#BF4500",
              width: "80%",
              marginLeft: "10%",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Truculenta-Regular",
                color: "white",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomScreen>
  );
};

export default Play;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  textScore: {
    color: "#000000DE",
    fontSize: 11,
    fontFamily: "Truculenta-Regular",
    marginLeft: 5,
  },
  score: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#00000029",
    paddingTop: 7,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingRight: 5,
  },
  questionContainer: {
    marginTop: 20,
    height: 100,
    flexDirection: "row",
  },
  questionText: {
    fontFamily: "Truculenta-Regular",
    fontSize: 20,
    maxWidth: 250,
    marginBottom: 7,
  },

  hint: {
    color: "#146AE2",
    fontFamily: "Truculenta-Regular",
    fontSize: 18,
  },
  bottleContainer: {
    backgroundColor: "white",
    width: "12%",
    display: "flex",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 14,
  },
  textContainer: {
    flex: 3,
    padding: 15,
    paddingTop: 0,
  },
  cards: {
    // display: "flex",
    flexWrap: "wrap",
    // padding: 10,
    // gap: 10,
  },
});
