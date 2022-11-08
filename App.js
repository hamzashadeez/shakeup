import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import AppStack from "./stacks/AppStack";
Amplify.configure(awsconfig);

function App() {
  const [fontsLoaded] = useFonts({
    "Truculenta-Black": require("./assets/Truculenta/Truculenta-Black.ttf"),
    "Truculenta-Regular": require("./assets/Truculenta/Truculenta-Regular.ttf"),
    "Truculenta-SemiBold": require("./assets/Truculenta/Truculenta-SemiBold.ttf"),
    "Truculenta-Bold": require("./assets/Truculenta/Truculenta-Bold.ttf"),
  });
  //some few changes

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
          <StatusBar style="auto" />
          <AppStack />
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
