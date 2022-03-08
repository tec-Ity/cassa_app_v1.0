import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Icon, Overlay, Text } from "react-native-elements";
//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-native";
import {
  putObject,
  getObject,
  selectObject,
  deleteObject,
} from "../../../redux/fetchSlice";
//component
import CusForm from "../../form/CusForm.jsx";
// import CusDialog from "./CusDialog";
//utils

//mui

export default function CusPutModal({
  open,
  onClose,
  title,
  fetchObj,
  formInputs,
  fileInput,
  objectId,
  moreDetails = false,
}) {
  //init
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  //selector
  const object = useSelector(selectObject(fetchObj.flag));
  const putStatus = useSelector((state) => state.fetch.putStatus);
  // const getStatus = useSelector((state) => state.fetch.getStatus);
  const deleteStatus = useSelector((state) => state.fetch.deleteStatus);
  //effect
  //init object
  useEffect(() => {
    // console.log(getStatus);
    dispatch(getObject({ fetchObj, id: objectId }));
  }, [objectId]);

  useEffect(() => {
    if (submitted === true && putStatus === "succeed") {
      setSubmitted(false);
      onClose();
    }
  }, [onClose, putStatus, submitted]);

  useEffect(() => {
    if (deleted === true && deleteStatus === "succeed") {
      setDeleted(false);
      onClose();
    }
  }, [deleteStatus, deleted, onClose]);

  //func
  const handleSubmit = useCallback((formValue) => {
    const formData = new FormData();
    const { image, ...obj } = formValue;
    formData.append("obj", JSON.stringify(obj));
    image?.forEach((img, i) => formData.append("img" + i, img));
    const data = image ? formData : { general: obj };
    dispatch(putObject({ fetchObj, data, id: objectId }));
    setSubmitted(true);
  }, []);

  //   const handleCancel = useCallback(() => {

  //   }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteObject({ fetchObj, id: objectId }));
    setDeleted(true);
  }, [dispatch, fetchObj, objectId]);
  console.log(object);
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
        submitStatus={putStatus}
        formInputs={formInputs}
        // fileInput={fileInput} //or single
        defaultValue={object}
      />
    </Overlay>
  );
}
