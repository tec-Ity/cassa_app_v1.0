import moment from "moment";

const populateObjs = [
  {
    path: "Order",
    select: "Client OrderProds order_imp",
    populate: [
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
    ],
  },
];

const orderProdConf = {
  fetchObjs: {
    flag: "orderProds",
    api: "/orderProds",
    query: {
      populateObjs,
    },
    searchParam: "Prod",
    subField: "Order",
  },
};

export { populateObjs };
export const { fetchObjs } = orderProdConf;
export default orderProdConf;
