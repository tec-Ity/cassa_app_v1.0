import clientConf from "./clientConf";
const clientFormInputs = [
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
  // {
  //   formProps: { gridSize: 6 },
  //   general: {
  //     field: "pwd",
  //     rules: {
  //       required: true,
  //       length: { min: 4, max: 16 },
  //       type: "string",
  //     },
  //     label: "pwd",
  //   },
  //   itemProps: {
  //     itemType: "input",
  //     type: "pwd",
  //     disabled: false,
  //     sx: { width: "100%" },
  //   },
  // },
];

const clientFormImg = {
  type: "image",
  hidden: false,
  disabled: false,
  accept: "image/*",
  multiple: true,
  message: "onlyImage",
};

export default clientFormInputs;
export { clientFormImg };
