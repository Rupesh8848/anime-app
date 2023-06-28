import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import TopAiringCard from "../Components/TopAiringCard";

export default function FavouriteScreen({ navigation }) {
  const { favourites } = useSelector((state) => state.animeReducer);

  navigation.setOptions({ headerShown: true });

  if (favourites.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <FontAwesome
          name="exclamation-triangle"
          size={200}
          color="rgba(168,168,168,0.3)"
        />
        <Text style={styles.warningText}>
          Please favourite some shows to display.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favourites}
        keyExtractor={(show) => show.id}
        renderItem={({ item }) => <TopAiringCard {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  warningText: {
    fontSize: 30,
    color: "rgba(168,168,168,0.3)",
    textAlign: "center",
  },
});
