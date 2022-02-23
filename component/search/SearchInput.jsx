import React, { useState, useEffect, useRef } from "react";
import { Input } from "react-native-elements";

const debounceTimeout = 0.7; //seconds
export default function SearchInput({
  handleChange = () => {}, //(value,select)
  realTime = true, //if false, only ENTER can trigger handleChange
  clearOnSelect = true,
  placeholder,
  style = {
    borderColor: null,
    borderColorHover: null,
    borderColorFocused: null,
  },
}) {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [timeoutStarted, setTimeoutStarted] = useState(false);
  const [allowAction, setAllowAction] = useState(false);
  const [selected, setSelected] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.code === "ControlRight") ref.current.focus();
  //   });
  // }, []);

  useEffect(() => {
    if (realTime) {
      if (value && allowAction === false && timeoutStarted === false) {
        setTimeoutStarted(true);
        setTimeout(() => {
          setAllowAction(true);
        }, debounceTimeout * 1000);
      }
    } else {
      if (!value) handleChange("");
    }
    if (!value && selected === false) handleChange();
  }, [value]);

  useEffect(() => {
    if (selected === true) {
      setSelected(false);
    } else if (selected === false && allowAction === true) {
      handleChange(value);
    }
    setAllowAction(false);
    setTimeoutStarted(false);
  }, [allowAction]);

  return (
    <Input
      placeholder={placeholder}
      inputContainerStyle={{ border: "1px solid", height: 50 }}
      containerStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
      errorStyle={{ margin: 0 }} //disable error message
      leftIcon={{ name: "search" }}
      onChangeText={(value) => {
        setValue(value);
      }}
    />
  );
}
