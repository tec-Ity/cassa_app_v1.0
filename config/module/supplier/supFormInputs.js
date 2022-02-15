const supFormInputs = [
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
      label: "Code",
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
      label: "Name",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  /////////Cita
  {
    formProps: { gridSize: 6 },
    general: {
      field: "Cita",
      rules: {
        required: true,
        // length: { min: 4, max: 16 },
        type: "string",
      },
      label: "City",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  {
    formProps: { gridSize: 6, hidden: true },
    general: {
      field: "Firm",
      rules: {},
      msg: {},
      label: "Firm",
    },
    itemProps: {
      itemType: "input",
      type: "text",
      disabled: false,
      sx: { width: "100%" },
    },
  },
];

const supFormImg = {
  type: "image",
  hidden: false,
  disabled: false,
  accept: "image/*",
  multiple: true,
  message: "Only images will be accepted",
};
export default supFormInputs;
export { supFormImg };
