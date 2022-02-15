import { Routes, Route, Navigate } from "react-router-native";
import routes, {
  loginUrl,
  logoutUrl,
  noAuthUrl,
} from "../config/general/router/routerConf";
import Login from "../screen/auth/login/Login";
import LogoutComp from "../screen/auth/logout/LogoutComp";
import AuthRoute from "./AuthRoute";

export default function Router() {
  return (
    <Routes>
      <Route path={loginUrl} element={<Login />} />
      {Object.keys(routes).map((key) => {
        const subRoutes = routes[key];
        console.log(subRoutes.path);
        return (
          <Route
            key={subRoutes.path}
            path={subRoutes.path + "/*"}
            element={
              <Routes>
                {subRoutes?.routes?.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path + (route.hasSubRoutes ? "/*" : "")}
                      element={
                        <AuthRoute userRoles={route.role}>
                          {route.element}
                        </AuthRoute>
                      }
                    />
                  );
                })}
              </Routes>
            }
          />
        );
      })}
      <Route path={noAuthUrl} element={<>no permission</>} />
      <Route path={logoutUrl} element={<LogoutComp />} />
      <Route path="/" element={<Navigate to="/F/orders" />} />
      <Route path="*" element={<>not found</>} />
    </Routes>
  );
}
