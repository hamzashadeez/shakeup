import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "../screens/Discover";
import Learn from "../screens/Learn";
import ProfileStack from './ProfileStack'
import { COLORS } from "../Theme";

const TabStack = createBottomTabNavigator();
const Tab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="learn" component={Learn} />
      <Tab.Screen name="discover" component={Discover} />
      <Tab.Screen name="profileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default TabStack;
