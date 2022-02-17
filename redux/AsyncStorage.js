import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    let val = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      // value previously stored
      return isJSON(value) ? JSON.parse(value) : value;
    } else return null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

function isJSON(value) {
  try {
    const jsonValue = JSON.parse(value);
    return typeof jsonValue === "object";
  } catch (e) {
    return false;
  }
}

export const mergeData = async (key, value) => {
  try {
    let val = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.mergeItem(key, val);
  } catch (e) {
    console.log(e);
  }
};

export const removeData = async (key) => {
  try {
    console.log("remove Item");
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log(e);
  }
};
