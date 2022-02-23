import React, { useCallback } from "react";
import { View } from "react-native";
import { Image, ListItem, Input, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItemDelete,
  cartItemPost,
  cartItemPut,
  openMultiSkuModal,
  selectProdQuantity,
  selectSkuQuantity,
} from "../reducer/cartSlice";

export default function ProdControl({ prod, sku }) {
  const dispatch = useDispatch();
  const prodId = prod?._id;
  const skuId = sku?._id;
  const isSimple = skuId ? true : prod?.is_simple;
  const Skus = prod?.Skus;
  const quantity = skuId
    ? useSelector(selectSkuQuantity(prod._id, sku._id))
    : useSelector(selectProdQuantity(prod._id));

  //func
  const handleItemPost = useCallback(
    (prod, sku) => () => {
      // console.log(prod, sku);
      dispatch(cartItemPost({ prod, sku }));
    },
    [dispatch]
  );

  const handleItemPut = useCallback(
    (prodId, skuId, quantity, price) => () => {
      // console.log(prodId, skuId, quantity, price);
      dispatch(cartItemPut({ prodId, skuId, quantity, price }));
    },
    [dispatch]
  );

  const handleItemDelete = useCallback(
    (prodId, skuId) => () => {
      // console.log("del");
      dispatch(cartItemDelete({ prodId, skuId }));
    },
    [dispatch]
  );

  const handleClickMulti = useCallback(
    (prod) => () => {
      if (prod) {
        dispatch(openMultiSkuModal({ open: true, prod }));
      }
    },
    [dispatch]
  );

  return (
    <View
      style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {isSimple === false ? (
        <Button
          icon={{ name: "list", color: "white" }}
          containerStyle={{ width: "60%" }}
          onPress={handleClickMulti(prod, Skus)}
        />
      ) : quantity === 0 ? (
        <Button
          title="添加"
          containerStyle={{ width: "60%" }}
          onPress={handleItemPost(prod, sku)}
        />
      ) : (
        <>
          {quantity === 1 ? (
            <Button
              icon={{ name: "delete-outline", color: "white" }}
              buttonStyle={{ height: 40, width: 40 }}
              onPress={handleItemDelete(prodId, skuId)}
            />
          ) : (
            <Button
              icon={{ name: "remove", color: "white" }}
              buttonStyle={{ height: 40, width: 40 }}
              onPress={handleItemPut(prodId, skuId, quantity - 1)}
            />
          )}
          <Input
            value={quantity > 0 ? String(quantity) : "1"}
            // disabled
            onPress={(e) => console.log(e)}
            // label="数量"
            containerStyle={{ width: "40%", height: 40 }}
            inputStyle={{ width: "40%", textAlign: "center", height: 40 }}
            keyboardType={"numeric"}
          />
          <Button
            icon={{ name: "add", color: "white" }}
            buttonStyle={{ height: 40, width: 40 }}
            onPress={handleItemPut(prodId, skuId, quantity + 1)}
          />
        </>
      )}
    </View>
  );
}
