import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon, Overlay, Text } from "react-native-elements";
//redux
import { useDispatch, useSelector } from "react-redux";
import { postObject, selectObject } from "../../../redux/fetchSlice";

//component
import CusForm from "../../form/CusForm.jsx";
//utils
//mui
//comp

export default function CusPostModal({
  isProdStorage,
  open,
  onClose,
  title,
  fetchObj,
  formInputs,
  fileInput,
  submittedCallback,
  defaultValue,
}) {
  //init
  const dispatch = useDispatch();
  //state
  const [submitted, setSubmitted] = useState(false);
  //selector
  const postStatus = useSelector((state) => state.fetch.postStatus);
  const postedObject = useSelector(selectObject(fetchObj.flag));

  //func
  const handleSubmit = (formValue) => {
    console.log(222);
    const formData = new FormData();
    const { image, ...obj } = formValue;
    formData.append("obj", JSON.stringify(obj));
    image?.forEach((img, i) => formData.append("img" + i, img));
    // formData.appeng("");
    console.log(obj);
    const data = image ? formData : { obj };
    dispatch(postObject({ fetchObj, data }));
    setSubmitted(true);
  };

  //effect
  useEffect(() => {
    if (submitted === true && postStatus === "succeed") {
      setSubmitted(false);
      submittedCallback && submittedCallback(postedObject);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postStatus, submitted]);

  return (
    <Overlay isVisible={open} overlayStyle={{ height: "100%", width: "100%" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon name="arrow-back" raised onPress={onClose} />
        <Text h4 style={{ fontWeight: "bold" }}>
          {title}
        </Text>
        <Text></Text>
      </View>
      <CusForm
        handleSubmit={handleSubmit}
        handleCancel={onClose}
        submitStatus={postStatus}
        formInputs={formInputs}
        fileInput={fileInput} //or single
        defaultValue={defaultValue}
      />
    </Overlay>
  );
}
