import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import MainStack from "./stacks/MainStack";
import { Drag } from "./screens/learn_screens";
import { COLORS } from "./Theme";
Amplify.configure({
  ...awsconfig,
  Analytics: { disabled: true },
});

function App() {
  const [fontsLoaded] = useFonts({
    "Truculenta-Black": require("./assets/Truculenta/Truculenta-Black.ttf"),
    "Truculenta-Regular": require("./assets/Truculenta/Truculenta-Regular.ttf"),
    "Truculenta-SemiBold": require("./assets/Truculenta/Truculenta-SemiBold.ttf"),
    "Truculenta-Bold": require("./assets/Truculenta/Truculenta-Bold.ttf"),
  });

  // Amplify.configure({
  //   Auth: {
  //     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  //     identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
  //     // REQUIRED - Amazon Cognito Region
  //     region: "us-east-1",
  //     // OPTIONAL - Amazon Cognito User Pool ID
  //     userPoolId: "us-east-1_J30ieIzQ8",
  //     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  //     userPoolWebClientId: "5m5q5obip2sm7u63mlp10lp1u7",
  //   },
  // });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" backgroundColor={COLORS.primary} />
          <MainStack />
          {/* <Drag /> */}
        </SafeAreaView>
      </NavigationContainer>
    </RecoilRoot>
  );
}

// export default withAuthenticator(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
