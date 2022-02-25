import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CusFilter from "../../../component/filter/CusFilter";
import ClientListItem from "../../../component/listItem/ClientListItem";
import CusClientOverlay from "../../../component/overlay/CusClientOverlay";
import { setQuery } from "../../../redux/fetchSlice";

export default function ClientFilter({ fetchObjs, type = -1 }) {
  const dispatch = useDispatch();
  const [client, setClient] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);
  const handleSelClient = (type) => (client) => {
    console.log(type, client);
    try {
      let Clients = "";
      switch (type) {
        case "all":
          Clients = "";
          setClient(null);
          break;
        case "null":
          Clients = "null";
          setClient(null);
          break;
        case "client":
          if (!client) throw new Error("Invalid client");
          Clients = [client._id];
          setShowClientModal(false);
          setClient(client);
          break;
        default:
          throw new Error("Invalid client type");
      }
      dispatch(setQuery({ fetchObjs, query: { Clients } }));
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    { content: "不限", handleClick: handleSelClient("all") },
    { content: "散客", handleClick: handleSelClient("null") },
    {
      content: "会员",
      extraContent: client && <ClientListItem client={client} />,
      handleClick: () => setShowClientModal(true),
    },
  ];

  return (
    <>
      <CusFilter title={"客户"} items={items} />
      <CusClientOverlay
        open={showClientModal}
        onClose={() => setShowClientModal(false)}
        type={type}
        handleSelectClient={handleSelClient("client")}
      />
    </>
  );
}
