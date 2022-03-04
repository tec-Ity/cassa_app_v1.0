import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigate } from "react-router-native";

export default function Setting() {
  const navigate = useNavigate();
  return (
    <>
      <Button title="收银" onPress={() => navigate("/F/cart")} />
      <Button title="登出" onPress={() => navigate("/logout")} />
    </>
  );
}
