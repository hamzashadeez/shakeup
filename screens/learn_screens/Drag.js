import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomScreen from "../../components/CustomScreen";
import { order, quizData } from "../../quiz";
import { useRecoilState } from "recoil";
import selectedCard from "../../recoil/selectedCard";
import questionIndex from "../../recoil/questionIndex";
import score from "../../recoil/score";
import madeDecision from "../../recoil/madeDecision";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import List from "../../components/List";
// import DraggableFlatList from "react-native-draggable-flatlist";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

const Drag = ({ navigation }) => {
  const [select, setSelect] = useRecoilState(selectedCard);
  const [qIndex, setQIndex] = useRecoilState(questionIndex);
  const [qScore, setScore] = useRecoilState(score);
  const [decision, setDecision] = useRecoilState(madeDecision);
  const [correctUI, setCorrectUI] = useState(null);
  const [showDefaultBtn, setShowDefaultBtn] = useState(true);
  const [data, setData] = useState([]);
  const [dragged, setDragged] = useState(false);

  useEffect(() => {
    setData(d);
  }, []);

  const checkAnswer = () => {
    setShowDefaultBtn(false);
    if (JSON.stringify(data) === JSON.stringify(order)) {
      setCorrectUI(true);
      setScore(qScore + 1);
    } else {
      setCorrectUI(false);
    }
  };

  const d = [
    {
      id: 1,
      name: "Chill glass",
    },
    {
      id: 2,
      name: "Garnish",
    },
    {
      id: 3,
      name: "Fill shaker with ingredients and ice",
    },
    {
      id: 4,
      name: "Shake",
    },
    {
      id: 5,
      name: "Strain",
    },
  ];

  const renderItem = ({ item, drag, isActive }) => (
    <List drag={drag} isActive={isActive} data={item} />
  );

  const saveRecord = () => {
    // save record
  };

  const continueMoving = () => {
    saveRecord();
    setDragged(false);
    setCorrectUI(null);
    setShowDefaultBtn(true);
    navigation.navigate("result");
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
          onPress={() => navigation.goBack("opencard")}
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
      <Text
        style={[
          styles.questionText,
          {
            fontSize: 22,
            marginHorizontal: 15,
            marginVertical: 20,
          },
        ]}
      >
        Drag into the correct order
      </Text>
      <Text
        style={[
          styles.questionText,
          {
            fontSize: 22,
            marginHorizontal: 15,
            marginBottom: 20,
            color: "#146AE2",
          },
        ]}
      >
        Hint
      </Text>
      <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
        {/* <GestureHandlerRootView>
          <DraggableFlatList
            data={data}
            animationConfig={{ mass: 0.5 }}
            style={{ height: "100%" }}
            onDragEnd={({ data, from, to }) => {
              setData(data);
              setDragged(true);
            }}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </GestureHandlerRootView> */}
      </View>
      {/* Error Message */}
      {correctUI === false && (
        <View
          style={{
            backgroundColor: "#BF45003D",
            flex: 1,
            height: 120,
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

          <TouchableOpacity
            onPress={() => continueMoving()}
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
      {/* end error msessage */}

      {/* Success Message */}
      {correctUI === true && (
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
            onPress={() => continueMoving()}
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
      {/* end success */}
      {showDefaultBtn && (
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
            disabled={dragged === false ? true : false}
            style={{
              backgroundColor: dragged === false ? "#0000001F" : "#E28B14",
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
                color: dragged === false ? "#1A1A1A99" : "#fff",
              }}
            >
              Check
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* default btn */}
    </CustomScreen>
  );
};

export default Drag;

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
    // flex: 1.5,
    width: "12%",
    display: "flex",
    borderRadius: 4,
    // elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

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
