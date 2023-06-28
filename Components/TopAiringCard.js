import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchAnimeInfo } from "../Slices/animeSlice";
import { useNavigation } from "@react-navigation/native";

export default function TopAiringCard({ id, title, image, url, genres }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePress = () => {
    dispatch(fetchAnimeInfo({ id }));
    navigation.navigate("Details");
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.main}>
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
      </View>
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
});
