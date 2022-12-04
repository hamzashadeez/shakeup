import { createStackNavigator } from "@react-navigation/stack";
import { OpenCard } from "../screens/learn_screens";
import {
  AccountDeleted,
  Profile,
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
  ChangeName,
  ForgotPassword2,
  NewPassword2,
} from "../screens/profile";
import LearnStack from "./LearnStack";
import TabStack from "./TabStack";
import { Play } from "../screens/play_screens";

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
      <Stack.Screen name="forgot_password2" component={ForgotPassword2} />
      <Stack.Screen name="newpassword" component={NewPassword2} />
      <Stack.Screen name="play" component={Play} />
    </Stack.Navigator>
  );
}

export default AppStack;
