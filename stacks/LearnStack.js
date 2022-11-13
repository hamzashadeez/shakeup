import { createStackNavigator } from "@react-navigation/stack";
import { Learn, OpenCard } from "../screens/learn_screens";
const Stack = createStackNavigator();

function LearnStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="learn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="learn" component={Learn} />
      <Stack.Screen name="opencard" component={OpenCard} />
    </Stack.Navigator>
  );
}

export default LearnStack;
