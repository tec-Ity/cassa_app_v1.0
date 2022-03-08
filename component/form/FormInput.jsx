import React, { useState, useEffect, useCallback } from "react";
import { Input } from "react-native-elements";
export default function FormInput({
  type = "text",
  rules,
  formWarning = "",
  ...rest
}) {
  //component sel
  const inputs = {
    text: TextInput,
    // pwd: PasswordInput,
    phone: PhoneInput,
    // account: AccountInput,
    price: PriceInput,
    // select: SelectInput,
  };
  const Input = inputs[type];

  const [warningMsg, setWarningMsg] = useState("");

  const fieldCheck = useCallback(
    (value) => (e) => {
      let msgSet = false;
      if (rules && rules.length > 0)
        for (const key in rules) {
          if (Object.hasOwnProperty.call(rules, key)) {
            const rule = rules[key];
            switch (key) {
              case "required":
                if (rule === true && !value) {
                  setWarningMsg("Required!");
                  msgSet = true;
                }
                break;
              case "length":
                if (rule.min && rule.max) {
                  if (!(value.length >= rule.min && value.length <= rule.max)) {
                    setWarningMsg(
                      `Length must be ${rule.min} to ${rule.max} long!`
                    );
                    msgSet = true;
                  }
                } else if (rule.min) {
                  //////
                }
                break;
              case "type":
                ///
                break;
              default:
                break;
            }
            if (msgSet) break; //break for loop for rules after matching on rule
          }
        }
      //clear warning after next submit
      if (!msgSet) setWarningMsg(null);
    },
    [rules]
  );

  return (
    <Input
      {...rest}
      required={rules?.required}
      fieldCheck={fieldCheck}
      warningMsg={formWarning || warningMsg}
    />
  );
}

const TextInput = ({
  label,
  value,
  required,
  disabled,
  handleChange,
  warningMsg,
  fieldCheck,
  placeholder,
  startAdornment,
  endAdornment,
  sx,
  ...rest
}) => {
  // console.log(value);
  return (
    <Input
      disabled={disabled}
      label={label}
      value={value}
      errorMessage={warningMsg}
      placeholder={placeholder}
      onChangeText={(value) => handleChange(value)}
      onBlur={fieldCheck(value)}
      // {...rest}
    />
  );
};

function PasswordInput({
  label,
  value,
  required,
  handleChange,
  warningMsg,
  placeholder,
  fieldCheck,
  sx,
  ...rest
}) {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <Input
      label={label}
      value={value}
      errorMessage={warningMsg}
      placeholder={placeholder}
      onChangeText={(value) => handleChange(value)}
      onBlur={fieldCheck(value)}
      type={showPwd ? "text" : "password"}
      {...rest}
    />
  );
}

function PhoneInput({
  label,
  value,
  required,
  handleChange,
  warningMsg,
  placeholder,
  fieldCheck,
  sx,
  ...rest
}) {
  const [phonePre, setPhonePre] = useState(39);

  const phoneNum = value.phoneNum ?? value;

  return (
    <Input
      label={label}
      value={phoneNum}
      errorMessage={warningMsg}
      placeholder={placeholder}
      onChange={(e) => handleChange({ phonePre, phoneNum: e.target.value })}
      onBlur={fieldCheck(value)}
      {...rest}
    />
  );
}

function PriceInput({
  label,
  value,
  required,
  handleChange,
  warningMsg,
  fieldCheck,
  placeholder,
  sx,
  ...rest
}) {
  const [selfWarning, setSelfWarning] = useState(null);

  const onChange = useCallback((e) => {
    if (isNaN(e.target.value?.replace(/[,.]/, ""))) {
      setSelfWarning("Must be a number or ',' or '.'!");
    } else {
      setSelfWarning(null);
      handleChange(e.target.value);
    }
  }, []);

  const convertValue = useCallback((value) => {
    if (typeof value === "number") {
      return parseFloat(value)?.toFixed(2)?.replace(".", ",");
    } else if (value) return value;
  }, []);
  // useEffect(() => {});
  return (
    <Input
      label={label}
      value={convertValue(value)}
      error={Boolean(selfWarning || warningMsg)}
      helperText={selfWarning || warningMsg}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={fieldCheck(value)}
      {...rest}
    />
  );
}

function SelectInput({
  label,
  value,
  required,
  disabled,
  handleChange,
  warningMsg,
  fieldCheck,
  placeholder,
  options,
  sx,
  ...rest
}) {
  return (
    <Input
      select
      disabled={disabled}
      label={label}
      value={value}
      errorMessage={warningMsg}
      placeholder={placeholder}
      onChangeText={(value) => handleChange(value)}
      onBlur={fieldCheck(value)}
      {...rest}
      InputProps={{
        sx: { "&::after": { borderColor: "custom.secondaryMid" } },
      }}
    >
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Input>
  );
}
export { TextInput };
