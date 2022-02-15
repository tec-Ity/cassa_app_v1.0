import { fetchObjs } from "../coin/coinConf";
const paidTypeFormInputs = [
  ///////code
  {
    formProps: { gridSize: 6 },
    general: {
      field: "code",
      rules: {
        required: true,
        // length: { min: 4, max: 16 },
        type: "string",
      },
      msg: {},
      label: "Code",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  {
    formProps: { gridSize: 6 },
    general: {
      field: "Coin",
      subField: "_id",
      rules: {
        required: true,
        // length: { min: 4, max: 16 },
      },
      msg: {},
      label: "Currency",
    },
    itemProps: {
      itemType: "autoComplete",
      fetchObjs,
      optionLabel: "code",
      optionValue: "_id",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  {
    formProps: { gridSize: 6 },
    general: {
      field: "is_cash",
      rules: {
        // required: true,
      },
      msg: {},
      label: "Cash",
    },
    itemProps: {
      itemType: "checkBox",
      disabled: false,
      sx: { width: "100%" },
    },
  },
];

export default paidTypeFormInputs;
