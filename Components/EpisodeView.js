import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";

export default function EpisodeView({
  episodes,
  setCurrentData,
  server,
  selectedEpisodeNumber,
}) {
  //   console.log(episodes);
  const pressHandler = async (episode) => {
    try {
      const response = await axios.get(
        `https://api.consumet.org/anime/gogoanime/watch/${episode.id}?server=${server}`
      );
      // console.log(response.data);
      setCurrentData((oldData) => ({
        ...oldData,
        selectedEpisodeId: episode.id,
        selectedEpisodeNumber: episode.number,
        qualities: response?.data?.sources,
      }));
    } catch (error) {
      console.log("Error occured while fetching data");
    }
  };

  return (
    <View style={styles.episodesContainer}>
      <FlatList
        numColumns={5}
        style={styles.listContainer}
        data={episodes}
        keyExtractor={(episode) => episode.id}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => pressHandler(item)}
            style={[
              styles.episodeItem,
              selectedEpisodeNumber === item.number
                ? { backgroundColor: "rgba(0,0,0,0.1)" }
                : "",
            ]}
          >
            <Text style={styles.episodeText}>{item.number}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  episodesContainer: {
    height: 200,
    overflow: "scroll",
  },
  listContainer: {},
  episodeItem: {
    height: 45,
    width: 45,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    marginVertical: 10,
  },
  episodeText: {
    fontWeight: "bold",
  },
});
