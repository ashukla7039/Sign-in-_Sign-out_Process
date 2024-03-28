/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { TextInput } from "react-native";

const CustomTextInput = ({
  label,
  name,
  required,
  disabled,
  regex,
  onLoginTextInputChange,
  placeholder,
  value,
}) => {
  const handleChange = () => {
    if (onLoginTextInputChange) {
      onLoginTextInputChange(text);
    }

    helpers.setTouched(true);
    const filteredValue = text.replace(regex, "");

    helpers.setValue(filteredValue);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      editable={!disabled}
      onBlur={handleBlur}
      onChangeText={handleChange}
    />
  );
};

export default CustomTextInput;
