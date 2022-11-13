import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "../screens/Discover";
import Learn from "../screens/Learn";
import ProfileStack from "./ProfileStack";
import { COLORS } from "../Theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import { Profile } from "../screens/profile";
import {
  ProfileEnabled,
  ProfileSvg,
  LearnEnabled,
  LearnSvg,
  DiscoverEnabled,
  DiscoverSvg,
} from "../assets";

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
              <DiscoverEnabled width={31} height={31} />
            ) : (
              <DiscoverSvg width={31} height={31} />
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
              <LearnEnabled width={31} height={31} />
            ) : (
              <LearnSvg width={31} height={31} />
            ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              // <Icon />
              <ProfileEnabled width={31} height={31} />
            ) : (
              <ProfileSvg width={31} height={31} />
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
