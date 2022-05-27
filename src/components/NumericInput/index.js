import { useState } from "react";
import PropTypes from "prop-types";

import { Input } from "antd";

const NumericInput = ({ onChange, ...props }) => {
  const [value, setValue] = useState();

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^(0|[1-9]+[0-9]*)$/;

    if (inputValue === "" || reg.test(inputValue)) {
      setValue(inputValue);
      if (onChange) {
        onChange(inputValue);
      }
    }
  };

  return (
    <Input value={value} onChange={handleChange} maxLength={16} {...props} />
  );
};

NumericInput.propTypes = {
  onChange: PropTypes.func,
};

export default NumericInput;
