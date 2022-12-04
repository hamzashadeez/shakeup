import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountDeleted,
  Profile,
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
  ChangeName,
  ForgotPassword2,
} from "../screens/profile";

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="change_email" component={ChangeEmail} />
      <Stack.Screen name="change_name" component={ChangeName} />
      <Stack.Screen name="change_password" component={ChangePassword} />
      <Stack.Screen name="change_username" component={ChangeUsername} />
      <Stack.Screen name="accountdeleted" component={AccountDeleted} />
      <Stack.Screen name="forgot_password2" component={ForgotPassword2} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
