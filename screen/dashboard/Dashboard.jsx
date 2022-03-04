import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-native";
import navigations from "../../config/general/navi/naviConf";

const curRole = "boss";

export default function Dashboard() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingTop: 50,
      }}
    >
      {navigations.backNav?.links?.map(
        (nav, index) =>
          index !== 0 && (
            <View
              style={{
                width: "30%",
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AuthNav
                key={nav.to}
                userRoles={nav.role}
                curRole={curRole}
                isLogin={isLogin}
              >
                <Avatar
                  size={64}
                  title={nav.label}
                  rounded
                  containerStyle={{ backgroundColor: "rgb(32, 137, 220)" }}
                  titleStyle={{ fontSize: 14 }}
                  onPress={() =>
                    navigate(navigations.backNav.base + "/" + nav.to)
                  }
                />
              </AuthNav>
            </View>
          )
      )}
    </View>
  );
}

const AuthNav = ({ children, userRoles, curRole, isLogin }) => {
  if (isLogin && userRoles.indexOf(curRole) !== -1) return children;
  else return <></>;
};
