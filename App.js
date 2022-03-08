import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { Suspense } from "react";
import AppContent from "./AppContent";
import "./utils/language/i18n";
// import * as Sentry from "sentry-expo";

// Sentry.init({
//   dsn: "localhost:3000",
//   enableInExpoDevelopment: true,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

// // Access any @sentry/react-native exports via:
// Sentry.Native.*

// // Access any @sentry/browser exports via:
// Sentry.Browser.*

// import { useColorScheme } from "react-native-appearance";
const theme = {
  Button: {
    titleStyle: {
      // color: "red",
    },
  },
  Overlay: {
    overlayStyle: {
      width: "90%",
      height: "50%",
    },
  },
};

// let colorScheme = useColorScheme();

export default function App() {
  return (
    <ThemeProvider
      theme={theme}
      // useDark={colorScheme === "dark"}
    >
      <Suspense fallback={<></>}>
        <View style={styles.container}>
          <Provider store={store}>
            <NativeRouter>
              <SafeAreaProvider style={{ width: "100%" }}>
                <AppContent />
              </SafeAreaProvider>
            </NativeRouter>
          </Provider>
          <StatusBar barStyle="auto" />
        </View>
      </Suspense>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// interface theme {
//   colors: {
//     primary;
//     secondary;
//     white;
//     black;
//     grey0;
//     grey1;
//     grey2;
//     grey3;
//     grey4;
//     grey5;
//     greyOutline;
//     searchBg;
//     success;
//     error;
//     warning;
//     divider;
//     platform: {
//       ios: {
//         primary;
//         secondary;
//         grey;
//         searchBg;
//         success;
//         error;
//         warning;
//       };
//       android: {
//         // Same as ios
//       };
//       web: {
//         // Same as ios
//       };
//     };
//   };
// }
