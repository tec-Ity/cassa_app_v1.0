import React from "react";
import Router from "./router/Router";
import Navigation from "./component/nav/Navigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native-elements";
import { getLoginStatusFromStorage } from "./redux/authSlice";
import { useLocation } from "react-router-native";

export default function AppContent() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(getLoginStatusFromStorage()), []);
  const getLoginStatus = useSelector((state) => state.auth.getLoginStatus);
  const location = useLocation();
  console.log(getLoginStatus, location);
  return getLoginStatus === "succeed" ? (
    <Navigation>
      <Router />
    </Navigation>
  ) : (
    <Text>loging in</Text>
  );
}
