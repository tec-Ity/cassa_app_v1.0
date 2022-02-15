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

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  //state
  const [section, setSection] = React.useState("front");
  const navi = navis[section];
  const curRoute = location?.pathname?.split("/")[2];

  //redirect to default index when change front or back
  React.useEffect(() => {
    const { navs } = navi;
    navigate(navs.base + navs.defaultLink);
    //navigate change everytime, cannot be a dependecy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navi]);

  return (
    <UI
      isLogin={isLogin}
      navi={navi}
      toggleSection={() =>
        section === "front" ? setSection("back") : setSection("front")
      }
      curRoute={curRoute}
    />
  );
}

const AuthNav = ({ children, userRoles, curRole, isLogin }) => {
  if (isLogin && userRoles.indexOf(curRole) !== -1) return children;
  else return <></>;
};

const UI = ({ isLogin, navi, toggleSection, curRoute }) => {
  return <></>;
};

const NavItem = ({ nav, base, selected }) => {
  return <></>;
};
