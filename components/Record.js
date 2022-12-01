import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";

const Record = ({ data }) => {
  return (
    <View style={styles.record}>
      <Text style={[styles.label, { fontSize: 15 }]}>{data.dateFinished} </Text>
      {/* <Text style={styles.label}>just now!</Text> */}
      <TimeAgo style={styles.label} time={data.timestamp} />
      <View
        style={{
          position: "relative",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            styles.label,
            { fontSize: 18, position: "absolute", top: 28, left: 58 },
          ]}
        >
          {data.score}/11
        </Text>
        <AntDesign name="staro" size={80} color="#FAD400" />
      </View>
    </View>
  );
};

export default Record;

const styles = StyleSheet.create({
  record: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    width: 150,
    height: 150,
    marginTop: 3,
    marginLeft: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  label: {
    fontFamily: "Truculenta-Regular",
    fontSize: 12,
    color: "#000000DE",
    textAlign: "center",
  },
});
