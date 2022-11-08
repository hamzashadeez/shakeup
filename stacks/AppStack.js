import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountDeleted,
  Profile,
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
  ChangeName,
} from "../screens/profile";
import TabStack from "./TabStack";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={TabStack} />
      <Stack.Screen name="change_email" component={ChangeEmail} />
      <Stack.Screen name="change_name" component={ChangeName} />
      <Stack.Screen name="change_password" component={ChangePassword} />
      <Stack.Screen name="change_username" component={ChangeUsername} />
      <Stack.Screen name="accountdeleted" component={AccountDeleted} />
    </Stack.Navigator>
  );
}

export default AppStack;
