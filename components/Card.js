import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import selectedCard from "../recoil/selectedCard";
import madeDecision from "../recoil/madeDecision";

const { width } = Dimensions.get("screen");
const Card = ({ onSelect, data }) => {
  const [select] = useRecoilState(selectedCard);
  const [decision, setDecision] = useRecoilState(madeDecision);

  return (
    <Pressable
      disabled={decision === true ? true : false}
      onPress={() => {
        onSelect(data.id);
      }}
      style={[
        styles.card,
        {
          backgroundColor: select === data.id ? "#E28B1424" : "white",
          //   elevation: select === data.id ? 0 : 4,
        },
      ]}
    >
      {data.icon}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "white",
    // backgroundColor: "whitesmoke",
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 5,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
