import { View, Text } from "react-native";
import React from "react";

export default function NewEpisodeTag() {
  return (
    <View
      style={{
        backgroundColor: "#FFF0e3",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "#ffcc76", fontWeight: "bold" }}>New Episode!</Text>
    </View>
  );
}
