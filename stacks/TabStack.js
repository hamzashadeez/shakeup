import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "../screens/Discover";
import Learn from "../screens/Learn";
import ProfileStack from "./ProfileStack";
import { COLORS } from "../Theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green2,
        tabBarInactiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontFamily: "Truculenta-Regular",
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          paddingTop: 5,
          height: 55,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="discover"
        component={Discover}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                resizeMode="contain"
                source={require("../assets/discover_enabled.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require("../assets/discover.png")}
                style={styles.deActiveImg}
              />
            ),
        }}
      />
      <Tab.Screen
        name="learn"
        component={Learn}
        options={{
          tabBarLabel: "Learn",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                resizeMode="contain"
                source={require("../assets/Learn_enabled.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require("../assets/learn.png")}
                style={styles.deActiveImg}
              />
            ),
        }}
      />

      <Tab.Screen
        name="profileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                resizeMode="contain"
                source={require("../assets/profile_enabled.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require("../assets/profile.png")}
                style={styles.deActiveImg}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  activeImg: {
    width: 31,
    marginBottom: 2,
    marginTop: 5,
    // height: 27,
  },
  deActiveImg: {
    width: 31,
    marginBottom: 2,
    marginTop: 5,
    // height: 27,
  },
});
