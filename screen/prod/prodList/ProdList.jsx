import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getObjects, selectObjects } from "../../../redux/fetchSlice";
import { fetchObjs } from "../../../config/module/prod/prodConf";
import { Button, Image, ListItem, Text } from "react-native-elements";
import { get_DNS } from "../../../api/api";
import CusPostModal from "../../../component/modal/control/CusPostModal.jsx";
import CusPutModal from "../../../component/modal/control/CusPutModal.jsx";
import { fetchObj } from "../../../config/module/prod/prodConf";
import formInputs from "../../../config/module/prod/prodFormInputs";

export default function ProdList() {
  const dispatch = useDispatch();
  const objects = useSelector(selectObjects(fetchObjs.flag));
  const [refreshing, setRefreshing] = React.useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPutModal, setShowPutModal] = useState(false);
  const [putId, setPutId] = useState("");

  React.useEffect(() => {
    dispatch(getObjects({ fetchObjs }));
  }, []);
  console.log(objects);
  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <Text h3>商品列表</Text>
          <Button
            title="新增"
            containerStyle={{ width: "30%" }}
            onPress={() => setShowPostModal(true)}
          />
        </View>

        <FlatList
          data={objects}
          renderItem={({ item }) => (
            <CusListItem
              item={item}
              onPress={() => {
                setShowPutModal(true);
                setPutId(item._id);
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          // refreshing={refreshing}
          // onRefresh={() => {
          //   setRefreshing(true);
          //   dispatch(getObjects({ fetchObjs }));
          // }}
        />
      </View>
      <CusPostModal
        open={showPostModal}
        onClose={() => setShowPostModal(false)}
        fetchObj={fetchObj}
        title="添加产品"
        formInputs={formInputs}
        // fileInput={fileInput}
        // submittedCallback={submittedCallback}
        // defaultValue={postDefaultValue}
      />
      {console.log(putId)}
      <CusPutModal
        open={showPutModal}
        onClose={() => {
          setShowPutModal(false);
          setPutId("");
        }}
        title="产品详情"
        fetchObj={fetchObj}
        objectId={putId}
        formInputs={formInputs}
        // fileInput={fileInput}
        // moreDetails={moreDetails}
      />
    </>
  );
}

const CusListItem = ({ item, onPress }) => {
  return (
    <ListItem containerStyle={{ height: 100 }} bottomDivider onPress={onPress}>
      <Image
        source={{ uri: get_DNS() + item?.img_urls[0] }}
        // PlaceholderContent={<ActivityIndicator />}
        containerStyle={{
          height: 80,
          width: 80,
        }}
        transition
      />
      <ListItem.Content>
        <ListItem.Title>{item?.code}</ListItem.Title>
        <ListItem.Subtitle>{item?.nome}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
