import React, { useState } from "react";
import { View } from "react-native";
import { Text, Input, Icon, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../redux/authSlice";

const iconObj = {
  0: "eye",
  1: "eye-off",
};

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ code: "", pwd: "" });
  const [visible, setVisible] = useState(0);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(fetchLogin(loginInfo));
  };

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        // flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: "40%",
      }}
    >
      <Text h2 style={{ fontWeight: "bold", marginBottom: 50 }}>
        请登录
      </Text>
      <Input
        label="账号"
        placeholder="请输入账号"
        errorStyle={{ color: "red" }}
        errorMessage=""
        labelStyle={{ marginHorizontal: "5%" }}
        inputContainerStyle={{ marginBottom: 30, marginHorizontal: "5%" }}
        onChangeText={(value) => setLoginInfo({ ...loginInfo, code: value })}
      />
      <Input
        label="密码"
        placeholder="请输入密码"
        errorStyle={{ color: "red" }}
        errorMessage=""
        labelStyle={{ marginHorizontal: "5%" }}
        inputContainerStyle={{ marginBottom: 30, marginHorizontal: "5%" }}
        secureTextEntry={visible === 0}
        rightIcon={
          <Icon
            name={iconObj[visible]}
            type="ionicon"
            onPress={() => setVisible(visible === 0 ? 1 : 0)}
          />
        }
        onChangeText={(value) => setLoginInfo({ ...loginInfo, pwd: value })}
      />
      <Button
        title="登录"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: "90%",
          marginVertical: 10,
        }}
        onPress={handleLogin}
      />
    </View>
  );
}
