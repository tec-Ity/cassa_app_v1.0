import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import AppContent from "./AppContent";

// import { useColorScheme } from "react-native-appearance";
const theme = {
  Button: {
    titleStyle: {
      // color: "red",
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
