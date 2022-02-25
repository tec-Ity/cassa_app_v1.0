import React, { Fragment, useState } from "react";
import { Chip, Overlay, ListItem, Button } from "react-native-elements";

export default function CusFilter({ title, items, defaultSel = null }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selected, setSelected] = useState(defaultSel);
  return (
    <>
      <Chip title={title} onPress={() => setShowOverlay(true)} />
      <Overlay
        isVisible={showOverlay}
        onBackdropPress={() => setShowOverlay(false)}
        overlayStyle={{ width: "90%", height: "50%" }}
      >
        {items?.map((item, index) => (
          <Fragment key={index}>
            <ListItem
              bottomDivider={Boolean(!item.extraContent)}
              containerStyle={{ width: "100%", justifyContent: "center" }}
            >
              {typeof item.content === "string" ? (
                <Button
                  title={item.content}
                  type={selected === index ? "solid" : "clear"}
                  onPress={() => {
                    setSelected(index);
                    item.handleClick && item.handleClick();
                  }}
                  containerStyle={{ width: "80%" }}
                />
              ) : (
                item.content
              )}
            </ListItem>
            {item.extraContent && (
              <ListItem style={{ width: "100%" }}>{item.extraContent}</ListItem>
            )}
          </Fragment>
        ))}
      </Overlay>
    </>
  );
}
