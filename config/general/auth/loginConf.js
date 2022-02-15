const loginFormProps = [
  ///////code/username
  {
    formProps: { gridSize: 12 },
    general: {
      field: "code",
      rules: {
        required: true,
        length: { min: 4, max: 16 },
        type: "string",
      },
      msg: {},
    },
    itemProps: {
      label: "username",
      itemType: "input",
      type: "text",
      placeholder: "email/phone/code",
      disabled: false,
      sx: { width: "100%" },
    },
  },
  ///////code
  {
    formProps: { gridSize: 12 },
    general: {
      field: "pwd",
      rules: {
        required: true,
        length: { min: 4, max: 16 },
        type: "string",
      },
      msg: {},
    },
    itemProps: {
      label: "password",
      itemType: "input",
      type: "pwd",
      disabled: false,
      sx: { width: "100%" },
    },
  },
];

export default loginFormProps;
