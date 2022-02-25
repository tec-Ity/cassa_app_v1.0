import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//conf
import {
  fetchObjs as fetchObjsClient,
  fetchObj as fetchObjClient,
} from "../../config/module/client/clientConf";
import {
  fetchObjs as fetchObjsSup,
  fetchObj as fetchObjSup,
} from "../../config/module/supplier/supConf";
import { selectObjects } from "../../redux/fetchSlice";
import clientFormInputs from "../../config/module/client/clientFormInputs";

//component
// import CusPostModal from "../modal/CusPostModal.jsx";
import SearchComp from "../search/SearchComp";
//mui
import { ScrollView, View } from "react-native";
import { ListItem, Overlay, Text } from "react-native-elements";
import ClientListItem from "../listItem/ClientListItem";

export default function CusClientOverlay({
  open,
  type,
  handleSelectClient,
  onClose = () => {},
  allowAddNew,
}) {
  // const [submitted, setSubmitted] = React.useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);
  const fetchObjs = useMemo(
    () => (type === 1 ? fetchObjsSup : fetchObjsClient),
    [type]
  );
  const fetchObj = type === 1 ? fetchObjSup : fetchObjClient;
  const getStatus = useSelector((state) => state.fetch.getStatus);
  const clients = useSelector(selectObjects(fetchObjs.flag));

  const onSearchSelect = (code) => {
    // setSubmitted(true);
    setSelectedCode(code);
  };

  useEffect(() => {
    if (selectedCode && getStatus === "succeed") {
      console.log(11111111111111111);
      if (!clients || clients.length === 0) {
        setShowAddClient(true);
      }
    }
  }, [getStatus, selectedCode]);

  return (
    <>
      <Overlay
        isVisible={open}
        onBackdropPress={onClose}
        overlayStyle={{ height: "50%", width: "90%" }}
      >
        <View>
          <SearchComp
            realTime
            placeholder="搜索会员"
            fetchObjs={fetchObjs}
            style={{ borderColor: "custom.secondaryMid" }}
            onSelect={allowAddNew && onSearchSelect}
          />
        </View>

        <ScrollView style={{ height: 100 }}>
          {clients?.length > 0 ? (
            clients.map((client) => (
              <ClientListItem
                client={client}
                key={client._id}
                onPress={() => {
                  handleSelectClient(client);
                  onClose();
                }}
              />
            ))
          ) : (
            <Text>请输入会员号/手机号</Text>
          )}
        </ScrollView>
      </Overlay>
      {/* <CusPostModal
        open={showAddClient}
        onClose={() => setShowAddClient(false)}
        formInputs={clientFormInputs}
        title="添加会员"
        fetchObj={fetchObj}
        defaultValue={{ code: selectedCode }}
        submittedCallback={(obj) => handleSelectClient(obj)}
      /> */}
    </>
  );
}
