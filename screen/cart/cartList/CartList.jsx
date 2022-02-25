import React, { Fragment, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, ListItem, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import ProdControl from "../prodlist/ProdControl";
import CusClientOverlay from "../../../component/overlay/CusClientOverlay.jsx";

export default function CartList({ type }) {
  const curCart = useSelector((state) => state.cart.curCart);
  const [showClientOverlay, setShowClientOverlay] = useState(false);

  const handleSelectClient = (subject) => {
    // console.log(subject);
    if (subject) {
      dispatch(cartClientPost({ subject, type }));
      setShowClientModal(false);
    }
  };

  return (
    <>
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            title="添加会员"
            containerStyle={{ width: "40%" }}
            onPress={() => setShowClientOverlay(true)}
          />
          <Button title="添加折扣" containerStyle={{ width: "40%" }} />
        </View>
        <View>
          <Text>共 {curCart.totItem} 件</Text>
          <View></View>
        </View>
        <ScrollView style={{ height: 100, border: "1px solid" }}>
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
              <Fragment key={op._id}>
                <ListItem>
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
                          <Fragment key={attr.nome}>
                            {attr.nome}:{attr.option} &nbsp;
                          </Fragment>
                        ))}
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                      <ProdControl prod={op} sku={os} />
                    </ListItem.Content>
                  </ListItem>
                ))}
              </Fragment>
            )
          )}
        </ScrollView>
        <View>
          <Button title="下单" />
        </View>
      </View>
      <CusClientOverlay
        type={type}
        open={showClientOverlay}
        onClose={() => setShowClientOverlay(false)}
        handleSelectClient={handleSelectClient}
        allowAddNew
      />
    </>
  );
}
