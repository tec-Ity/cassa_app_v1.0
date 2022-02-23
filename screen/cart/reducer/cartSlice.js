import {
  createAsyncThunk,
  createSlice,
  // current,
  nanoid,
} from "@reduxjs/toolkit";
import { fetch_Prom } from "../../../api/api";
import { fetchObj as fetchObjOrder } from "../../../config/module/order/orderConf";
import { fetchObjs as fetchObjsPaidTypes } from "../../../config/module/setting/payment/type/paidTypeConf";
import { getData } from "../../../redux/AsyncStorage";

const initialState = {
  carts: [],
  curCart: {},
  cartPostStatus: "idle",
  postedOrder: {},
  enableMultiPayment: false,
  curModifyMethod: null, //modifying, unfinished process
  curCoin: {},
  paymentMethods: {},
  showMultiSkuModal: false,
  curMultiSkuProd: null,
  error: "",
};
//thunk
export const fetchCartOrderPost = createAsyncThunk(
  "cart/fetchCartOrderPost",
  async ({ cartId, type = -1 }, { getState, rejectWithValue, dispatch }) => {
    // console.log(type);
    try {
      let cartPost = cartId
        ? getState().cart.carts.find((cart) => cart.cartId === cartId)
        : getState().cart.curCart;
      if (!cartPost.OrderProds || cartPost.OrderProds.length === 0)
        throw new Error("cart empty");
      if (cartPost.toPay !== 0) {
        // getState().cart.error = "Not Paid";
        throw new Error("Not Paid");
      }
      if (getState().curModifyMethod) throw new Error("unfinshed payment!");
      // console.log("cart post", cartPost);
      const obj = {};
      obj.OrderProds = cartPost.OrderProds.map((op) => {
        const opTemp = {
          Prod: op.Prod,
        };
        if (!op.OrderSkus || op.OrderSkus.length === 0) {
          opTemp.quantity = op.quantity;
          opTemp.price = op.price;
        } else
          opTemp.OrderSkus = op.OrderSkus.map((os) => ({
            Sku: os.Sku,
            quantity: os.quantity,
            price: os.price,
          }));

        return opTemp;
      });

      obj.type_ship = 0;
      if (type === 1) {
        obj.type_Order = 1;
        obj.Supplier = cartPost.subject?._id;
      } else {
        obj.Client = cartPost.subject?._id;
      }

      obj.rate = cartPost.rate;
      obj.Paidtype = cartPost.PaidType; //api Paidtype, not PaidType
      if (cartPost.totPrice !== cartPost.totExchange) {
        obj.price_coin = cartPost.totExchange;
      }
      console.log("obj post", obj);
      const postRes = await fetch_Prom(
        `${fetchObjOrder.api}?populateObjs=${JSON.stringify(
          fetchObjOrder.query.populateObjs
        )}`,
        "POST",
        { obj }
      );
      console.log("postRes", postRes);
      if (postRes.status === 200) {
        dispatch(initCart());
        return postRes.data.object;
      } else return rejectWithValue(postRes.message);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPaymentMethods = createAsyncThunk(
  "cart/fetchPaymentMethods",
  async () => {
    const methodsRes = await fetch_Prom(
      `${fetchObjsPaidTypes.api}?populateObjs=${JSON.stringify(
        fetchObjsPaidTypes.query.populateObjs
      )}`
    );
    console.log(methodsRes);
    if (methodsRes.status === 200) {
      return methodsRes.data.objects;
    }
  }
);

//helper function
const resetPaymentMethods = (state, field) => {
  try {
    //no immer use spread operators
    let method;
    if (!field) {
      method = state.paymentMethods?.byId[state.paymentMethods?.allIds[0]];
      field = method.field;
    } else method = state.paymentMethods?.byId[field];

    const rate = method.Coin.rate;
    const initialPaymentMethods = state.initialPaymentMethods;
    const newMethods = {
      ...initialPaymentMethods,
      byId: {
        ...initialPaymentMethods.byId,
        [field]: {
          ...initialPaymentMethods.byId[field],
          price: state.curCart.totPrice * rate,
          active: true,
        },
      },
    };
    state.paymentMethods = newMethods;
    state.curCart.toPay = 0;
    state.curCart.change = 0;
    state.curCart.rate = rate;
    state.curCart.PaidType = method._id;
    state.curCart.totExchange = state.curCart.totPrice * rate;
    state.curModifyMethod = null;
    state.curCoin = method.Coin;
  } catch (err) {
    console.log(err);
  }
};

// const modifyCheck = (state, field) => {
//   for (const [id, methodObj] of Object.entries(state.paymentMethods.byId)) {
//     if (methodObj.active && !methodObj.price) {
//       state.error = "unsettled process";
//       return false;
//     }
//     if (methodObj.modifying) {
//       state.error = "unfinished modify";
//       methodObj.errorMsg = "unfinished modify";
//       return false;
//     }
//   }
//   return true;
// };

//cartSlice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.error = "";
    },
    openMultiSkuModal: (state, action) => {
      try {
        const { open, prod } = action.payload;
        if (open) {
          if (!prod || !prod.Skus) throw new Error("no skus");
          if (!prod?.Skus?.length > 0)
            throw new Error("skus is not array or has 0 skus");
          state.showMultiSkuModal = true;
          state.curMultiSkuProd = prod;
        } else {
          state.showMultiSkuModal = false;
          state.curMultiSkuProd = null;
        }
      } catch (err) {
        console.log(err);
      }
    },
    modifyCheck: (state, action) => {
      const field = action.payload;
      if (field) {
        if (state.curModifyMethod === field) {
          state.paymentMethods.byId[field].errorMsg = "unfinished process";
        }
      }
    },
    setCurModifyMethod: (state, action) => {
      const field = action.payload;
      if (field) {
        state.curModifyMethod = field;
      } else state.curModifyMethod = null;
    },
    toggleEnableMultiPayment: (state, action) => {
      state.enableMultiPayment = !state.enableMultiPayment;
      resetPaymentMethods(state);
    },
    togglePaymentMethod: (state, action) => {
      const field = action.payload;
      for (let i = 0; i < state.paymentMethods.allIds.length; i++) {
        const id = state.paymentMethods.allIds[i];
        const error = state.paymentMethods.byId[id].errorMsg;
        if (error) {
          state.error = error;
          return;
        }
      }
      if (field) {
        const method = state.paymentMethods.byId[field];
        if (!state.enableMultiPayment) {
          method.errorMsg = "";
          state.error = "";
        }
        if (field === "vip" && !state.curCart.subject?._id) {
          state.error = "请先录入会员";
          return;
        }
        if (!state.enableMultiPayment) {
          if (!method.active) {
            resetPaymentMethods(state, field);
          }
        } else {
          //multi payment
          if (!method.active) {
            if (state.curModifyMethod) {
              state.error = "请先完成之前的操作";
              return;
            }
            state.curModifyMethod = field;
            method.active = true;
            method.price = state.curCart.toPay;
            state.curCart.toPay = 0;
          } else {
            // if(field!=='cash')
            method.active = false;
            if (method.price) {
              state.curCart.toPay += method.price;
              method.price = null;
            }
          }
        }
      }
    },
    resetPayment: (state, action) => {
      if (state.paymentMethods.byId && state.paymentMethods.allIds)
        resetPaymentMethods(state);
    },
    updatePaymentMethodPrice: (state, action) => {
      try {
        const { field, price } = action.payload;
        if (field) {
          // if (!modifyCheck(state)) return;
          const method = state.paymentMethods.byId[field];
          if (!price) {
            method.errorMsg = "please enter a number";
            return;
          } // const cashMethod = state.paymentMethods.byId.cash;
          if (!state.enableMultiPayment) {
            if (price < state.curCart.totExchange) {
              method.errorMsg = "not enough";
              return;
            }
          }
          method.price = price;
          method.errorMsg = null;
          if (method.is_cash) {
            const changeTemp = method.price - state.curCart.totExchange;
            // console.log(changeTemp);
            state.curCart.change = changeTemp > 0 ? changeTemp : 0;
          }
          // const toPayTemp = state.curCart.toPay - price;
          // state.curCart.toPay = toPayTemp >= 0 ? toPayTemp : 0;

          state.curModifyMethod = null;
          state.error = null;
        }
      } catch (err) {
        console.log(err);
      }
    },
    initCart: {
      reducer(state, action) {
        if (state.curCart?.OrderProds) return;
        // console.log("init");
        const { cartId, crt_at, type } = action.payload;
        const cartTemp = {
          cartId: cartId,
          crt_at: crt_at,
          type: type,
          totItem: 0,
          totPrice: 0, //订单总价
          toPay: 0, //未付
          change: 0, //找零
          orderProds: [],
        };
        state.curCart = cartTemp;
      },
      prepare(type = -1) {
        const cartIdTemp = nanoid();
        const crt_at = Date.now();
        return {
          payload: { cartId: cartIdTemp, crt_at, type },
        };
      },
    },
    cartClientPost: (state, action) => {
      const { subject, type = -1 } = action.payload;
      if (subject) state.curCart.subject = subject;
      // if (type !== 1)
      //   state.carts.forEach((cart) => {
      //     if (cart.cartId === state.curCart.cartId) cart = state.curCart;
      //   });
    },
    cartItemPost: {
      reducer(state, action) {
        try {
          const { upd_at, prod, sku, type = -1 } = action.payload;
          // console.log(action.payload);
          if (!prod) throw new Error("no valid prod");
          let orderSkuTemp;
          if (sku)
            orderSkuTemp = {
              _id: sku._id,
              Sku: sku._id,
              attrs: sku.attrs,
              price: type === -1 ? sku.price_sale : sku.price_cost,
              priceBase: type === -1 ? sku.price_sale : sku.price_cost,
              price_sale: sku.price_sale,
              price_cost: sku.price_cost,
              price_regular: sku.price_regular,
              quantity: 1,
            };

          const orderProdTemp = {
            _id: prod._id,
            code: prod.code,
            Prod: prod._id,
            nome: prod.nome,
            // OrderSkus: [orderSkuTemp],
            is_simple: prod.is_simple,
            unit: prod.unit,
            price_regular: prod.price_regular,
            price: type === -1 ? prod.price_sale : prod.price_cost,
            priceBase: type === -1 ? prod.price_sale : prod.price_cost,
            price_sale: prod.price_sale,
            price_cost: prod.price_cost,
            quantity: 1,
          };

          if (sku) orderProdTemp.OrderSkus = [orderSkuTemp];
          const cartTemp = state.curCart;

          let foundProd = false;
          for (let i = 0; i < cartTemp.OrderProds?.length; i++) {
            const orderProd = cartTemp.OrderProds[i];
            if (orderProd.Prod === prod._id) {
              //exsit prod
              // console.log("has prod");
              foundProd = true;
              if (sku) {
                if (!orderProd.OrderSkus) cartTemp.OrderProds[i].OrderSkus = [];
                cartTemp.OrderProds[i].OrderSkus.unshift(orderSkuTemp);
                cartTemp.OrderProds[i].quantity += 1;
              } else throw new Error("Prod exist and no Sku provide");
            }
          }
          //new prod
          if (!foundProd) {
            // console.log("new prod");
            if (!cartTemp.OrderProds) cartTemp.OrderProds = [];
            cartTemp.OrderProds.unshift(orderProdTemp);
          }
          if (sku) cartTemp.totPrice += orderSkuTemp.price;
          else cartTemp.totPrice += orderProdTemp.price;
          cartTemp.totItem += 1;
          cartTemp.upd_at = upd_at;
          //update carts
          // if (type !== 1)
          //   for (let i = 0; i < state.carts.length; i++) {
          //     let cart = state.carts[i];
          //     if (cart.cartId === cartTemp.cartId) {
          //       state.carts[i] = cartTemp;
          //     }
          //   }
        } catch (err) {
          console.log(err);
        }
      },
      prepare(payload) {
        let upd_at = Date.now();
        return {
          payload: { upd_at, ...payload },
        };
      },
    },
    cartItemPut: (state, action) => {
      try {
        const { prodId, skuId, quantity, price, type = -1 } = action.payload;
        if (!prodId) throw new Error("no prodId");
        if (!quantity && !price)
          throw new Error("no quantity or price provided");
        let quantityDiff;
        let priceDiff;
        let foundSku = false;
        for (let i = 0; i < state.curCart.OrderProds?.length; i++) {
          const oProd = state.curCart.OrderProds[i];
          //found prod
          if (oProd.Prod === prodId) {
            //given sku not simple
            if (skuId) {
              for (let j = 0; j < oProd.OrderSkus.length; j++) {
                const oSku = oProd.OrderSkus[j];
                //found sku
                if (oSku.Sku === skuId) {
                  const priceOld = oSku.price * oSku.quantity;
                  if (quantity) {
                    quantityDiff = quantity - oSku.quantity;
                    state.curCart.totItem += quantityDiff;
                    oProd.quantity += quantityDiff;
                    oSku.quantity = quantity;
                  }
                  if (price) oSku.price = price;
                  priceDiff = oSku.price * oSku.quantity - priceOld;
                  state.curCart.totPrice += priceDiff;
                  foundSku = true;
                  break;
                }
              }
              if (foundSku) break;
            } else {
              //is simple
              const priceOld = oProd.quantity * oProd.price;
              if (quantity) {
                quantityDiff = quantity - oProd.quantity;
                oProd.quantity = quantity;
                state.curCart.totItem += quantityDiff;
              }
              if (price) oProd.price = price;
              priceDiff = oProd.quantity * oProd.price - priceOld;
              state.curCart.totPrice += priceDiff;
            }
          }
        }
        //update carts
        // if (type !== 1)
        //   for (let i = 0; i < state.carts.length; i++) {
        //     if (state.carts[i].cartId === state.curCart.cartId)
        //       state.carts[i] = state.curCart;
        //   }
      } catch (err) {
        console.log(err);
      }
    },
    cartItemDelete: (state, action) => {
      try {
        const { prodId, skuId, type = -1 } = action.payload;
        if (!prodId) throw new Error("no prodId");
        let delSku = -1,
          delProd = -1;
        for (let i = 0; i < state.curCart.OrderProds.length; i++) {
          const oProd = state.curCart.OrderProds[i];
          //found Prod
          if (oProd.Prod === prodId) {
            if (skuId) {
              for (let j = 0; j < oProd.OrderSkus.length; j++) {
                const oSku = oProd.OrderSkus[j];
                if (oSku.Sku === skuId) {
                  delSku = j;
                  break;
                }
              }
              if (delSku !== -1) {
                state.curCart.totPrice -= oProd.OrderSkus[delSku].price;
                state.curCart.totItem -= 1;
                oProd.OrderSkus.splice(delSku, 1);
                if (oProd.OrderSkus.length === 0) delProd = i;
                break;
              }
            } else delProd = i;
          }
        }
        if (delProd !== -1) {
          if (state.curCart.OrderProds[delProd].is_simple) {
            state.curCart.totPrice -= state.curCart.OrderProds[delProd].price;
            state.curCart.totItem -= 1;
          }
          state.curCart.OrderProds.splice(delProd, 1);
        }
        //update carts or del cart from cart
        // if (type !== 1)
        //   for (let i = 0; i < state.carts.length; i++) {
        //     const cart = state.carts[i];
        //     if (cart.cartId === state.curCart.cartId) {
        //       // if (cart.OrderProds.length === 0) {
        //       //   state.curCart = {};
        //       //   delCart = i;
        //       // } else {
        //       state.carts[i] = state.curCart;
        //       // }
        //       break;
        //     }
        //   }
        // if (delCart !== -1) {
        //   state.carts.splice(delCart, 1);
        // }
      } catch (err) {
        console.log(err);
      }
    },
    // cartSkuPricePut: (state, action) => {},
  },
  extraReducers: {
    [fetchCartOrderPost.pending]: (state) => {
      state.cartPostStatus = "loaing";
    },
    [fetchCartOrderPost.fulfilled]: (state, action) => {
      state.cartPostStatus = "succeed";
      const newOrder = action.payload;
      state.postedOrder = newOrder;
    },
    [fetchCartOrderPost.rejected]: (state, action) => {
      state.cartPostStatus = "error";
      state.error = action.payload;
    },
    [fetchPaymentMethods.pending]: (state) => {
      state.cartPostStatus = "loaing";
    },
    [fetchPaymentMethods.fulfilled]: (state, action) => {
      state.cartPostStatus = "succeed";
      const methods = action.payload;
      const byId = {},
        allIds = [];
      methods?.forEach((method) => {
        byId[method.code] = {
          ...method,
          field: method.code,
          label: method.code,
        };
        if (method.is_cash) allIds.unshift(method.code);
        else allIds.push(method.code);
        return;
      });
      state.paymentMethods = {
        byId,
        allIds,
      };
      state.initialPaymentMethods = {
        byId,
        allIds,
      };
      resetPaymentMethods(state);
    },
    [fetchPaymentMethods.rejected]: (state, action) => {
      state.cartPostStatus = "error";
      state.error = action.payload;
    },
  },
});

