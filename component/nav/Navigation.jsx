import React from "react";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-native";
import { useSelector } from "react-redux";
import navigations, {
  loginNav,
  logoutNav,
} from "../../config/general/navi/naviConf";
//RNE
import { Header, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
// import { ReactComponent as Logo } from "../../assets/logo/hfclogo.svg";

const curRole = "boss";
const navis = {
  front: {
    title: "收银系统",
    logo: "",
    btnLabel: "管理",
    navs: navigations.frontNav,
  },
  back: {
    title: "后台管理",
    logo: "",
    btnLabel: "收银",
    navs: navigations.backNav,
  },
};

export default function Navigation({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  //state
  const [section, setSection] = React.useState("back");
  const navi = navis[section];

  // console.log(location?.pathname);
  const curBase = location?.pathname?.split("/")[1];
  const curRoute = location?.pathname?.split("/")[2];
  //redirect to default index when change front or back
  React.useEffect(() => {
    console.log(11111111111, isLogin);
    const { navs } = navi;
    isLogin && navigate(navs.base + navs.defaultLink);
    //navigate change everytime, cannot be a dependecy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navi, isLogin]);

  return "/" + curBase === navigations.backNav.base ? (
    <UI
      isLogin={isLogin}
      navi={navi}
      toggleSection={() =>
        section === "front" ? setSection("back") : setSection("front")
      }
      curRoute={curRoute}
      children={children}
      navigate={navigate}
    />
  ) : (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      {children}
    </SafeAreaView>
  );
}

const AuthNav = ({ children, userRoles, curRole, isLogin }) => {
  if (isLogin && userRoles.indexOf(curRole) !== -1) return children;
  else return <></>;
};

const UI = ({ isLogin, navi, toggleSection, curRoute, children, navigate }) => {
  return (
    <View>
      <Header
        style={{ width: "100%" }}
        leftComponent={
          <Icon
            name="menu"
            color="white"
            onPress={() => navigate("/B/dashboard")}
          />
        }
        rightComponent={
          <Icon
            name="person"
            color="white"
            onPress={() => navigate("/B/settings")}
          />
        }
        centerComponent={{
          text: "管理",
          style: { color: "white", fontSize: 22, fontWeight: "bold" },
        }}
      />
      <View>{children}</View>
    </View>
  );
};

const NavItem = ({ nav, base, selected }) => {
  return <></>;
};
