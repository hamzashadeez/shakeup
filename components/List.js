import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const List = ({ data, drag, isActive }) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        style={[
          styles.list,
          { backgroundColor: isActive ? "#0000001F" : "white" },
        ]}
      >
        <Text style={styles.text}>{data?.name}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

export default List;

const styles = StyleSheet.create({
  list: {
    height: 42,
    marginBottom: 15,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: "#000000DE",
  },
  text: {
    color: "#000000DE",
    fontFamily: "Truculenta-Regular",
    fontSize: 18,
  },
});
