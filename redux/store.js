import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fetchReducer from "./fetchSlice";
import cartReducer from "../screen/cart/reducer/cartSlice";
import prodStorageReducer from "../screen/_prodStorage/reducer/ProdStorageSlice";

import {
  // loadState,
  storeData,
} from "./AsyncStorage";

import throttle from "lodash/throttle";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    fetch: fetchReducer,
    cart: cartReducer,
    prodStorage: prodStorageReducer,
  },
});

store.subscribe(
  throttle(() => {
    const { carts } = store.getState().cart;
    // //console.log("store", carts);
    storeData("carts", carts);
  }, 1000)
);
