import moment from "moment";
import React from "react";
import { ListItem } from "react-native-elements";

export default function ClientListItem({ client, onPress }) {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{client.code}</ListItem.Title>
        <ListItem.Subtitle>Phone: {client.phone}</ListItem.Subtitle>
        <ListItem.Subtitle>
          Reg Date: {moment(client.at_crt).format("Do MMM YYYY HH:MM")}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>{client.nome}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
