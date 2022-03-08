import React, { useState, useCallback, useEffect, useMemo } from "react";

// import FormUpload from "./FormUpload.jsx";
//component
import FormItem from "./FormItem";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-elements";

export default function CusForm({
  handleSubmit,
  handleCancel,
  formInputs,
  submitStatus,
  fileInput,
  defaultValue = {}, //obj
}) {
  const { t } = useTranslation();
  //state
  const [formValue, setFormValue] = useState({}); //to slice
  //   const [formWarning, setFormWarning] = useState({});
  const [showFormAlert, setShowFormAlert] = useState(false);
  const [formAlertMsg, setFormAlertMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //func
  const handleChange = useCallback(
    (field) => (val) => {
      setFormValue((prev) => ({
        ...prev,
        [field]: val,
      }));
    },
    []
  );

  function handleSubmitSelf(e) {
    e.preventDefault();
    const checkResult = formCheck(formInputs, formValue);
    const { allowSubmit, alertMsg, updateFormValue } = checkResult;
    if (allowSubmit === false) {
      setShowFormAlert(true);
      setFormAlertMsg(alertMsg || "Form Validation Error, please try again.");
    }
    if (allowSubmit === true) {
      handleSubmit({ ...formValue, ...updateFormValue });
      setSubmitted(true);
    }
  }

  function handleCancelSelf() {
    setFormValue({});
    handleCancel && handleCancel();
  }

  function formCheck(formObjs, formValue) {
    try {
      let allowSubmit = true;
      let alertMsg = "";
      let updateFormValue = {};
      const setAlert = (msg) => {
        if (msg) {
          allowSubmit = false;
          alertMsg += msg + " ";
        }
      };

      formObjs.forEach((item) => {
        const { rules, field, label } = item.general;
        if (rules && Object.keys(rules).length !== 0) {
          let msgSet = false;
          const value = formValue[field];
          //check each rule for one filed
          for (const key in rules) {
            if (Object.hasOwnProperty.call(rules, key)) {
              const rule = rules[key];
              switch (key) {
                case "required":
                  if (rule === true && !value) {
                    setAlert(label);
                    msgSet = true;
                  }
                  break;
                case value && "length":
                  if (rule.min && rule.max) {
                    if (
                      !(value.length >= rule.min && value.length <= rule.max)
                    ) {
                      setAlert(label);
                      msgSet = true;
                    }
                  } else if (rule.min) {
                    //////
                  }
                  break;
                case value && "type":
                  if (rule === "float") {
                    let pattern = /\d*[,.]\d{0,2}|\d*/;
                    const res = pattern.test(value);
                    if (res) {
                      const newFloat = isNaN(value)
                        ? parseFloat(value.replace(",", "."))
                        : parseFloat(value);
                      updateFormValue[field] = newFloat;
                    } else {
                      setAlert(label);
                    }
                  }
                  break;
                default:
                  break;
              }
              if (msgSet) break; //break for loop for rules after matching on rule
            }
          }
          //clear warning after next submit
          if (!msgSet) setAlert(null);
        }
      });
      if (alertMsg) alertMsg += "Not Valid";
      return { allowSubmit, alertMsg, updateFormValue };
    } catch (err) {
      console.log(err);
    }
  }

  //   function typeCheck(rule){

  //   }
  //effect
  //init

  useEffect(() => {
    if (Object.keys(defaultValue).length > 0) setFormValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (submitted === true && submitStatus === "succeed") {
      setFormValue({});
      setSubmitted(false);
    }
  }, [submitStatus, submitted]);

  //memo
  //pure file component
  // const fileInputMemo = useMemo(
  //   () => <FormUpload {...fileInput} handleChange={handleChange("image")} />,
  //   [fileInput, handleChange]
  // );

  return (
    <View>
      <ScrollView style={{ height: 100 }}>
        {/* {fileInput && (
            <Grid item xs={12}>
              {fileInputMemo}
            </Grid>
          )} */}
        {formInputs?.map((inputProps) => {
          const { formProps, general, itemProps } = inputProps;
          const { field, subField, label, ...generalRest } = general;
          const { isShow } = formProps;
          if (!isShow || isShow(formValue)) {
            let value;
            if (field && formValue[field]) {
              if (subField && typeof formValue[field] === "object")
                value = formValue[field][subField];
              else value = formValue[field];
            } else value = "";
            return (
              <View key={field}>
                <FormItem
                  label={t(`formField.${label}`)}
                  {...itemProps}
                  {...generalRest}
                  value={value}
                  handleChange={handleChange(field)}
                />
              </View>
            );
          } else return <></>;
        })}
        <View>
          <Button type="clear" title="cancel" onPress={handleCancelSelf} />
          <Button title="submit" onPress={handleSubmitSelf} />
        </View>
      </ScrollView>
      {/* <CusModal
        open={showFormAlert}
        onClose={() => setShowFormAlert(false)}
        hideBackdrop
      >
        <Box>
          <Typography>{formAlertMsg}</Typography>
          <Button onPress={() => setShowFormAlert(false)}>OK</Button>
        </Box>
      </CusModal> */}
    </View>
  );
}
