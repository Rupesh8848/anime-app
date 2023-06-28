import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToRecentFive,
  fetchAnimeInfo,
  toggleFavourite,
} from "../Slices/animeSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function TopAiringCard({ id, title, image, url, genres }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { favourites } = useSelector((state) => state.animeReducer);

  const index = favourites?.findIndex((fav) => fav.id === id);

  const handlePress = () => {
    dispatch(fetchAnimeInfo({ id }));
    dispatch(addToRecentFive({ id, title, image, genres }));
    navigation.navigate("Details");
  };

  const toggleFav = () => {
    dispatch(toggleFavourite({ id, title, image, genres }));
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: "rgba(0,0,0,0.3)", foreground: true }}
      style={styles.main}
    >
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.hoverCard}>
        <View
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <View style={styles.titleView}>
            <Text style={styles.title}>{title.slice(0, 40)}</Text>
          </View>
          <View style={styles.genreView}>
            {genres.slice(0, 6)?.map((genre) => (
              <Text key={genre} style={styles.gridText}>
                {genre}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Pressable style={styles.favIcon} onPress={toggleFav}>
        <Ionicons
          name={index !== -1 ? "heart" : "heart-outline"}
          size={30}
          color={"red"}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 300,
    width: 250,
    overflow: "hidden",
    borderRadius: 15,
    marginLeft: 20,
    elevation: 5,
    marginVertical: 15,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  hoverCard: {
    position: "absolute",
    bottom: 10,
    left: "5%",
    height: 100,
    backgroundColor: "#FFF0e3",
    width: "90%",
    borderRadius: 15,
    elevation: 5,
  },
  titleView: {
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  genreView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    justifyContent: "center",
    columnGap: 10,
  },
  gridText: {
    color: "#AE9075",
  },
  favIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
  },
});
