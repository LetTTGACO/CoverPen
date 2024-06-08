"use client";

import React, { FC, useEffect, useState } from "react";
import { List } from "antd";
import useFormStore from "@/hooks/useFormStore";
// theme1.webp
// theme2.webp
// theme3.webp
// theme4.webp
// theme5.webp
// theme6.webp
// theme7.webp

const data = [
  { label: "theme1", value: "basic" },
  { label: "theme2", value: "modern" },
  { label: "theme5", value: "outline" },
  { label: "theme4", value: "preview" },
  { label: "theme3", value: "stylish" },
  { label: "theme6", value: "mobile" },
  // { label: "theme7", value: "background" },
];

interface ThemeListProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ThemeList: FC<ThemeListProps> = ({ value: initValue, onChange }) => {
  const formValue = useFormStore();
  const [value, setValue] = useState<string | undefined>(initValue);

  useEffect(() => {
    setValue(formValue.theme);
  }, [formValue.theme]);

  const onSelect = (value: string) => {
    setValue(value);
    onChange?.(value);
  };
  console.log("value", value);

  return (
    <>
      <List
        grid={{ column: 3, md: 5, lg: 3 }}
        className="gap-1"
        dataSource={data}
        renderItem={(item) => (
          <div
            style={{
              border: value === item.value ? "2px solid #1890ff" : undefined,
            }}
            className="p-1 rounded-md border-2 border-transparent box-border cursor-pointer"
            onClick={() => onSelect(item.value)}
          >
            <div
              style={{ backgroundImage: `url(/images/${item.label}.webp)` }}
              className="rounded-md bg-cover bg-center bg-no-repeat min-h-[80px] hover:scale-105 hover:border-gray-200 duration-300 border"
            />
          </div>
        )}
      />
    </>
  );
};

export default ThemeList;
