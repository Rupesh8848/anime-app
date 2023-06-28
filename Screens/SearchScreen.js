import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchAnime } from "../Slices/animeSlice";
import TopAiringCard from "../Components/TopAiringCard";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";

export default function SearchScreen() {
  const [searchKey, setSearchKey] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(1);
  console.log(searchKey);

  const dispatch = useDispatch();

  const { hasNextPage, results } = useSelector(
    (state) => state?.animeReducer?.searchData?.data
  );

  //   console.log(results);

  const searchHandler = () => {
    setPageNumber(1);
    dispatch(fetchSearchAnime({ query: searchKey, pageNum: pageNumber }));
  };

  const nextClickHanlder = () => {
    dispatch(fetchSearchAnime({ query: searchKey, pageNum: pageNumber + 1 }));
    setPageNumber(pageNumber + 1);
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["rgb(254, 195, 135)", "#FEA44A"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.outerInputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                value={searchKey}
                style={styles.textInput}
                onChangeText={(text) => setSearchKey(text)}
                placeholder="Search..."
              />
              <Pressable
                android_ripple={{
                  foreground: true,
                  color: "rgba(0,0,0,0.8)",
                }}
                onPress={() => {
                  searchHandler();
                }}
                style={styles.searchButtonContainer}
              >
                <Ionicons name="search" size={24} color="black" />
              </Pressable>
            </View>
          </View>

          <ScrollView>
            <View style={styles.searchResult}>
              {/* {results?.map((result) => (
                <TopAiringCard
                  id={result.id}
                  image={result.image}
                  title={result.title}
                  key={result.id}
                  genres={[result.releaseDate, result.subOrDub]}
                />
              ))} */}

              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TopAiringCard
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    key={item.id}
                    genres={[item.releaseDate, item.subOrDub]}
                  />
                )}
              />

              <View style={styles.buttonsContainer}>
                {pageNumber > 1 && (
                  <Pressable
                    onPress={nextClickHanlder}
                    style={styles.nextButton}
                    android_ripple={{
                      foreground: true,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <Text>{"<< Prev"}</Text>
                  </Pressable>
                )}

                {hasNextPage && (
                  <Pressable
                    onPress={nextClickHanlder}
                    style={styles.nextButton}
                    android_ripple={{
                      foreground: true,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <Text>{"Next >>"}</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerInputContainer: {
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 20,
    fontSize: 20,
    height: 40,
    paddingLeft: 15,
    paddingRight: 52,
  },
  inputContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
  },
  searchButtonContainer: {
    position: "absolute",
    right: 1,
    backgroundColor: "	rgb(211,211,211)",
    height: 38,
    justifyContent: "center",
    width: 50,
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainContainer: {},
  searchResult: { height: "100%", alignItems: "center" },
  gradient: { height: Dimensions.get("window").height },
  nextButton: {
    backgroundColor: "#FFF0e3",
    height: 40,
    justifyContent: "center",
    width: 80,
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  prevButton: {
    backgroundColor: "#FFF0e3",
    height: 40,
    justifyContent: "center",
    width: 80,
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 150,
  },
});
