import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigate } from "react-router-native";

export default function Account() {
  const navigate = useNavigate();
  return (
    <View>
      <Text>Account</Text>
      <Button
        title="管理"
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        onPress={() => navigate("/B/dashboard")}
      />
      <Button
        title="登出"
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        onPress={() => navigate("/logout")}
      />
    </View>
  );
}
