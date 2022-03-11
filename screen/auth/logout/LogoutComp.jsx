import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-native";
import { fetchLogout } from "../../../redux/authSlice";
import { loginUrl } from "../../../config/general/router/routerConf";
import { clearAllData } from "../../../redux/AsyncStorage";
export default function LogoutComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutStatus = useSelector((state) => state.auth.logoutStatus);
  useEffect(() => {
    dispatch(fetchLogout());
  }, []);
  useEffect(() => {
    logoutStatus === "succeed" && navigate(loginUrl);
  }, [logoutStatus]);

  // useEffect(() => {
  //   if (logoutStatus === "succeed") navigate(loginUrl, { replace: true });
  //   if (logoutStatus === "error") navigate(-1);
  // }, [logoutStatus, navigate]);
  return <Text></Text>;
}
