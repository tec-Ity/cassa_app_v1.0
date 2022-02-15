const populateObjs = [
  { path: "Attrs", select: "nome options" },
  { path: "Skus", select: "attrs price_regular price_sale" },
];

const prodConf = {
  fetchObj: {
    flag: "prod",
    api: "/prod",
    parentFlag: "prods",
    query: { populateObjs },
  },
  fetchObjs: {
    flag: "prods",
    api: "/prods",
    query: { populateObjs },
  },
};

export { populateObjs };
export const { fetchObj, fetchObjs } = prodConf;
export default prodConf;
