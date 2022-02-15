import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Router from "./router/Router";
import Navigation from "./component/nav/Navigation.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app</Text>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NativeRouter>
          <Navigation />
          <Router />
        </NativeRouter>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
  },
});
