import { Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestEpisodes } from "../Slices/animeSlice";
import LatestEpisodeCard from "./LatestEpisodeCard";
import { FlatList } from "react-native";

export default function LatestEpisode() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.animeReducer?.latestEpisodes
  );
  // console.log(data);
  React.useEffect(() => {
    dispatch(fetchLatestEpisodes());
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; ///spinner goes here
  }

  return (
    // <ScrollView horizontal>
    //   {data?.results.map((result) => (
    //     <LatestEpisodeCard {...result} />
    //   ))}
    // </ScrollView>
    <FlatList
      horizontal={true}
      data={data?.results}
      keyExtractor={(anime) => anime.episodeId}
      renderItem={({ index, item }) => <LatestEpisodeCard {...item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
}
