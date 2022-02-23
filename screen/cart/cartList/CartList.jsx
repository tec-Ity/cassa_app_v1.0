import React from "react";
import { ScrollView, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import ProdControl from "../prodlist/ProdControl";
import ProdItem from "../prodlist/ProdItem";

export default function CartList() {
  const curCart = useSelector((state) => state.cart.curCart);

  return (
    <View style={{ height: "100%", border: "1px solid" }}>
      <View>
        <Text>共 {curCart.totItem} 件</Text>
        <View></View>
      </View>
      <ScrollView>
        {curCart?.OrderProds?.map((op) =>
          op.is_simple ? (
            <ListItem key={op._id} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{op.code}</ListItem.Title>
                <ListItem.Subtitle>{op.nome}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content>
                <ProdControl prod={op} />
              </ListItem.Content>
            </ListItem>
          ) : (
            <>
              <ListItem key={op._id}>
                <ListItem.Content>
                  <ListItem.Title>{op.code}</ListItem.Title>
                  <ListItem.Subtitle>{op.nome}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <ListItem.Title>共 {op.quantity} 件</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              {op.OrderSkus?.map((os, index) => (
                <ListItem
                  key={os._id}
                  bottomDivider={
                    index === op.OrderSkus.length - 1 ? true : false
                  }
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ paddingLeft: 20 }}>
                      {os.attrs?.map((attr) => (
                        <>
                          {attr.nome}:{attr.option} &nbsp;
                        </>
                      ))}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content>
                    <ProdControl prod={op} sku={os} />
                  </ListItem.Content>
                </ListItem>
              ))}
            </>
          )
        )}
      </ScrollView>
    </View>
  );
}
