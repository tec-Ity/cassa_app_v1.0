import { Text } from "react-native-elements";
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
      {Object.keys(routes)?.map((key) => {
        const subRoutes = routes[key];
        // console.log(subRoutes);
        return (
          <Route
            key={subRoutes.path}
            path={subRoutes.path + "/*"}
            element={
              <Routes>
                {subRoutes?.routes?.map((route) => {
                  // console.log(route.path + route.subRoutes);
                  return (
                    <Route
                      key={subRoutes.path + route.path}
                      path={route.path + (route.subRoutes ? "/*" : "")}
                      element={
                        route.subRoutes ? (
                          <Routes>
                            {route.subRoutes.map((subRoute) => (
                              <Route
                                key={subRoute.path + route.path}
                                path={subRoute.path}
                                element={
                                  <AuthRoute userRoles={subRoute.role}>
                                    {subRoute.element}
                                  </AuthRoute>
                                }
                              />
                            ))}
                          </Routes>
                        ) : (
                          <AuthRoute userRoles={route.role}>
                            {route.element}
                          </AuthRoute>
                        )
                      }
                    />
                  );
                })}
              </Routes>
            }
          />
        );
      })}
      <Route path={noAuthUrl} element={<Text>no permission</Text>} />
      <Route path={logoutUrl} element={<LogoutComp />} />
      <Route path="/" element={<Navigate to="/B/dashboard" />} />
      <Route path="*" element={<Text>not found</Text>} />
    </Routes>
  );
}
