const frontNav = {
  base: "/F",
  defaultLink: "/cart",
  links: [
    {
      to: "cart",
      label: "cart",
      role: ["worker", "boss"],
    },
    {
      to: "orders",
      label: "order",
      role: ["worker", "boss"],
    },

    {
      to: "clients",
      label: "client",
      role: ["worker", "boss"],
    },
    {
      to: "settings",
      label: "settings",
      role: ["boss"],
    },
  ],
};
const backNav = {
  base: "/B",
  defaultLink: "/dashboard",
  links: [
    {
      to: "dashboard",
      label: "主页",
      role: ["worker", "boss"],
    },
    {
      to: "purchase",
      label: "采购",
      role: ["worker", "boss"],
    },
    {
      to: "prods",
      label: "商品",
      role: ["boss"],
    },

    {
      to: "orders",
      label: "订单",
      role: ["boss"],
    },
    {
      to: "purOrders",
      label: "采购单",
      role: ["worker", "boss"],
    },
    {
      to: "clients",
      label: "会员",
      role: ["boss"],
    },

    {
      to: "users",
      label: "用户",
      role: ["boss"],
    },
    {
      to: "shops",
      label: "门店",
      role: ["boss"],
    },
    {
      to: "suppliers",
      label: "供应商",
      role: ["boss"],
    },
    {
      to: "settings",
      label: "设置",
      role: ["boss"],
    },
  ],
};

const loginNav = {
  to: "login",
  label: "Log In",
  role: ["boss", "worker"],
};

const logoutNav = {
  to: "logout",
  label: "Log Out",
  role: ["boss", "worker"],
};

const navigations = { backNav, frontNav };

export { loginNav, logoutNav };

export default navigations;
