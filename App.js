import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import FavouriteScreen from "./Screens/FavouriteScreen";
// import ProfileScreen from "./Screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Provider } from "react-redux";
import Store from "./Store/store";
import Details from "./Screens/Details";
import SearchScreen from "./Screens/SearchScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#7D7D7D",
        headerShown: false,
      }}
      style={styles.tabBarContainer}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="ios-home" size={24} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search" size={24} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Your Favourites"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="favorite" size={24} color={color} />;
          },
        }}
      />
      {/* <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Fontisto name="person" size={24} color={color} />;
          },
        }}
      /> */}
    </BottomTab.Navigator>
  );
};

export default function App() {
  const animation = ["slide_from_right", "slide_from_left"];
  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {},
});
