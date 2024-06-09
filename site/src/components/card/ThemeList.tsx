"use client";

import React, { FC, useEffect, useState } from "react";
import { List } from "antd";
import { themeOptions } from "@/const";

interface ThemeListProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ThemeList: FC<ThemeListProps> = ({ value: initValue, onChange }) => {
  const [value, setValue] = useState<string | undefined>(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const onSelect = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <>
      <List
        grid={{ column: 3, md: 5, lg: 3 }}
        className="gap-1"
        dataSource={themeOptions}
        renderItem={(item) => (
          <div
            style={{
              border: value === item.value ? "2px solid #f18446" : undefined,
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
