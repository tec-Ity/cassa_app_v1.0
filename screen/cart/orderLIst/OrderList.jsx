import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  ButtonGroup,
  Chip,
  Icon,
  Image,
  ListItem,
  Overlay,
  Text,
} from "react-native-elements";
import SearchComp from "../../../component/search/SearchComp.jsx";
import { fetchObjs as fetchObjsOrder } from "../../../config/module/order/orderConf";
import { fetchObjs as fetchObjsPurchase } from "../../../config/module/purOrder/purOrderConf";
import { fetchObjs as fetchObjsOrderProd } from "../../../config/module/orderProd/orderProdConf";
import { getObjects, selectObjects } from "../../../redux/fetchSlice.js";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import getPrice from "../../../utils/price/getPrice.js";
import { get_DNS } from "../../../api/api.js";
import ClientFilter from "./ClientFilter.jsx";
import PaidTypeFilter from "./PaidTypeFilter.jsx";
import OrderDateFilter from "./OrderDateFIlter.jsx";
export default function OrderList({ type = -1 }) {
  const dispatch = useDispatch();
  const searchParams = { 0: "order", 1: "prod" };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [curOrder, setCurOrder] = useState();
  const fetchObjs = useMemo(() => {
    const searchParam = searchParams[selectedIndex];
    return type === 1
      ? fetchObjsPurchase
      : searchParam === "order"
      ? fetchObjsOrder
      : fetchObjsOrderProd;
  }, [type, selectedIndex]);

  const filters = [ClientFilter, PaidTypeFilter, OrderDateFilter];

  useEffect(() => {
    fetchObjs && dispatch(getObjects({ fetchObjs }));
  }, [dispatch, fetchObjs]);

  const orders = useSelector(selectObjects(fetchObjs.flag, fetchObjs.subField));
  console.log(orders);
  return (
    <>
      <View style={{ position: "relative", height: "100%", paddingTop: 110 }}>
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
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            {filters.map((Filter, index) => (
              <View key={index} style={{ minWidth: 80, marginLeft: "5%" }}>
                <Filter fetchObjs={fetchObjs} />
              </View>
            ))}
          </View>
        </View>
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem item={item} onPress={() => setCurOrder(item)} />
          )}
          keyExtractor={(item) => item._id}
          // refreshing={}
        />
      </View>
      {curOrder && (
        <OrderOverlay order={curOrder} onPress={() => setCurOrder(null)} />
      )}
    </>
  );
}

const OrderOverlay = ({ order, onPress }) => (
  <Overlay
    isVisible={Boolean(order)}
    overlayStyle={{ height: "100%", width: "100%" }}
  >
    <Icon name="arrow-back" raised onPress={onPress} />
    <ScrollView>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{order.code}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(order.at_crt).format("HH:MM")}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{getPrice(order.order_imp)}</ListItem.Title>
          <ListItem.Subtitle>共{order.goods_quantity}件</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <View>
        {order.OrderProds?.map((op) => (
          <ListItem key={op._id} bottomDivider>
            <Image
              source={{ uri: get_DNS() + op?.Prod?.img_urls[0] }}
              // PlaceholderContent={<ActivityIndicator />}
              containerStyle={{
                height: 80,
                width: 80,
              }}
              transition
            />
            <ListItem.Content>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <ListItem.Title style={{ fontSize: 22, fontWeight: "bold" }}>
                    {op?.code}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ fontSize: 18 }}>
                    {op?.nome}
                  </ListItem.Subtitle>
                </View>
                <View>
                  <ListItem.Title style={{ fontSize: 22, fontWeight: "bold" }}>
                    {getPrice(op?.price_sale)}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ fontSize: 16 }}>
                    共{op.prod_quantity}件
                  </ListItem.Subtitle>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  </Overlay>
);

const OrderItem = ({ item, onPress }) => {
  return (
    <ListItem key={item._id} bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{item.code}</ListItem.Title>
        <ListItem.Subtitle>
          {moment(item.at_crt).format("HH:MM")}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>{getPrice(item.order_imp)}</ListItem.Title>
        <ListItem.Subtitle>共{item.goods_quantity}件</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
