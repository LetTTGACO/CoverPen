"use client";

import React, {FC, useEffect, useMemo, useState} from "react";
import { Button, ColorPicker, Input, type ColorPickerProps, List, Popover, Radio, theme, Upload } from "antd";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { InboxOutlined, PlusOutlined, ToolFilled } from "@ant-design/icons";
import Link from "next/link";
import useFormStore from "@/hooks/useFormStore";
const { Group: RadioGroup, Button: RadioButton } = Radio;
const { Dragger } = Upload;
const { TextArea } = Input;
type Presets = Required<ColorPickerProps>["presets"][number];

const bgOptions = [
  { label: "墙纸", value: "wallpaper" },
  { label: "渐变", value: "color" },
  { label: "导入", value: "custom" },
];
const data = [
  {
    label: "macos-big-sur",
    value: "macos-big-sur",
  },
  {
    label: "macos-big-sur-colorful",
    value: "macos-big-sur-colorful",
  },
  {
    label: "macos-big-sur-colorful-dark",
    value: "macos-big-sur-colorful-dark",
  },
  {
    label: "macos-big-sur-dark",
    value: "macos-big-sur-dark",
  },
  {
    label: "macos-monterey",
    value: "macos-monterey",
  },
  {
    label: "macos-monterey-dark",
    value: "macos-monterey-dark",
  },
  {
    label: "macos-sonoma",
    value: "macos-sonoma",
  },
  {
    label: "macos-sonoma-dark",
    value: "macos-sonoma-dark",
  },
  {
    label: "macos-ventura",
    value: "macos-ventura",
  },
  {
    label: "macos-ventura-dark",
    value: "macos-ventura-dark",
  },
];

const gradationData = [
  {
    label: "gradation-1",
    value: "linear-gradient(135deg, rgb(181, 21, 59) 0%, rgb(235, 194, 47) 100%)",
  },
  {
    label: "gradation-2",
    value: "linear-gradient(135deg, rgb(21, 126, 25) 0%, rgb(178, 202, 28) 100%)",
  },
  {
    label: "gradation-3",
    value: "linear-gradient(135deg, rgb(40, 68, 217) 0%, rgb(21, 212, 201) 100%)",
  },
  {
    label: "gradation-4",
    value:
      "linear-gradient(310deg, rgb(214, 233, 255), rgb(214, 229, 255), rgb(209, 214, 255), rgb(221, 209, 255), rgb(243, 209, 255), rgb(255, 204, 245), rgb(255, 204, 223), rgb(255, 200, 199), rgb(255, 216, 199), rgb(255, 221, 199))",
  },
  {
    label: "gradation-5",
    value: "linear-gradient(135deg, rgb(26, 41, 128) 0%, rgb(38, 208, 206) 100%)",
  },
  {
    label: "gradation-6",
    value: "linear-gradient(135deg, rgb(245, 175, 25) 0%, rgb(241, 39, 17) 100%)",
  },
  {
    label: "gradation-7",
    value: "linear-gradient(135deg, rgb(5, 117, 230) 0%, rgb(0, 242, 96) 100%)",
  },
  {
    label: "gradation-8",
    value: "linear-gradient(135deg, rgb(138, 35, 135) 0%, rgb(242, 113, 33) 100%)",
  },
  {
    label: "gradation-9",
    value: "linear-gradient(160deg, rgb(204, 251, 252), rgb(197, 234, 254), rgb(189, 211, 255))",
  },
  {
    label: "gradation-10",
    value: "linear-gradient(135deg, rgb(255, 95, 109) 0%, rgb(255, 195, 113) 100%)",
  },
];
// 生成规则
// linear-gradient(135deg, rgb(114, 28, 49) 0%, rgb(119, 103, 43) 100%);
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

interface WallpaperListProps {
  value?: string;
  onChange?: (value: { type: string; value: string }) => void;
}

const WallpaperList: FC<WallpaperListProps> = ({ value: initValue, onChange }) => {
  const formValue = useFormStore();
  const [value, setValue] = useState<string | undefined>(initValue);
  const [type, setType] = useState("wallpaper");


  useEffect(() => {
    setValue(formValue.background.value);
    setType(formValue.background.type);
  }, [formValue.background]);
  const onSelect = (value: string) => {
    setValue(value);
    onChange?.({
      type,
      value,
    });
  };

  const onTypeChange = (value: any) => {
    setType(value.target.value);
  };
  const onUpload = (info: any) => {
    const image = URL.createObjectURL(info.file.originFileObj);
    onChange?.({
      type,
      value: image,
    });
  };

  const listOptions = useMemo(() => {
    if (type === "wallpaper") {
      return data;
    } else {
      return gradationData;
    }
  }, [type]);

  const { token } = theme.useToken();
  const presets = genPresets({ primary: generate(token.colorPrimary), red, green });

  const customBgContent = (
    <div className="max-w-80">
      <div>
        <Link href="https://uigradients.com/">uiGradients</Link> ：拷贝心仪的渐变色 CSS 样式代码
      </div>
      <div className="mt-2">
        <Link href="https://cssgradient.io/">cssgradient.io</Link>： 利用在线工定制渐变色
      </div>
      <TextArea className="mt-4" rows={6} placeholder="粘贴样式代码" />
    </div>
  );

  return (
    <>
      <RadioGroup optionType="button" value={type} onChange={onTypeChange} className="flex text-center">
        {bgOptions.map((item) => (
          <RadioButton className="w-full" key={item.value} value={item.value}>
            {item.label}
          </RadioButton>
        ))}
      </RadioGroup>
      {type === "color" ? (
        <div className="mt-4 flex justify-between items-center space-x-4">
          <ColorPicker presets={presets} className="flex-auto" onChange={(value) => {
            onSelect(value.toRgbString())
          }}  showText />
          <Popover content={customBgContent} title="自定义样式代码" trigger="click">
            <Button className="flex-auto" type="primary" icon={<ToolFilled />}>
              代码
            </Button>
          </Popover>
        </div>
      ) : null}

      {type !== "custom" ? (
        <List
          grid={{ column: 5 }}
          className="mt-4 gap-1"
          dataSource={listOptions}
          renderItem={(item) => (
            <div
              style={{
                opacity: value === item.value ? 1 : undefined,
                border: value === item.value ? "2px solid #1890ff" : undefined,
              }}
              className="p-1 rounded-md border-2 border-transparent box-border opacity-65 hover:opacity-100 cursor-pointer"
              onClick={() => onSelect(item.value)}
            >
              {type === "wallpaper" ? (
                <div
                  style={{ backgroundImage: `url(/images/wallpapers/${item.value}.jpg)` }}
                  className="rounded-md bg-cover bg-center bg-no-repeat min-h-[44px]"
                />
              ) : null}
              {type === "color" ? (
                <div
                  className="rounded-md w-full h-full min-h-[44px] opacity-80 hover:opacity-100 cursor-pointer"
                  style={{
                    background: item.value,
                  }}
                />
              ) : null}
            </div>
          )}
        />
      ) : (
        <div className="mt-4">
          <Dragger onChange={onUpload} showUploadList={false}>
            <InboxOutlined style={{ fontSize: 48 }} />
            <div className="mt-2">点击或拖动图片</div>
          </Dragger>
        </div>
      )}
    </>
  );
};

export default WallpaperList;
