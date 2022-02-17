import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProds } from "./reducer/ProdStorageSlice";
import { Overlay, FAB } from "react-native-elements";

export default function ProdStorage() {
  const dispatch = useDispatch();
  const getStatus = useSelector((state) => state.prodStorage.getStatus);
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  useEffect(() => {
    isLogin && dispatch(fetchProds());
  }, [dispatch, isLogin]);

  return (
    <Overlay isVisible={getStatus === "loading"}>
      <FAB loading visible />
    </Overlay>
  );
}
