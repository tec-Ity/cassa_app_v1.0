const populateObjs = [
  { path: "Attrs", select: "nome options" },
  { path: "Skus", select: "attrs price_regular price_sale" },
];

const supConf = {
  fetchObj: {
    flag: "sup",
    api: "/shop",
    parentFlag: "sups",
    query: { populateObjs, Firm: "Supplier" },
  },
  fetchObjs: {
    flag: "sups",
    api: "/shops",
    query: { populateObjs, Firm: "Supplier" },
  },
};

export { populateObjs };
export const { fetchObj, fetchObjs } = supConf;
export default supConf;
