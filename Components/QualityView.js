import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function QualityView({
  qualities,
  setCurrentData,
  selectedQuality,
}) {
  const pressHandler = (quality) => {
    setCurrentData((oldData) => ({
      ...oldData,
      selectedQuality: quality,
    }));
  };

  return (
    <View style={styles.qualityContainer}>
      {qualities?.map((quality) => (
        <Pressable
          key={quality.quality}
          onPress={() => pressHandler(quality)}
          style={[
            styles.qualityView,
            selectedQuality?.quality === quality?.quality
              ? { backgroundColor: "rgba(0,0,0,0.1)" }
              : "",
          ]}
        >
          <View>
            <Text>{quality.quality}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  qualityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    marginLeft: 20,
    marginRight: 20,
    rowGap: 10,
  },
  qualityView: {
    height: 45,
    width: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
