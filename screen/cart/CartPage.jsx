import React from "react";
import { View } from "react-native";
import { Tab, Text, TabView } from "react-native-elements";
import Account from "./account/Account";
import ProdStorage from "../_prodStorage/ProdStorage.jsx";
export default function CartPage() {
  const [index, setIndex] = React.useState(0);

  const tabItemObjs = [
    {
      title: "Shopping",
      icon: {
        name: "cart-arrow-down",
        type: "font-awesome",
        color: "white",
      },
    },
    {
      title: "Cart",
      icon: { name: "cart", type: "ionicon", color: "white" },
    },
    {
      title: "List",
      icon: { name: "list", type: "ionicon", color: "white" },
    },
    {
      title: "Account",
      icon: { name: "user-circle", type: "font-awesome-5", color: "white" },
    },
  ];

  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: "white",
            height: 3,
          }}
          variant="primary"
        >
          {tabItemObjs.map((tabItem) => {
            const { title, titleStyle, icon } = tabItem;
            return (
              <Tab.Item
                key={title}
                title={title}
                titleStyle={{ fontSize: 12 }}
                icon={icon}
              />
            );
          })}
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item>
            <Text h1>shopping</Text>
          </TabView.Item>
          <TabView.Item>
            <Text h1>cart</Text>
          </TabView.Item>
          <TabView.Item>
            <Text h1>list</Text>
          </TabView.Item>
          <TabView.Item>
            <Account />
          </TabView.Item>
        </TabView>
      </View>
      <ProdStorage />
    </>
  );
}
