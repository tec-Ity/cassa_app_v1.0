import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios_Prom, fetch_Prom } from "../api/api";
import { clearAllData, getData, storeData } from "./AsyncStorage";
const initialState = {
  isLogin: false,
  loginStatus: "idle",
  logoutStatus: "idle",
  getLoginStatus: "idle",
  errMsg: "",
  showLoginModal: false,
  userInfo: {},
};

export const getLoginStatusFromStorage = createAsyncThunk(
  "auth/getLoginStatusFromStorage",
  async (foo = true) => {
    const accessToken = await getData("accessToken");
    // console.log(accessToken);
    if (accessToken) return true;
    else return false;
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (system, { getState, rejectWithValue }) => {
    const loginRes = await axios_Prom("/login", "POST", { system });
    if (loginRes.status === 200) {
      await storeData("refreshToken", loginRes.data.refreshToken);
      await storeData("accessToken", loginRes.data.accessToken);
      return {
        userInfo: loginRes.data.payload,
      };
    } else {
      //   alert("faild to post objects", loginRes.message);
      return rejectWithValue(loginRes.status);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (foo = 1, { getState, rejectWithValue }) => {
    try {
      await clearAllData();
      return true;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

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
    [getLoginStatusFromStorage.pending]: (state) => {
      state.getLoginStatus = "loading";
    },
    [getLoginStatusFromStorage.fulfilled]: (state, action) => {
      state.getLoginStatus = "succeed";
      state.isLogin = action.payload;
      // state.isLogin = true;
    },
    [getLoginStatusFromStorage.rejected]: (state, action) => {
      state.getLoginStatus = "error";
      state.errMsg = action.payload;
    },
    [fetchLogout.pending]: (state) => {
      state.logoutStatus = "loading";
    },
    [fetchLogout.fulfilled]: (state, action) => {
      state.logoutStatus = "succeed";
      state.userinfo = {};
      state.isLogin = false;
    },
    [fetchLogout.rejected]: (state, action) => {
      state.logoutStatus = "error";
      state.errMsg = action.error.message;
    },
  },
});

export default authSlice.reducer;
