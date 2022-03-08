import userConf from "./userConf";
const userFormInputs = [
  ///////code
  {
    formProps: { gridSize: 6 },
    general: {
      field: "code",
      rules: {
        required: true,
        length: { min: 4, max: 16 },
        type: "string",
      },
      msg: {},
      label: "code",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  /////////name
  {
    formProps: { gridSize: 6 },
    general: {
      field: "nome",
      rules: {
        required: true,
        length: { min: 4, max: 16 },
        type: "string",
      },
      label: "nome",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  /////////pwd
  {
    formProps: { gridSize: 6 },
    general: {
      field: "pwd",
      rules: {
        required: true,
        length: { min: 4, max: 16 },
        type: "string",
      },
      label: "pwd",
    },
    itemProps: {
      itemType: "input",
      type: "pwd",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  /////////role
  {
    formProps: { gridSize: 6 },
    general: {
      field: "role",
      rules: {
        required: true,
        // length: { min: 4, max: 16 },
        type: "string",
      },
      label: "role",
    },
    itemProps: {
      itemType: "input",
      type: "select",
      disabled: false,
      sx: { width: "100%" },
      options: Object.keys(userConf.role).map((key) => ({
        value: key,
        label: userConf.role[key],
      })),
    },
  },
  /////////shop
  {
    formProps: {
      gridSize: 6,
      isShow: (props) => (props.role > 100 ? true : false),
    },
    general: {
      field: "Shop",
      rules: {
        required: false,
        // length: { min: 4, max: 16 },
        type: "string",
      },
      label: "shop",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
];

const userFormImg = {
  type: "image",
  hidden: false,
  disabled: false,
  accept: "image/*",
  multiple: true,
  message: "onlyImage",
};
export default userFormInputs;
export { userFormImg };
