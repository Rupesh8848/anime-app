import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import QualityView from "../Components/QualityView";
import EpisodeView from "../Components/EpisodeView";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default function Details() {
  const dispatch = useDispatch();

  const [currentData, setCurrentData] = React.useState({
    server: "gogocdn",
    selectedQuality: undefined,
    qualities: undefined,
    selectedEpisodeId: undefined,
    selectedEpisodeNumber: undefined,
  });

  const video = React.useRef(null);

  const { animeInfo } = useSelector((state) => state.animeReducer);

  // console.log(animeInfo?.data);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["rgb(254, 195, 135)", "#FEA44A"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradient}
      >
        <View style={styles.videoContainer}>
          {!currentData.selectedQuality ? (
            <View style={styles.videoOverlay}>
              <Text style={{ fontWeight: "bold", width: "50%" }}>
                Please select an episode first and then the video quality
              </Text>
            </View>
          ) : (
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: currentData?.selectedQuality?.url,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              // onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          )}
        </View>

        <View>
          <Text style={[styles.boldText]}>Episodes: </Text>
          <EpisodeView
            episodes={animeInfo?.data?.episodes}
            setCurrentData={setCurrentData}
            server={currentData.server}
            selectedEpisodeNumber={currentData.selectedEpisodeNumber}
          />
        </View>
        <Text style={styles.boldText}>Quality:</Text>
        {!!currentData.qualities ? (
          <QualityView
            qualities={currentData?.qualities}
            setCurrentData={setCurrentData}
            selectedQuality={currentData?.selectedQuality}
          />
        ) : (
          <Text>Please select an episode</Text>
        )}

        <Text style={[styles.boldText]}>Description</Text>
        <ScrollView style={{ height: 100 }}>
          <Text style={styles.descriptionText}>
            {animeInfo?.data?.description}
          </Text>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height: 200,
    width: Dimensions.get("screen").width,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: "hidden",
  },
  video: {
    height: 200,
    width: "100%",
  },
  gradient: {
    height: Dimensions.get("screen").height,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionText: {
    fontSize: 18,
  },
  videoOverlay: {
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
