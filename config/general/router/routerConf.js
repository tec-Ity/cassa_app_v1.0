// import CartPage from "../../../view/cart/CartPage";
import ProdList from "../../../screen/prod/prodList/ProdList.jsx";
// import UserList from "../../../view/user/list/UserList";
// import OrderList from "../../../view/order/list/OrderList";
// import ShopList from "../../../view/shop/list/ShopList.jsx";
// import ProdDetail from "../../../view/prod/detail/ProdDetail";
// import SupList from "../../../view/supplier/list/SupList.jsx";
// import ClientList from "../../../view/client/list/ClientList.jsx";
// import SettingPage from "../../../view/setting/SettingPage";
// import CoinPage from "../../../view/setting/coin/coinPage.jsx";
// import PaidTypePage from "../../../view/setting/paidType/PaidTypePage.jsx";
import LogoutComp from "../../../screen/auth/logout/LogoutComp.jsx";
import CartPage from "../../../screen/cart/CartPage.jsx";
import { Text } from "react-native-elements";
import Dashboard from "../../../screen/dashboard/Dashboard.jsx";
import Setting from "../../../screen/setting/Setting.jsx";

const loginUrl = "/login";
const logoutUrl = "/logout";
const noAuthUrl = "/noAuth";

const frontSettingRoutes = [
  {
    path: "/",
    // element: <SettingPage type={1} />,
    element: <Text>screen</Text>,
    role: ["worker", "boss"],
  },
  { path: logoutUrl, element: <LogoutComp />, role: ["worker", "boss"] },
];

const backSettingRoutes = [
  {
    path: "/",
    // element: <SettingPage type={-1} />,
    element: <Setting />,

    role: ["boss"],
  },
  {
    path: "/coins",
    // element: <CoinPage />,
    element: <Text>screen</Text>,

    role: ["boss"],
  },
  {
    path: "/paidTypes",

    element: <Text>screen</Text>,
    // element: <PaidTypePage />,
    role: ["boss"],
  },
  { path: logoutUrl, element: <LogoutComp />, role: ["worker", "boss"] },
];

const cartRoutes = [
  {
    path: "/",
    element: <CartPage />,
    role: ["worker", "boss"],
  },
];
const frontRoutes = {
  path: "/F",
  routes: [
    {
      path: "/cart",
      subRoutes: cartRoutes,
      role: ["worker", "boss"],
    },
    // {
    //   path: "/cart",
    //   element: <Text>screen</Text>,
    //   // element: <CartPage />,
    //   role: ["worker", "boss"],
    // },
    // {
    //   path: "/orders",
    //   element: <Text>screen</Text>,
    //   // element: <OrderList section={1} />,
    //   role: ["worker", "boss"],
    // },

    // {
    //   path: "/clients",
    //   element: <Text>screen</Text>,
    //   // element: <ClientList section={1} />,
    //   role: ["worker", "boss"],
    // },
    // {
    //   path: "/settings",
    //   subRoutes: frontSettingRoutes,
    //   role: ["worker", "boss"],
    // },
  ],
};

const backRoutes = {
  path: "/B",
  routes: [
    {
      path: "/dashboard",
      element: <Dashboard />,
      // element: <>dashboard</>,
      role: ["worker", "boss"],
    },
    {
      path: "/purchase",
      element: <Text>screen</Text>,
      // element: <CartPage type={1} />,
      role: ["worker", "boss"],
    },
    //order
    {
      path: "/orders",
      element: <Text>screen</Text>,
      // element: <OrderList seciton={-1} />,
      role: ["worker", "boss"],
    },

    {
      path: "/purOrders",
      element: <Text>screen</Text>,
      // element: <OrderList type={1} />,
      role: ["worker", "boss"],
    },

    //prod
    {
      path: "/prods",
      // element: <Text>screen</Text>,
      element: <ProdList />,
      role: ["boss"],
    },
    {
      path: "/prod/:_id",
      element: <Text>screen</Text>,
      // element: <ProdDetail />,
      role: ["boss"],
    },
    //client
    {
      path: "/clients",
      element: <Text>screen</Text>,
      // element: <ClientList section={-1} />,
      role: ["boss"],
    },
    //user
    {
      path: "/users",
      element: <Text>screen</Text>,
      // element: <UserList />,
      role: ["boss"],
    },
    //shop
    {
      path: "/shops",
      element: <Text>screen</Text>,
      // element: <ShopList />,
      role: ["boss"],
    },
    {
      path: "/suppliers",
      element: <Text>screen</Text>,
      // element: <SupList />,
      role: ["boss"],
    },
    {
      path: "/settings",
      subRoutes: backSettingRoutes,
      role: ["boss"],
    },
  ],
};

const settingRoutes = { frontSettingRoutes, backSettingRoutes };

const routes = { frontRoutes, backRoutes };
export default routes;
export { settingRoutes, loginUrl, logoutUrl, noAuthUrl };

// const routes = [
//   // {
//   //   path: "/order/:_id",
//   //   element: <>cart</>,
//   //   role: ["worker", "boss"],
//   // },
//   //
//   // {
//   //   path: "/purOrder/:_id",
//   //   element: <>cart</>,
//   //   role: ["worker", "boss"],
//   // },
//   // {
//   //   path: "/client/:_id",
//   //   element: <>client xxxx</>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/user/:_id",
//   //   element: <>user xxxx</>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/shop/:_id",
//   //   element: <>user xxxx</>,
//   //   role: ["boss"],
//   // },
//   // {
//   //   path: "/supplier/:_id",
//   //   element: <>user xxxx</>,
//   //   role: ["boss"],
//   // },
// ];
