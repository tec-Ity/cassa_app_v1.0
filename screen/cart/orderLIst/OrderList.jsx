import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { ButtonGroup, ListItem, Text } from "react-native-elements";
import SearchComp from "../../../component/search/SearchComp.jsx";
import { fetchObjs as fetchObjsOrder } from "../../../config/module/order/orderConf";
import { fetchObjs as fetchObjsPurchase } from "../../../config/module/purOrder/purOrderConf";
import { fetchObjs as fetchObjsOrderProd } from "../../../config/module/orderProd/orderProdConf";
import { getObjects, selectObjects } from "../../../redux/fetchSlice.js";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import getPrice from "../../../utils/price/getPrice.js";

export default function OrderList({ type = -1 }) {
  const dispatch = useDispatch();
  const searchParams = { 0: "order", 1: "prod" };
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchObjs = useMemo(() => {
    const searchParam = searchParams[selectedIndex];
    return type === 1
      ? fetchObjsPurchase
      : searchParam === "order"
      ? fetchObjsOrder
      : fetchObjsOrderProd;
  }, [type, selectedIndex]);

  useEffect(() => {
    fetchObjs && dispatch(getObjects({ fetchObjs }));
  }, [dispatch, fetchObjs]);

  const orders = useSelector(selectObjects(fetchObjs.flag, fetchObjs.subField));
  console.log(orders);
  return (
    <View style={{ position: "relative", paddingTop: 50 }}>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            <SearchComp fetchObjs={fetchObjs} realTime />
          </View>
          <View style={{ width: "40%" }}>
            <ButtonGroup
              buttons={["按订单", "按商品"]}
              selectedIndex={selectedIndex}
              onPress={(value) => {
                setSelectedIndex(value);
              }}
            />
          </View>
        </View>
        <View></View>
      </View>
      <ScrollView>
        {orders?.map((order) => (
          <ListItem key={order._id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{order.code}</ListItem.Title>
              <ListItem.Subtitle>
                {moment(order.at_crt).format("HH:MM")}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title>{getPrice(order.order_imp)}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
