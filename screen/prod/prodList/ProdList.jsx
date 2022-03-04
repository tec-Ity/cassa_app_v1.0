import React from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getObjects, selectObjects } from "../../../redux/fetchSlice";
import { fetchObjs } from "../../../config/module/prod/prodConf";
import { Button, Image, ListItem, Text } from "react-native-elements";
import { get_DNS } from "../../../api/api";

export default function ProdList() {
  const dispatch = useDispatch();
  const objects = useSelector(selectObjects(fetchObjs.flag));
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    dispatch(getObjects({ fetchObjs }));
  }, []);
  console.log(objects);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Text h3>商品列表</Text>
        <Button title="新增" containerStyle={{ width: "30%" }} />
      </View>

      <FlatList
        data={objects}
        renderItem={CusListItem}
        keyExtractor={(item) => item._id}
        // refreshing={refreshing}
        // onRefresh={() => {
        //   setRefreshing(true);
        //   dispatch(getObjects({ fetchObjs }));
        // }}
      />
    </View>
  );
}

const CusListItem = ({ item }) => {
  return (
    <ListItem containerStyle={{ height: 100 }} bottomDivider>
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
