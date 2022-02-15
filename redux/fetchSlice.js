import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { fetch_Prom, axios_Prom } from "../api/api";

const initialState = {
  getStatus: "idle",
  postStatus: "idle",
  putStatus: "idle",
  deleteStatus: "idle",
  errorMsg: "",
};

const useFormData = ["/prod"];

const genQuery = (queryFixedTemp, queryTemp) => {
  try {
    const queryFixed = queryFixedTemp && { ...queryFixedTemp };
    const query = queryTemp && { ...queryTemp };

    //clear duplicate fields in queryFixed
    if (queryFixed && query) {
      let qfKeys = [...Object.keys(queryFixed)];
      qfKeys.forEach((key) => {
        if (query[key]) delete queryFixed[key];
      });
    }

    let queryStr = "?";
    if (queryFixed)
      queryStr += Object.keys(queryFixed)
        .map(
          (key) =>
            `${key}=${
              typeof queryFixed[key] === "string"
                ? queryFixed[key]
                : JSON.stringify(queryFixed[key])
            }`
        )
        .join("&");

    if (query)
      queryStr +=
        "&" +
        Object.keys(query)
          .map(
            (key) =>
              `${key}=${
                typeof query[key] === "string"
                  ? query[key]
                  : JSON.stringify(query[key])
              }`
          )
          .join("&");

    return queryStr;
  } catch (err) {
    console.log(err);
  }
};

