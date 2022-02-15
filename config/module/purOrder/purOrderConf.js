const populateObjs = [
  { path: "Client", select: "nome code" },
  {
    path: "OrderProds",
    select: "Prod OrderSkus price_sale quantity is_simple",
    populate: [
      { path: "OrderSkus", select: "Sku price_sale quantity" },
      { path: "Prod", select: "code nome" },
    ],
  },
];

const purOrderConf = {
  fetchObj: {
    flag: "purOrder",
    api: "/order",
    parentFlag: "purOrders",
    query: { populateObjs, type_Order: 1 },
  },
  fetchObjs: {
    flag: "purOrder",
    api: "/orders",
    query: { populateObjs, type_Order: 1 },
  },
};

export { populateObjs };
export const { fetchObj, fetchObjs } = purOrderConf;
export default purOrderConf;
