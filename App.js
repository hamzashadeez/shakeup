import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BoardStack from "./stacks/BoardStack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileStack from "./stacks/ProfileStack";
// import Tab from "./stacks/Tab";
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig);

export default function App() {
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
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {/* <BoardStack /> */}
        <ProfileStack />
        {/* <Tab /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});