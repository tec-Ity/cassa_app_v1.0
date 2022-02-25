import React, { useCallback, useEffect, useMemo, Suspense } from "react";
import { View } from "react-native";
import { Tab, Text, TabView } from "react-native-elements";
import ProdStorage from "../_prodStorage/ProdStorage.jsx";
import ProdList from "./prodlist/ProdList.jsx";
import CartList from "./cartList/CartList";
import OrderList from "./orderList/OrderList";
import Account from "./account/Account";
import { useDispatch, useSelector } from "react-redux";

import {
  cartClientPost,
  initCart,
  resetPayment,
  fetchCartOrderPost,
  fetchPaymentMethods,
  openMultiSkuModal,
} from "./reducer/cartSlice";

const tabItemObjs = [
  {
    title: "Shopping",
    icon: {
      name: "cart-arrow-down",
      type: "font-awesome",
      color: "white",
    },
  },
  {
    title: "Cart",
    icon: { name: "cart", type: "ionicon", color: "white" },
  },
  {
    title: "List",
    icon: { name: "list", type: "ionicon", color: "white" },
  },
  {
    title: "Account",
    icon: { name: "user-circle", type: "font-awesome-5", color: "white" },
  },
];

export default function CartPage({ type = 1 }) {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const curCart = useSelector((state) => state.cart.curCart);
  //effects
  //init cart
  useEffect(() => {
    dispatch(initCart(type));
    // dispatch(fetchPaymentMethods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  //reset payment
  // useEffect(() => {
  //   dispatch(resetPayment());
  // }, [dispatch, curCart.totPrice]);

  const tabViewObjs = useMemo(
    () => [
      { component: <ProdList /> },
      { component: <CartList /> },
      { component: <OrderList /> },
      { component: <Account /> },
    ],
    []
  );

  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: "white",
            height: 3,
          }}
          variant="primary"
        >
          {tabItemObjs.map((tabItem) => {
            const { title, titleStyle, icon } = tabItem;
            return (
              <Tab.Item
                key={title}
                title={title}
                titleStyle={{ fontSize: 12 }}
                icon={icon}
              />
            );
          })}
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          {tabViewObjs?.map((tabView, index) => (
            <TabView.Item
              key={index}
              style={{ width: "100%", height: "100%", paddingTop: 10 }}
            >
              {tabView.component}
            </TabView.Item>
          ))}
        </TabView>
      </View>
      <ProdStorage />
    </>
  );
}
