import { useSelector } from "react-redux";
import { Navigate } from "react-router-native";
import { loginUrl, noAuthUrl } from "../config/general/router/routerConf";

export default function AuthRoute({ userRoles, children }) {
  const curRole = "boss";
  const isLogin = useSelector((state) => state.auth.isLogin);

  if (!isLogin) return <Navigate to={loginUrl} />;
  else if (userRoles.indexOf(curRole) > -1) return children;
  else return <Navigate to={noAuthUrl} />;
}
