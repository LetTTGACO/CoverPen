import React, { useEffect, useState } from "react";
import type { InputNumberProps, SliderSingleProps } from "antd";
import { Col, InputNumber, Row, Slider, Space } from "antd";

interface SliderInputProps extends SliderSingleProps {
  value?: number;
  onChange?: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ value, onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState<number>(value || 0);

  const handleChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(newValue as number);
    onChange?.(newValue as number);
  };

  useEffect(() => {
    setInputValue(value || 0);
  }, [value]);
  return (
    <Row>
      <Col span={18}>
        <Slider
          {...rest}
          onChange={handleChange}
          value={inputValue}
        />
      </Col>
      <Col span={6}>
        <InputNumber min={rest.min} max={rest.max} step={rest.step as number} className="mx-4" value={inputValue} onChange={handleChange} />
      </Col>
    </Row>
  );
};

export default SliderInput;
