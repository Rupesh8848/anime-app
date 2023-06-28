import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import NewEpisodeTag from "./NewEpisodeTag";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchAnimeInfo } from "../Slices/animeSlice";

export default function LatestEpisodeCard({
  id,
  episodeId,
  episodeNumber,
  title,
  image,
  url,
}) {
  //   console.log(image);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const pressHandler = () => {
    dispatch(fetchAnimeInfo({ episodeId, episodeNumber, id }));
    navigation.navigate("Details");
  };
  return (
    <View style={styles.outerView}>
      <Pressable
        android_ripple={{ foreground: true, color: "rgba(0,0,0,0.1)" }}
        onPress={pressHandler}
      >
        <LinearGradient
          colors={["rgb(254, 195, 135)", "#FEA44A"]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <View style={styles.titleContainer}>
            <NewEpisodeTag />
            {/* series name */}
            <Text style={styles.animeName}>{title?.slice(0, 18)}</Text>
            {/* season and episode number */}
            <Text style={{ color: "#AE9075" }}>E{episodeNumber}</Text>
          </View>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  outerView: {
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 15,
    elevation: 5,
    marginVertical: 10,
  },
  animeName: {
    fontWeight: "900",
  },
  titleContainer: {
    justifyContent: "center",
    gap: 5,
  },
});
