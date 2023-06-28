import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { updateEpisodeNumber } from "../Slices/animeSlice";

export default function EpisodesView({ episodes, episodeNumber }) {
  //   console.log(episodes);

  const dispatch = useDispatch();

  function pressHandler({ id, number }) {
    dispatch(updateEpisodeNumber({ id, number }));
  }

  return (
    <View style={styles.episodeContainer}>
      <Text style={[styles.textBold]}>Episodes: </Text>
      {episodes?.map((episode) => {
        // console.log("Episode Number: ", episode.number, episodeNumber);
        return (
          <Pressable
            key={episode?.id}
            onPress={() =>
              pressHandler({ id: episode.id, number: episode.number })
            }
          >
            <View
              style={[
                styles.episodeView,
                episodeNumber === episode.number
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#dbd9d8" },
              ]}
            >
              <Text style={[styles.textBold]}>{episode?.number}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    columnGap: 12,
    rowGap: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  episodeView: {
    backgroundColor: "#dbd9d8",
    padding: 10,
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
});