export const getObjects = createAsyncThunk(
  "fetch/getObjects",
  async ({ fetchObjs, isReload = true }, { getState, rejectWithValue }) => {
    try {
      const { api: apiBase, flag, query: queryFixed } = fetchObjs;
      const api = apiBase + genQuery(queryFixed, getState().fetch[flag]?.query);
      const res = await fetch_Prom(api);
      console.log("get", flag, api);
      console.log(res);
      if (res.status === 200) {
        return { flag, objects: res.data.objects };
      } else {
        //   alert("faild to load objects", res.message);
        return rejectWithValue(res.message);
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getObject = createAsyncThunk(
  "fetch/getObject",
  async ({ fetchObj, id }, { getState, rejectWithValue }) => {
    const { flag, api: apiBase, query: queryFixed } = fetchObj;
    let api = "";
    if (id) api = apiBase + "/" + id;
    api += genQuery(queryFixed, getState().fetch[flag]?.query);
    console.log("get", flag, api);
    const getRes = await fetch_Prom(api);
    console.log(getRes);
    if (getRes.status === 200) return { flag, object: getRes.data.object };
    else return rejectWithValue(getRes.message);
  }
);

export const postObject = createAsyncThunk(
  "fetch/postObject",
  async ({ fetchObj, data }, { getState, rejectWithValue }) => {
    try {
      const {
        flag,
        api: apiBase,
        parentFlag,
        query: queryFixed,
        asField,
      } = fetchObj;
      if (!apiBase || !data) rejectWithValue("No api or data");
      // let data;
      // if (useFormData.includes(apiBase)) data = formData;
      // else data = { obj };
      console.log(data);
      const api = apiBase + genQuery(queryFixed, getState().fetch[flag]?.query);
      console.log(api, data);
      const postRes = await axios_Prom(api, "POST", data);
      console.log(postRes);
      if (postRes.status === 200) {
        return { object: postRes.data.object, flag, parentFlag, asField };
      } else {
        //   alert("faild to post objects", postRes.message);
        return rejectWithValue(postRes.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const putObject = createAsyncThunk(
  "fetch/putObject",
  async ({ fetchObj, id, data }, { getState, rejectWithValue }) => {
    const { flag, api: apiBase, parentFlag, query: queryFixed } = fetchObj;
    let api = "";
    if (id) api = apiBase + "/" + id;
    api += genQuery(queryFixed, getState().fetch[flag]?.query);
    console.log(api, data);
    const putRes = await axios_Prom(api, "PUT", data);
    console.log(putRes);
    if (putRes.status === 200) {
      return { object: putRes.data.object, flag, parentFlag };
    } else {
      //   alert("faild to put objects", putRes.message);
      return rejectWithValue(putRes.message);
    }
  }
);

export const deleteObject = createAsyncThunk(
  "fetch/deleteObject",
  async ({ fetchObj, id }, { rejectWithValue }) => {
    const { flag, api: apiBase, parentFlag, asField } = fetchObj;
    const api = apiBase + "/" + id;
    console.log(api);
    const delRes = await fetch_Prom(api, "DELETE");
    console.log(delRes);
    console.log(id);
    if (delRes.status === 200) return { flag, parentFlag, id, asField };
    else return rejectWithValue(delRes.message);
  }
);

export const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      try {
        const {
          fetchObjs,
          fetchObj,
          query,
          isReload = false,
          isRemove = false,
        } = action.payload;
        if (isReload && isRemove) throw new Error("reload and remove conflict");
        if (Object.keys(query).length > 0) {
          const flagList = [];
          if (fetchObj?.flag) flagList.push(fetchObj.flag);
          if (fetchObjs?.flag) flagList.push(fetchObjs.flag);
          if (flagList.length === 0)
            throw new Error("No fetchObj or fetchObjs flag provided");

          flagList.forEach((flag) => {
            if (state[flag]) {
              if (state[flag].query) {
                if (isRemove) {
                  Object.keys(query).forEach(
                    (key) => delete state[flag].query[key]
                  );
                  return;
                } else if (!isReload) {
                  state[flag].query = { ...state[flag].query, ...query };
                  return;
                }
              }
              state[flag].query = query;
            } else if (!isRemove) {
              state[flag] = { query };
            } else throw new Error("No flag to remove query");
          });

          // if (fetchObjs)
          //   state[fetchObjs.flag]
          //     ? (state[fetchObjs.flag].query =
          //         state[fetchObjs.flag].query && !isReload
          //           ? { ...state[fetchObjs.flag].query, ...query }
          //           : query)
          //     : (state[fetchObjs.flag] = { query });
        } else throw new Error("No query");
      } catch (err) {
        console.log(err);
      }
    },
    clearFlagField: (state, action) => {
      try {
        const { flag, field } = action.payload;
        if (!flag) throw new Error("No Flag");
        if (!field) state[flag] = {};
        else if (state[flag]) state[flag][field] = null;
      } catch (err) {
        console.log(err);
      }
    },
  },
  extraReducers: {
    [getObjects.pending]: (state) => {
      state.getStatus = "loading";
    },
    [getObjects.fulfilled]: (state, action) => {
      const { flag, objects } = action.payload;
      state.getStatus = "succeed";
      if (!state[flag]) state[flag] = {};
      state[flag].objects = objects;
    },
    [getObjects.rejected]: (state, action) => {
      state.getStatus = "error";
      state.errMsg = action.error.message;
    },
    ////////////////////////////////
    [getObject.pending]: (state) => {
      state.getStatus = "loading";
    },
    [getObject.fulfilled]: (state, action) => {
      const { flag, object } = action.payload;
      state.getStatus = "succeed";
      if (!state[flag]) state[flag] = {};
      state[flag].object = object;
    },
    [getObject.rejected]: (state, action) => {
      state.getStatus = "error";
      state.errMsg = action.error.message;
    },
    ////////////////////////////////
    [postObject.pending]: (state) => {
      state.postStatus = "loading";
    },
    [postObject.fulfilled]: (state, action) => {
      const { flag, object, parentFlag, asField } = action.payload;
      state.postStatus = "succeed";
      if (!state[parentFlag]) {
        state[parentFlag] = {};
        state[parentFlag].objects = [];
      }

      if (asField) {
        state[parentFlag].object[asField].unshift(object);
      } else state[parentFlag].objects.unshift(object);
      if (!state[flag]) state[flag] = {};
      state[flag].object = object;
    },
    [postObject.rejected]: (state, action) => {
      state.postStatus = "error";
      state.errMsg = action.error.message;
    },
    ////////////////////////////////
    [putObject.pending]: (state) => {
      state.putStatus = "loading";
    },
    [putObject.fulfilled]: (state, action) => {
      const { object, flag, parentFlag } = action.payload;
      state.putStatus = "succeed";

      //update parent
      if (!state[parentFlag]) {
        state[parentFlag] = {};
        state[parentFlag].objects = [];
      }
      state[parentFlag].objects.forEach((obj) => {
        if (obj._id === object._id) {
          obj = object;
        }
      });
      //update self
      if (!state[flag]) state[flag] = {};
      state[flag].object = object;
    },
    [putObject.rejected]: (state, action) => {
      state.putStatus = "error";
      state.errMsg = action.error.message;
    },
    ////////////////////////////////
    [deleteObject.pending]: (state) => {
      state.deleteStatus = "loading";
    },
    [deleteObject.fulfilled]: (state, action) => {
      try {
        const { id, flag, parentFlag, asField } = action.payload;
        console.log(id, flag, parentFlag, asField);
        state.deleteStatus = "succeed";
        //delete from parent
        if (state[parentFlag]) {
          let objects;
          if (!asField && state[parentFlag]?.objects)
            objects = state[parentFlag].objects;
          else if (asField && state[parentFlag]?.object?.[asField])
            objects = state[parentFlag].object[asField];
          else throw new Error("param error");
          let i = 0;
          for (; i < objects.length; i++) {
            if (objects[i]._id === id) break;
          }
          //found and need to delete
          if (i < objects.length) {
            asField
              ? state[parentFlag].object[asField].splice(i, 1)
              : state[parentFlag].objects.splice(i, 1);
          }
        }
        //delete self
        if (state[flag] && state[flag].object) state[flag] = {};
        //   state[flag].object = object;
      } catch (err) {
        console.log(err);
      }
    },
    [deleteObject.rejected]: (state, action) => {
      state.deleteStatus = "error";
      state.errMsg = action.error.message;
    },
    ////////////////////////////////
  },
});

export const { setQuery, clearFlagField } = fetchSlice.actions;
export default fetchSlice.reducer;

export const selectObjects = (flag, subField) => (state) => {
  return state.fetch[flag]?.objects
    ? subField
      ? state.fetch[flag].objects?.map((obj) => obj[subField])
      : state.fetch[flag].objects
    : [];
};
export const selectObject = (flag) => (state) => {
  return state.fetch[flag]?.object ? state.fetch[flag].object : {};
};

export const selectQuery = (flag) => (state) => {
  return state.fetch[flag]?.query ? state.fetch[flag].query : null;
};
