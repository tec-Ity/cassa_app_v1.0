import moment from "moment";

const populateObjs = [
  { path: "Client", select: "nome code" },
  {
    path: "OrderProds",
    select:
      "Prod OrderSkus nome price_sale is_simple quantity price_regular price_sale price prod_quantity",
    populate: [
      {
        path: "OrderSkus",
        select: "Sku attrs price_sale quantity price_cost price",
      },
      { path: "Prod", select: "code nome is_simple img_urls" },
    ],
  },
];

const orderConf = {
  fetchObj: {
    flag: "order",
    api: "/order",
    parentFlag: "orders",
    query: { populateObjs },
  },
  fetchObjs: {
    flag: "orders",
    api: "/orders",
    query: {
      populateObjs,
      sortKey: "at_crt",
      sortVal: -1,
      upd_after: moment().format("MM/DD/YYYY"),
    },
  },
};

export { populateObjs };
export const { fetchObj, fetchObjs } = orderConf;
export default orderConf;