//selectors
export const selectProdQuantity = (prodId) => (state) => {
  try {
    const prods = state.cart.curCart.OrderProds;
    // console.log(prods);
    if (prods && prods.length > 0) {
      const prod = prods.find((op) => op.Prod === prodId);
      // console.log(prod);
      return prod ? prod.quantity : 0;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

export const selectSkuQuantity = (prodId, skuId) => (state) => {
  try {
    const oProds = state.cart.curCart.OrderProds;
    // console.log(oProds);
    if (!oProds || oProds.length === 0) return 0;
    const oProd = oProds?.find((op) => op.Prod === prodId);
    // console.log(oProd);
    if (!oProd || !oProd.OrderSkus || oProd.OrderSkus.length === 0) return 0;
    const oSku = oProd.OrderSkus?.find((os) => os.Sku === skuId);
    // console.log(oSku);
    if (!oSku) return 0;
    else return oSku.quantity;
  } catch (err) {
    console.log(err);
  }
};

export const {
  cartItemPost,
  cartItemPut,
  cartItemDelete,
  initCart,
  cartClientPost,
  togglePaymentMethod,
  toggleEnableMultiPayment,
  resetPayment,
  updatePaymentMethodPrice,
  setCurModifyMethod,
  modifyCheck,
  openMultiSkuModal,
  resetError,
} = cartSlice.actions;
export default cartSlice.reducer;
