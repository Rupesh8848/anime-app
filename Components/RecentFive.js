import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import TopAiringCard from "./TopAiringCard";

export default function RecentFive() {
  const { recentFive } = useSelector((state) => state.animeReducer);
  console.log("Recent five: ", recentFive);
  return (
    <>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        extraData={recentFive}
        data={recentFive}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <TopAiringCard {...item} />;
        }}
      />
    </>
  );
}
