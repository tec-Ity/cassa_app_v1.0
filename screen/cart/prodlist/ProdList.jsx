import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import {
  Button,
  Image,
  Input,
  ListItem,
  Overlay,
  Text,
} from "react-native-elements";
// import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProdShow,
  searchProdCode,
  searchProdScanned,
  setIsAddNewProd,
  updateProdStorage,
} from "../../_prodStorage/reducer/ProdStorageSlice";
import SearchInput from "../../../component/search/SearchInput";
import ProdItem from "./ProdItem";
import { get_DNS } from "../../../api/api";
import { openMultiSkuModal, selectProdQuantity } from "../reducer/cartSlice";
import ProdControl from "./ProdControl";
export default function ProdList() {
  const dispatch = useDispatch();
  const prodsShow = useSelector((state) => state.prodStorage.prodsShow);
  const showMultiSkuModal = useSelector(
    (state) => state.cart.showMultiSkuModal
  );
  const curMultiSkuProd = useSelector((state) => state.cart.curMultiSkuProd);

  // const [curProd, setCurProd] = useState(null);
  // const [showProdOverlay, setShowProdOverlay] = useState(false);
  // const [showSkusOverlay, setShowSkusOverlay] = useState(false);
  // console.log(prodsShow);
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
  // const handleShowProdOverlay = (prod) => {
  //   if (prod) {
  //     setCurProd(prod);
  //     prod.is_simple ? setShowProdOverlay(true) : setShowSkusOverlay(true);
  //   }
  // };

  return (
    <>
      <View
        style={{
          height: "100%",
          position: "relative",
        }}
      >
        <FlatList
          style={{ height: 100 }}
          data={prodsShow}
          renderItem={({ item }) => item && <ProdItem prod={item} />}
          keyExtractor={(item) => item._id}
        />
        <SearchSection handleSearchProd={handleSearchProd} />
      </View>

      {/* {curProd && ( */}
      <>
        {/* <ProdOverlay
            open={showProdOverlay}
            onClose={() => setShowProdOverlay(false)}
            prod={curProd}
            handleItemPost={handleItemPost}
            handleItemDelete={handleItemDelete}
            handleItemPut={handleItemPut}
          /> */}
        <SkusOverlay
          open={showMultiSkuModal}
          onClose={() => {
            console.log(10101);
            dispatch(openMultiSkuModal({ open: false }));
          }}
          prod={curMultiSkuProd}
        />
      </>
      {/* )} */}
    </>
  );
}

const SearchSection = ({ handleSearchProd }) => {
  return (
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
      <View style={{ width: "60%", borderTopWidth: 1 }}>
        <SearchInput placeholder="搜索" handleChange={handleSearchProd} />
      </View>
      <View style={{ width: "40%", backgroundColor: "rgba(78, 116, 289, 1)" }}>
        <Text>共 x 件</Text>
      </View>
    </View>
  );
};

const ProdOverlay = ({ open, onClose, prod }) => {
  const quantity = useSelector(selectProdQuantity(prod._id));
  const [qtyTemp, setQtyTemp] = useState(quantity ?? 1);
  const [priceTemp, setPriceTemp] = useState(prod.price_sale ?? 0);

  useEffect(() => {
    setQtyTemp(quantity);
  }, [quantity]);

  const handleChangeQuantity = (quantity) => {
    setQtyTemp(parseInt(quantity));
  };

  const handleChangePrice = (price) => {
    setPriceTemp(parseFloat(price));
  };
  return (
    <Overlay
      isVisible={open}
      onBackdropPress={onClose}
      overlayStyle={{
        width: "90%",
        height: "50%",
        borderRadius: 10,
        minHeight: 500,
      }}
    >
      <View style={{ position: "relative", height: "100%" }}>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Image
            source={{ uri: get_DNS() + prod?.img_urls[0] }}
            transition
            containerStyle={{ height: 80, width: 80 }}
          />
          <View>
            <Text h5>编号: {prod?.code}</Text>
            <Text h5>名称: {prod?.nome}</Text>
            <Text h5>单位:{prod?.unit}</Text>
            <Text h5>参考价格:{prod?.price_sale}</Text>
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text h4 style={{ paddingRight: 50 }}>
              数量:
            </Text>
            <Button title="-" buttonStyle={{ height: 40, width: 40 }} />
            <Input
              value={quantity > 0 ? String(quantity) : "1"}
              // disabled
              onPress={(e) => console.log(e)}
              // label="数量"
              containerStyle={{ width: "30%", height: 40 }}
              inputStyle={{ width: "30%", textAlign: "center", height: 40 }}
              keyboardType={"numeric"}
            />
            <Button title="+" buttonStyle={{ height: 40, width: 40 }} />
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              height: 60,

              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text h4 style={{ paddingRight: 50 }}>
              价格:
            </Text>
            <Input
              value={String(prod.price_sale)}
              // disabled
              onPress={(e) => console.log(e)}
              containerStyle={{ width: "50%", height: 40 }}
              inputStyle={{ width: "50%", textAlign: "center" }}
              keyboardType={"numeric"}
              leftIcon={{ name: "euro" }}
            />
          </View>
        </View>
        <Button
          title="确认"
          buttonStyle={{ height: 40 }}
          containerStyle={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </View>
    </Overlay>
  );
};

const SkusOverlay = ({ open, onClose, prod }) => {
  return (
    <Overlay
      isVisible={open}
      onBackdropPress={onClose}
      overlayStyle={{
        width: "90%",
        height: "30%",
        borderRadius: 10,
      }}
    >
      <ScrollView>
        {prod?.Skus?.map((sku) => (
          <ListItem key={sku._id}>
            <ListItem.Content>
              <ListItem.Title>
                {sku.attrs?.map((attr) => attr.nome + ": " + attr.option)}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ProdControl prod={prod} sku={sku} />
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </Overlay>
  );
};
