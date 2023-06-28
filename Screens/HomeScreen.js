import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LatestEpisode from "../Components/LatestEpisode";
import TopAiring from "../Components/TopAiring";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ rowGap: 10 }}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titles}>It's Fun Time!</Text>
          <LatestEpisode />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titles}>Top Airing Anime</Text>
          <TopAiring />
        </View>
        <View>
          <Text style={styles.titles}>Favourites</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titles: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 21,
    marginLeft: 15,
  },
});
