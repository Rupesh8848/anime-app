import { Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopAiring } from "../Slices/animeSlice";
import { FlatList } from "react-native";
import TopAiringCard from "./TopAiringCard";

export default function LatestEpisode() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.animeReducer?.topAiring
  );
  // console.log(data);
  React.useEffect(() => {
    dispatch(fetchTopAiring());
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; ///spinner goes here
  }

  return (
    <FlatList
      horizontal={true}
      data={data?.results}
      keyExtractor={(anime) => {
        return anime.id;
      }}
      renderItem={({ index, item }) => {
        return <TopAiringCard {...item} />;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
