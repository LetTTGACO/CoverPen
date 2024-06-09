import React, { useEffect, useState } from "react";
import type { InputNumberProps, SliderSingleProps } from "antd";
import { InputNumber, Slider } from "antd";

interface SliderInputProps extends SliderSingleProps {
  value?: number;
  onChange?: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ value, onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState<number>(Number(value) || 0);

  const handleChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(newValue as number);
    onChange?.(newValue as number);
  };
  useEffect(() => {
    setInputValue(Number(value) || 0);
  }, [value]);
  return (
    <div className="flex items-center justify-between">
      <Slider {...rest} onChange={handleChange} value={inputValue} className="w-full mr-4" />
      <InputNumber
        min={rest.min}
        max={rest.max}
        step={rest.step as number}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SliderInput;
