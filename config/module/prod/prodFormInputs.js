const prodFormInputs = [
  ///////code
  {
    formProps: { gridSize: 6 },
    general: {
      field: "code",
      rules: {
        required: true,
        length: { min: 3, max: 16 },
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
        length: { min: 2, max: 16 },
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
  /////////nameCN
  {
    formProps: { gridSize: 6 },
    general: {
      field: "nomeCN",
      rules: {
        required: true,
        length: { min: 2, max: 16 },
        type: "string",
      },
      label: "nomeCN",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  //////////price sale
  {
    formProps: { gridSize: 6 },
    general: {
      field: "price_sale",
      rules: {
        required: true,
        type: "float",
      },
      label: "price_sale",
    },
    itemProps: {
      itemType: "input",
      type: "price",
      sx: { width: "100%" },
      disabled: false,
    },
  },
  /////////price unit
  {
    formProps: { gridSize: 6 },
    general: {
      field: "price_regular",
      rules: {
        required: true,
        type: "float",
      },
      label: "price_regular",
    },
    itemProps: {
      itemType: "input",
      type: "price",
      sx: { width: "100%" },
      disabled: false,
    },
  },
  /////////price cost
  {
    formProps: { gridSize: 6 },
    general: {
      field: "price_cost",
      rules: {
        required: false,
        type: "float",
      },
      label: "price_cost",
    },
    itemProps: {
      itemType: "input",
      type: "price",
      sx: { width: "100%" },
      disabled: false,
    },
  },
  /////////unit
  {
    formProps: { gridSize: 6 },
    general: {
      field: "unit",
      rules: {
        required: true,
        type: "string",
      },
      label: "unit",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  /////////weight
  {
    formProps: { gridSize: 6 },
    general: {
      field: "weight",
      rules: {
        required: true,
        type: "float",
      },
      label: "weight",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
      endAdornment: "KG",
    },
  },
  //////////categ
  //   {
  //     formProps: { gridSize: 6 },
  //     general: {
  //       field: "categ",
  //       rules: {
  //         required: false,
  //         type: "id",
  //       },
  //       label: "Category",
  //     },
  //     itemProps: {
  //       itemType: "input",
  //       //   flagSlice: "categ",
  //       type: "text",
  //       sx: { width: "100%" },
  //       disabled: false,
  //     },
  //   },
  //   //////////brand
  //   {
  //     formProps: { gridSize: 6 },
  //     general: {
  //       field: "brand",
  //       rules: {
  //         required: false,
  //         type: "id",
  //       },
  //       label: "Brand",
  //     },
  //     itemProps: {
  //       itemType: "input",
  //       //   flagSlice: "brand",
  //       type: "text",
  //       sx: { width: "100%" },
  //       disabled: false,
  //     },
  //   },
  //   //////////shop
  //   {
  //     formProps: { gridSize: 6 },
  //     general: {
  //       field: "Shop",
  //       rules: {
  //         required: false,
  //         type: "id",
  //       },
  //       label: "Shop",
  //     },
  //     itemProps: {
  //       itemType: "input",
  //       //   flagSlice: "brand",
  //       type: "text",
  //       sx: { width: "100%" },
  //       disabled: false,
  //     },
  //   },
];

const prodFormImg = {
  type: "image",
  hidden: false,
  disabled: false,
  accept: "image/*",
  multiple: true,
  message: "onlyImage",
};
export default prodFormInputs;
export { prodFormImg };
