// import CartPage from "../../../view/cart/CartPage";
// import ProdList from "../../../view/prod/list/ProdList";
// import UserList from "../../../view/user/list/UserList";
// import OrderList from "../../../view/order/list/OrderList";
// import ShopList from "../../../view/shop/list/ShopList.jsx";
// import ProdDetail from "../../../view/prod/detail/ProdDetail";
// import SupList from "../../../view/supplier/list/SupList.jsx";
// import ClientList from "../../../view/client/list/ClientList.jsx";
// import SettingPage from "../../../view/setting/SettingPage";
// import CoinPage from "../../../view/setting/coin/coinPage.jsx";
// import PaidTypePage from "../../../view/setting/paidType/PaidTypePage.jsx";
import { Text } from "react-native";
import LogoutComp from "../../../screen/auth/logout/LogoutComp.jsx";
const frontRoutes = {
  path: "/F",
  routes: [
    {
      path: "/cart",
      element: <Text>dashboard</Text>,
      // element: <CartPage />,
      role: ["worker", "boss"],
    },
    {
      path: "/orders",
      element: <Text>dashboard</Text>,
      // element: <OrderList section={1} />,
      role: ["worker", "boss"],
    },

    {
      path: "/clients",
      element: <Text>dashboard</Text>,
      // element: <ClientList section={1} />,
      role: ["worker", "boss"],
    },
    {
      path: "/settings",
      hasSubRoutes: true,
      element: <Text>dashboard</Text>,
      // element: <SettingPage type={1} />,
      role: ["worker", "boss"],
    },
  ],
};

const backRoutes = {
  path: "/B",
  routes: [
    {
      path: "/dashboard",
      element: <Text>dashboard</Text>,
      // element: <Text>dashboard</Text>,
      role: ["worker", "boss"],
    },
    {
      path: "/purchase",
      element: <Text>dashboard</Text>,
      // element: <CartPage type={1} />,
      role: ["worker", "boss"],
    },
    //order
    {
      path: "/orders",
      element: <Text>dashboard</Text>,
      // element: <OrderList seciton={-1} />,
      role: ["worker", "boss"],
    },

    {
      path: "/purOrders",
      element: <Text>dashboard</Text>,
      // element: <OrderList type={1} />,
      role: ["worker", "boss"],
    },

    //prod
    {
      path: "/prods",
      element: <Text>dashboard</Text>,
      // element: <ProdList />,
      role: ["boss"],
    },
    {
      path: "/prod/:_id",
      element: <Text>dashboard</Text>,
      // element: <ProdDetail />,
      role: ["boss"],
    },
    //client
    {
      path: "/clients",
      element: <Text>dashboard</Text>,
      // element: <ClientList section={-1} />,
      role: ["boss"],
    },
    //user
    {
      path: "/users",
      element: <Text>dashboard</Text>,
      // element: <UserList />,
      role: ["boss"],
    },
    //shop
    {
      path: "/shops",
      element: <Text>dashboard</Text>,
      // element: <ShopList />,
      role: ["boss"],
    },
    {
      path: "/suppliers",
      element: <Text>dashboard</Text>,
      // element: <SupList />,
      role: ["boss"],
    },
    {
      path: "/settings",
      hasSubRoutes: true,
      element: <Text>dashboard</Text>,
      // element: <SettingPage type={-1} />,
      role: ["boss"],
    },
  ],
};
const loginUrl = "/login";
const logoutUrl = "/logout";
const noAuthUrl = "/noAuth";

const frontSettingRoutes = [
  { path: logoutUrl, element: <LogoutComp />, role: ["worker", "boss"] },
];

const backSettingRoutes = [
  {
    path: "/coins",
    element: <Text>dashboard</Text>,
    // element: <CoinPage />,
    role: ["boss"],
  },
  {
    path: "/paidTypes",
    element: <Text>dashboard</Text>,
    // element: <PaidTypePage />,
    role: ["boss"],
  },
  { path: logoutUrl, element: <LogoutComp />, role: ["worker", "boss"] },
];

const settingRoutes = { frontSettingRoutes, backSettingRoutes };

const routes = { frontRoutes, backRoutes };
export default routes;
export { settingRoutes, loginUrl, logoutUrl, noAuthUrl };

// const routes = [
//   // {
//   //   path: "/order/:_id",
//   //   element: <Text>cart</Text>,
//   //   role: ["worker", "boss"],
//   // },
//   //
//   // {
//   //   path: "/purOrder/:_id",
//   //   element: <Text>cart</Text>,
//   //   role: ["worker", "boss"],
//   // },
//   // {
//   //   path: "/client/:_id",
//   //   element: <Text>client xxxx</Text>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/user/:_id",
//   //   element: <Text>user xxxx</Text>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/shop/:_id",
//   //   element: <Text>user xxxx</Text>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/supplier/:_id",
//   //   element: <Text>user xxxx</Text>,
//   //   role: ["boss"],
//   // },
// ];
