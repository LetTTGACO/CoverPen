"use client";
import { Button, Card, CardBody, Input, Select, SelectItem, Slider } from "@nextui-org/react";
import useFormStore from "@/hooks/useFormStore";
import { useEffect, useRef, useState } from "react";

const devIconsUrl = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json";

const fontOptions = ["font-serif", "font-sans", "font-mono", "font-Inter", "font-Poppins", "font-Anek"];

const aspectRatio = [
  { label: "16:9", desc: "16:9", value: "16/9" },
  { label: "9:16", desc: "9:16", value: "9/16" },
  { label: "1:1", desc: "1:1", value: "1/1" },
  { label: "2:1", desc: "2:1", value: "2/1" },
  { label: "4:5", desc: "4:5", value: "4/5" },
  { label: "2.35:1", desc: "微信公众号—图文封面", value: "2.35/1" },
];

export default function FormCard() {
  const [iconOptions, setIconOptions] = useState([]);
  useEffect(() => {
    fetch(devIconsUrl)
      .then((r) => r.json())
      .then((data) => {
        data.push({ name: "custom" });
        setIconOptions(data.map((item: any) => ({ label: item.name, value: item.name })));
      });
  }, []);
  const setState = useFormStore.setState;
  const formValue = useFormStore();

  const onChange = (val: string, key: string) => {
    console.log("onchange", val, key);
    setState((state) => {
      return {
        ...state,
        [key]: val,
        customIcon: key === "icon" ? "" : state.customIcon,
      };
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // Trigger the input file click event
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: any) => {
    setState((state) => {
      return {
        ...state,
        icon: "",
        customIcon: URL.createObjectURL(e.target.files[0]),
      };
    });
  };

  return (
    <div className="p-4">
      <div>
        <Select
          // labelPlacement="outside"
          items={aspectRatio}
          onChange={(e) => onChange(e.target.value, e.target.name)}
          name="aspectRatio"
          value={formValue.aspectRatio}
          defaultSelectedKeys={[formValue.aspectRatio || ""]}
          label="比例"
          placeholder="请选择比例"
          className="mb-6"
        >
          {(aspectRatio) => (
            <SelectItem key={aspectRatio.value} textValue={aspectRatio.label}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{aspectRatio.desc}</span>
                  <span className="text-tiny text-default-400">{aspectRatio.label}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <Input
          value={formValue.title}
          className="mb-6"
          name="title"
          label="标题"
          placeholder="请输入标题"
          onChange={(e) => onChange(e.target.value, e.target.name)}
        />

        <Input
          value={formValue.author}
          className="mb-6"
          name="author"
          label="作者"
          placeholder="请填写作者"
          onChange={(e) => onChange(e.target.value, e.target.name)}
        />
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
        <Slider
          // @ts-ignore
          onChange={(value) => onChange(value, "borderRadius")}
          name="borderRadius"
          className="mb-6"
          label="圆角"
          step={1}
          maxValue={100}
          minValue={0}
          defaultValue={10}
        />
        <Slider
          // @ts-ignore
          onChange={(value) => onChange(value, "width")}
          name="width"
          className="mb-6"
          label="宽度"
          step={1}
          maxValue={1000}
          minValue={400}
          value={Number(formValue.width) || 0}
        />
        <div className="flex items-center">
          <Select
            items={iconOptions}
            onSelectionChange={(e) => {
              // @ts-ignore
              onChange(e.currentKey, "icon");
            }}
            name="icon"
            value={formValue.icon}
            defaultSelectedKeys={[formValue.icon || ""]}
            label="图标"
            placeholder="请选择图标"
            className="mb-6 w-2/3"
          >
            {(icon: any) => (
              <SelectItem key={icon.value} textValue={icon.value}>
                <div className="flex">
                  <span className="mr-2">{icon.value}</span>
                  <div className="ml-auto mr-2">
                    <i className={`devicon-${icon.value}-plain dev-icon text-2xl`}></i>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          {/*<Button size="lg" className="mb-6 ml-6">*/}
          {/*  上传*/}
          {/*</Button>*/}
          <Button startContent={123} size="lg" className="mb-6 ml-6" onClick={onButtonClick}>
            上传
            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
          </Button>
        </div>
      </div>
    </div>
  );
}
