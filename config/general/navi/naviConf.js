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
      label: "dashboard",
      role: ["worker", "boss"],
    },
    {
      to: "purchase",
      label: "purchase",
      role: ["worker", "boss"],
    },
    {
      to: "prods",
      label: "prod list",
      role: ["boss"],
    },

    {
      to: "orders",
      label: "order",
      role: ["boss"],
    },
    {
      to: "purOrders",
      label: "purchase orders",
      role: ["worker", "boss"],
    },
    {
      to: "clients",
      label: "client",
      role: ["boss"],
    },

    {
      to: "users",
      label: "user list",
      role: ["boss"],
    },
    {
      to: "shops",
      label: "shop list",
      role: ["boss"],
    },
    {
      to: "suppliers",
      label: "supplier list",
      role: ["boss"],
    },
    {
      to: "settings",
      label: "settings",
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
