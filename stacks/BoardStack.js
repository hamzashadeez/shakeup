import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Register,
  ForgotPassword,
  ForgotUsername,
  Username,
  Email,
  CreatePassword,
  Terms,
  Login,
} from "../screens/onboard_screens";

const Stack = createStackNavigator();

function BoardStack() {
  return (
    <Stack.Navigator
      initialRouteName="signup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signup" component={Register} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="username" component={Username} />
      <Stack.Screen name="email" component={Email} />
      <Stack.Screen name="createpassword" component={CreatePassword} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      <Stack.Screen name="forgotusername" component={ForgotUsername} />
      <Stack.Screen name="terms" component={Terms} />
    </Stack.Navigator>
  );
}

export default BoardStack;
