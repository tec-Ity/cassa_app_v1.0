import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import {
  Card,
  Image,
  Input,
  ListItem,
  SearchBar,
  Text,
} from "react-native-elements";
// import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { get_DNS } from "../../../api/api";
import {
  resetProdShow,
  searchProdCode,
  searchProdScanned,
  setIsAddNewProd,
  updateProdStorage,
} from "../../_prodStorage/reducer/ProdStorageSlice";
import getPrice from "../../../utils/price/getPrice";
export default function ProdList() {
  const dispatch = useDispatch();
  const prodsShow = useSelector((state) => state.prodStorage.prodsShow);
  console.log(prodsShow);
  const handleSearchProd = React.useCallback(
    (code, select) => {
      // console.log(code, select);
      if (code) {
        if (select) dispatch(searchProdScanned({ code }));
        else dispatch(searchProdCode(code));
      } else dispatch(resetProdShow());
    },
    [dispatch]
  );

  return (
    <View
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <ScrollView
        style={{
          height: 100,
        }}
      >
        {prodsShow.map((prod) => (
          <ListItem key={prod._id} bottomDivider>
            <Image
              source={{ uri: get_DNS() + prod.img_urls[0] }}
              // PlaceholderContent={<ActivityIndicator />}
              containerStyle={{
                height: 80,
                width: 80,
              }}
            />
            <ListItem.Content left>
              <ListItem.Title style={{ fontSize: 22, fontWeight: "bold" }}>
                {prod.code}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontSize: 18 }}>
                {prod.nome}
              </ListItem.Subtitle>
              {/* <ListItem.Subtitle>{prod.nome}</ListItem.Subtitle> */}
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title style={{ fontSize: 22, fontWeight: "bold" }}>
                {getPrice(prod.price_sale)}
              </ListItem.Title>
              <ListItem.Title style={{ fontSize: 20 }}>已选 xxx</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          zIndex: 99,
          backgroundColor: "white",
        }}
      >
        <Input
          inputContainerStyle={{ border: "1px solid", height: 50 }}
          containerStyle={{
            width: "60%",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          errorStyle={{ margin: 0 }} //disable error message
        />
        <View
          style={{ width: "40%", backgroundColor: "rgba(78, 116, 289, 1)" }}
        >
          <Text>共 x 件</Text>
        </View>
      </View>
    </View>
  );
}
