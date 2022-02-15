import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios_Prom, fetch_Prom } from "../api/api";

const initialState = {
  isLogin: Boolean(AsyncStorage.getItem("accessToken")),
  loginStatus: "idle",
  logoutStatus: "idle",
  errMsg: "",
  showLoginModal: false,
  userInfo: {},
};

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (system, { getState, rejectWithValue }) => {
    const loginRes = await axios_Prom("/login", "POST", { system });
    console.log(loginRes);
    if (loginRes.status === 200) {
      AsyncStorage.setItem("refreshToken", loginRes.data.refreshToken);
      AsyncStorage.setItem("accessToken", loginRes.data.accessToken);
      return {
        userInfo: loginRes.data.payload,
      };
    } else {
      //   alert("faild to post objects", loginRes.message);
      return rejectWithValue(loginRes.status);
    }
  }
);

// export const fetchLogout = createAsyncThunk(
//   "auth/fetchLogout",
//   async (foo = 1, { getState, rejectWithValue }) => {
//     // const logoutRes = await fetch_Prom("/logout", "DELETE");
//     // console.log(logoutRes);
//     // if (logoutRes.status === 200) {
//     // AsyncStorage.removeItem("refreshToken");
//     // AsyncStorage.removeItem("accessToken");
//     AsyncStorage.clear();

//     return {};
//     // } else {
//     //   //   alert("faild to post objects", logoutRes.message);
//     //   return rejectWithValue(logoutRes.message);
//     // }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.loginStatus = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.loginStatus = "succeed";
      const { userInfo } = action.payload;
      state.showLoginModal = false;
      state.userinfo = userInfo;
      state.isLogin = true;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.loginStatus = "error";
      state.errMsg = action.payload;
    },
    // [fetchLogout.pending]: (state) => {
    //   state.logoutStatus = "loading";
    // },
    // [fetchLogout.fulfilled]: (state, action) => {
    //   state.logoutStatus = "succeed";
    //   state.userinfo = {};
    //   state.isLogin = false;
    // },
    // [fetchLogout.rejected]: (state, action) => {
    //   state.logoutStatus = "error";
    //   state.errMsg = action.error.message;
    // },
  },
});

export default authSlice.reducer;
