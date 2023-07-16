import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LatestEpisode from "../Components/LatestEpisode";
import TopAiring from "../Components/TopAiring";
import { useDispatch } from "react-redux";
import { resetSearchData } from "../Slices/animeSlice";
import RecentFive from "../Components/RecentFive";

export default function HomeScreen() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetSearchData());
  }, []);

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
          <Text style={styles.titles}>Recent Watch</Text>
        </View>
        <RecentFive />
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
