import { createStackNavigator } from "@react-navigation/stack";
import { Dog, Drag, Learn, OpenCard } from "../screens/learn_screens";

const Stack = createStackNavigator();

function LearnStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="learn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="learn" component={Learn} />
      <Stack.Screen name="opencard" component={OpenCard} />
      <Stack.Screen name="dog" component={Dog} />
      <Stack.Screen name="drag" component={Drag} />
    </Stack.Navigator>
  );
}

export default LearnStack;
