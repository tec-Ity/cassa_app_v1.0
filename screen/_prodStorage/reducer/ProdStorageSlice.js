import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../../api/api";
import { fetchObjs, populateObjs } from "../../../config/module/prod/prodConf";

import {
  cartItemPost,
  cartItemPut,
  openMultiSkuModal,
  selectProdQuantity,
} from "../../cart/reducer/cartSlice";

const initialState = {
  prodsAll: [],
  getStatus: "idle",
  scanStatus: "idle",
  errMsg: "",
  prodsShow: [],
  isAddNewProd: false,
  newProdCode: "",
};

export const searchProdScanned = createAsyncThunk(
  "prodStorage/searchProdScanned",
  async ({ code }, { getState, dispatch, rejectWithValue }) => {
    try {
      if (!code) throw new Error("No Prod code");
      const payload = {
        foundLocalProd: false,
        serverProd: null,
        isAddNewProd: false,
        newProdCode: code,
      };
      const prods = getState().prodStorage.prodsAll;
      for (let i = 0; i < prods.length; i++) {
        const prod = prods[i];
        if (prod.code === code) {
          //1 found prod local
          if (!prod.is_simple) {
            dispatch(openMultiSkuModal({ open: true, prod }));
          } else {
            const quantity = selectProdQuantity(prod._id)(getState());
            if (quantity === 0) dispatch(cartItemPost({ prod }));
            else
              dispatch(
                cartItemPut({
                  prodId: prod._id,
                  quantity: quantity + 1,
                })
              );
          }
          payload.foundLocalProd = true;
          return payload;
        }
      }
      //2 3
      const prodRes = await fetch_Prom(
        `${fetchObjs.api}?populateObjs=${JSON.stringify(
          populateObjs
        )}&search=${code}`
      );
      if (prodRes.status === 200) {
        if (prodRes.data.object) {
          //2 found prod server
          payload.serverProd = prodRes.data.object;
          return payload;
        } else {
          //not found prod in server
          payload.isAddNewProd = true;
          return payload;
        }
      } else throw new Error("Fetch Error");
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
    // if (code) {
    //   const payload = {
    //     existProd: false,
    //     addNewProd: false,
    //     isAddNewProd: false,
    //     needUpdateProd: false,
    //     newProd: null,
    //   };
    //   for (let i = 0; i < getState().prodStorage.prodsAll.length; i++) {
    //     const prod = getState().prodStorage.prodsAll[i];
    //     if (prod.code === code) {
    //       if (addNew) {
    //         //4 加号 完全匹配 | dialog 已存在 是否直接添加？
    //         return { ...payload, existProd: true };
    //       } else {
    //         //1 回车 完全匹配 | return prod
    //         const quantity = selectProdQuantity(prod._id)(getState());
    //         if (quantity === 0) dispatch(cartItemPost({ prod }));
    //         else
    //           dispatch(
    //             cartItemPut({
    //               prodId: prod._id,
    //               quantity: quantity + 1,
    //             })
    //           );
    //         return payload;
    //       }
    //     }
    //   }
    //   if (addNew) {
    //     //5 6 加号 没有匹配
    //     const prodRes = await fetch_Prom(`/prods?search=[${code}]`);
    //     if (prodRes.status === 200) {
    //       if (prodRes.data.object) {
    //         //5 加号 没有匹配 服务器匹配 | dialog 服务器有新增 请刷新？
    //         return {
    //           ...payload,
    //           newProd: prodRes.data.object,
    //           needUpdateProd: true,
    //         };
    //       } else {
    //         //6 加号 没有匹配 服务器没有匹配 | modal 直接添加
    //         return { ...payload, addNewProd: true };
    //       }
    //     } else {
    //       return rejectWithValue(prodRes.message);
    //     }
    //   } else return { ...payload, isAddNewProd: true };
    // } else return rejectWithValue("no code");
  }
);

export const fetchProds = createAsyncThunk(
  "prodStorage/fetchProds",
  async (isReload = false, { rejectWithValue }) => {
    const prodsRes = await fetch_Prom(
      `${fetchObjs.api}?populateObjs=${JSON.stringify(populateObjs)}`
    );
    // console.log(prodsRes);
    if (prodsRes.status === 200)
      return { objects: prodsRes.data.objects, isReload };
    else return rejectWithValue(prodsRes.message);
  }
);

export const prodStorageSlice = createSlice({
  name: "prodStorage",
  initialState,
  reducers: {
    searchProdCode: (state, action) => {
      const code = action.payload;
      if (code) {
        const prodsShow = [];
        for (let i = 0; i < state.prodsAll.length; i++) {
          const prod = state.prodsAll[i];
          if (prod.code.toUpperCase() === code.toUpperCase())
            prodsShow.unshift(prod);
          else if (prod.code.toUpperCase()?.includes(code.toUpperCase()))
            prodsShow.push(prod);
          if (prodsShow.length === 30) break;
        }
        state.prodsShow = prodsShow;
      }
    },
    resetProdShow: (state, action) => {
      if (state.prodsAll?.length > 0) {
        state.prodsShow = state.prodsAll.slice(0, 30);
      }
    },
    setIsAddNewProd: (state, action) => {
      const { open, code } = action.payload;
      state.isAddNewProd = open;
      if (open === false) state.newProdCode = code || "";
    },
    updateProdStorage: (state, action) => {
      try {
        const prods = action.payload;
        if (!prods.length > 0) throw new Error("prods invalid", prods);
        prods.forEach((prod) => {
          state.prodsAll.push(prod);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  extraReducers: {
    [fetchProds.pending]: (state) => {
      state.getStatus = "loading";
    },
    [fetchProds.fulfilled]: (state, action) => {
      state.getStatus = "succeed";
      const { objects, isReload } = action.payload;
      if (isReload) state.prodsAll = objects;
      else state.prodsAll = [...state.prodsAll, ...objects];

      state.prodsShow = objects.slice(0, 30);
    },
    [fetchProds.rejected]: (state, action) => {
      state.getStatus = "error";
      state.errMsg = action.payload;
    },
    [searchProdScanned.pending]: (state) => {
      state.scanStatus = "loading";
    },
    [searchProdScanned.fulfilled]: (state, action) => {
      state.scanStatus = "succeed";
      const { foundLocalProd, serverProd, isAddNewProd, newProdCode } =
        action.payload;
      if (serverProd) state.prodsAll.unshift(serverProd);
      if (foundLocalProd || serverProd)
        state.prodsShow = state.prodsAll.slice(0, 30);
      if (isAddNewProd) {
        state.isAddNewProd = true;
        state.newProdCode = newProdCode;
      }
      // const { existProd, addNewProd, newProd, needUpdateProd, isAddNewProd } =
      //   action.payload;
      // state.addNewProd = addNewProd;
      // state.existProd = existProd;
      // state.isAddNewProd = isAddNewProd;
      // if (newProd && needUpdateProd) {
      //   state.needUpdateProd = needUpdateProd;
      //   state.prodsAll.push(newProd);
      //   state.prodsShow = [newProd];
      // }
    },
    [searchProdScanned.rejected]: (state, action) => {
      state.scanStatus = "error";
      state.errMsg = action.payload;
    },
  },
});

export const {
  searchProdCode,
  resetProdShow,
  setIsAddNewProd,
  updateProdStorage,
} = prodStorageSlice.actions;
export default prodStorageSlice.reducer;
