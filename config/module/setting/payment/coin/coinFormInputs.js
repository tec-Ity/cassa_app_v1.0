const coinFormInputs = [
  ///////code
  {
    formProps: { gridSize: 6 },
    general: {
      field: "code",
      rules: {
        required: true,
        // length: { min: 2, max:3 },
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
      field: "nome",
      rules: {
        required: true,
        // length: { min: 2, max:3 },
        type: "string",
      },
      msg: {},
      label: "Name",
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
      field: "rate",
      rules: {
        required: true,
        // length: { min: 2, max:3 },
        type: "string",
      },
      msg: {},
      label: "Rate",
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
      field: "symbol",
      rules: {
        required: true,
        length: { min: 1, max: 1 },
        type: "string",
      },
      msg: {},
      label: "Symbol",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
      placeholder: "€/¥/$/...",
    },
  },
  {
    formProps: { gridSize: 6 },
    general: {
      field: "sort",
      rules: {},
      msg: {},
      label: "Sort",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
      placeholder: "0 ~ 999",
    },
  },
];

export default coinFormInputs;
