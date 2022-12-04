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
import { withAuthenticator } from "aws-amplify-react-native";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import MainStack from "./stacks/MainStack";
import { Drag } from "./screens/learn_screens";
import { COLORS } from "./Theme";
import { Register } from "./screens/onboard_screens";

const  awsconfig = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "us-east-1:7740bd62-8dcb-4493-86ae-727dd94bdde6",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_dDLN3UZab",
  "aws_user_pools_web_client_id": "92arebnhat1gikhg7pri66ekf",
  "oauth": {},
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL",
      "FAMILY_NAME",
      "MIDDLE_NAME",
      "NAME"
  ],
  "aws_cognito_mfa_configuration": "OPTIONAL",
  "aws_cognito_mfa_types": [
      "TOTP"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": "6",
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_appsync_graphqlEndpoint": "https://m6hfistwfzaebgp3pbymcast4i.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-eyredmqj3jfxpa332pujwsqsca"
};

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
