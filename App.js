import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
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
import { Register } from "./screens/onboard_screens";
Amplify.configure({
  ...awsconfig,
  Analytics: { disabled: true },
});

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const MyStatusBar = ({ backgroundColor, ...props }) => {
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>;
};

function App() {
  const [fontsLoaded] = useFonts({
    "Truculenta-Black": require("./assets/Truculenta/Truculenta-Black.ttf"),
    "Truculenta-Regular": require("./assets/Truculenta/Truculenta-Regular.ttf"),
    "MyriadPro-Bold": require("./assets/Truculenta/Truculenta-Regular.ttf"),
    "Truculenta-SemiBold": require("./assets/Truculenta/Truculenta-SemiBold.ttf"),
    "Truculenta-Bold": require("./assets/Truculenta/Truculenta-Bold.ttf"),
  });

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
        <View style={styles.container}>
          {/* <View style={styles.appBar} /> */}
          {/* {Platform.OS === "ios" && ( */}
          {/* <View
            style={{
              height: StatusBar.currentHeight,
              backgroundColor: COLORS.green,
              width: "100%",
              zIndex: 100,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          /> */}
          <StatusBar style="auto" backgroundColor={COLORS.primary} />
          {/* )} */}
          {/* {Platform.OS === "android" && (
          )} */}
          <MainStack />
          {/* <Drag /> */}
        </View>
      </NavigationContainer>
    </RecoilRoot>
  );
}

// export default withAuthenticator(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // paddingTop: StatusBar.currentHeight,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: COLORS.primary,
    height: APPBAR_HEIGHT,
  },
});
