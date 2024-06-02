"use client";
import { Card, CardBody, Input, Select, SelectItem } from "@nextui-org/react";
import useFormStore from "@/hooks/useFormStore";
const fontOptions = ["font-serif", "font-sans", "font-mono", "font-Inter", "font-Poppins", "font-Anek"];
export default function ThemeCard() {
  const setState = useFormStore.setState;
  const formValue = useFormStore();
  console.log(formValue);

  const onChange = (val: string, key: string) => {
    console.log(val, key);
    setState((state) => {
      return {
        ...state,
        [key]: val,
      };
    });
  };
  return (
    <Card>
      <CardBody className="w-full h-[400px]">
        <Select
          onChange={(e) => onChange(e.target.value, e.target.name)}
          name="font"
          value={formValue.font}
          defaultSelectedKeys={[formValue.font || ""]}
          label="字体"
          placeholder="请选择字体"
          className="mb-6"
        >
          {fontOptions.map((font) => (
            <SelectItem key={font}>{font}</SelectItem>
          ))}
        </Select>
      </CardBody>
    </Card>
  );
}
