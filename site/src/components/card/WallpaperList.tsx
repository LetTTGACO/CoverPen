"use client";

import React, { CSSProperties, FC, useEffect, useMemo, useState } from "react";
import { Button, ColorPicker, Input, type ColorPickerProps, List, Radio, theme, Upload, Popconfirm } from "antd";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { InboxOutlined, PlusOutlined, ToolFilled } from "@ant-design/icons";
import Link from "next/link";
import { bgOptions, gradationData, wallpaperList } from "@/const";
import parse from "style-to-object";
import { CSSObject } from "@ant-design/cssinjs";
const { Group: RadioGroup, Button: RadioButton } = Radio;
const { Dragger } = Upload;
const { TextArea } = Input;
type Presets = Required<ColorPickerProps>["presets"][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

interface WallpaperListProps {
  value?: { type: string; value: string };
  onChange?: (value: { type: string; value: string | CSSProperties }) => void;
}

const WallpaperList: FC<WallpaperListProps> = ({ value: initValue, onChange }) => {
  const [value, setValue] = useState<string | undefined>(initValue?.value);
  const [type, setType] = useState<string>(initValue?.type || "color");

  const [customBg, setCustomBg] = useState("");

  useEffect(() => {
    if (initValue) {
      setValue(initValue.value);
      setType(initValue.type);
    }
  }, [initValue]);
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
      return wallpaperList;
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
      <TextArea
        value={customBg}
        onChange={(text) => {
          setCustomBg(text.target.value);
        }}
        className="mt-4"
        rows={6}
        placeholder="粘贴样式代码"
      />
    </div>
  );

  const handleCustomBg = () => {
    const style = parse(customBg);
    onChange?.({
      type: "color",
      value: style as CSSProperties,
    });
  };

  return (
    <>
      <div>
        <RadioGroup optionType="button" value={type} onChange={onTypeChange} className="flex text-center">
          {bgOptions.map((item) => (
            <RadioButton className="w-full" key={item.value} value={item.value}>
              {item.label}
            </RadioButton>
          ))}
        </RadioGroup>
        {type === "color" ? (
          <div className="mt-4 flex justify-between items-center space-x-4">
            <ColorPicker
              presets={presets}
              className="flex-auto"
              onChange={(value) => {
                onSelect(value.toRgbString());
              }}
              showText
            />
            <Popconfirm
              description={customBgContent}
              title="自定义样式代码"
              trigger="click"
              okText="确认"
              cancelText="取消"
              onConfirm={handleCustomBg}
            >
              <Button className="flex-auto" type="primary" icon={<ToolFilled />}>
                代码
              </Button>
            </Popconfirm>
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
                  border: value === item.value ? "2px solid #f18446" : undefined,
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
      </div>
    </>
  );
};

export default WallpaperList;
