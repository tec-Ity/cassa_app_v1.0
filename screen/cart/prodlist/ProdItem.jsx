import React from "react";
import { View } from "react-native";
import { Image, ListItem } from "react-native-elements";
import { get_DNS } from "../../../api/api";
import getPrice from "../../../utils/price/getPrice";
import ProdControl from "./ProdControl";

export default function ProdItem({ prod, onPress }) {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <Image
        source={{ uri: get_DNS() + prod?.img_urls[0] }}
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
              {prod?.code}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 18 }}>
              {prod?.nome}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={{ fontSize: 16 }}>
              库存 xx
            </ListItem.Subtitle>
            {/* <ListItem.Subtitle>{prod?.nome}</ListItem.Subtitle> */}
          </View>
          <View>
            <ListItem.Title style={{ fontSize: 22, fontWeight: "bold" }}>
              {getPrice(prod?.price_sale)}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 16 }}>
              销量 xx
            </ListItem.Subtitle>
          </View>
        </View>
        <ProdControl prod={prod} />
      </ListItem.Content>
    </ListItem>
  );
}
