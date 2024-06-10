"use client";

import BasicTheme from "@/components/themes/BasicTheme";
import ModernTheme from "@/components/themes/ModernTheme";
import OutlineTheme from "@/components/themes/OutlineTheme";
import PreviewTheme from "@/components/themes/PreviewTheme";
import StylishTheme from "@/components/themes/StylishTheme";
import MobileMockupTheme from "@/components/themes/MobileMockupTheme";
import useFormStore from "@/hooks/useFormStore";
import React, { useMemo } from "react";

function RenderViewCard() {
  const formValue = useFormStore();
  // 处理 background
  const background = useMemo(() => {
    switch (formValue.background.type) {
      case "wallpaper":
        return `url('/images/wallpapers/${formValue.background.value}.jpg') center center / auto 100%`;
      case "custom":
        return `url(${formValue.background.value}) center center / auto 100%`;
      case "color":
        if (typeof formValue.background.value === "string") {
          return formValue.background.value;
        }
        return "";
      default:
        return "";
    }
  }, [formValue.background]);

  const style = useMemo(() => {
    const { type, value } = formValue.background;
    if (type === "color" && typeof value === "object") {
      return formValue.background.value;
    }
    return {};
  }, [formValue.background]);

  const title = useMemo(() => {
    return formValue.title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, [formValue.title]);

  const borderRadius = useMemo(() => {
    return (formValue.borderRadius || 0) + "px";
  }, [formValue.borderRadius]);

  const selectTheme = (theme: string) => {
    switch (theme) {
      case "basic":
        return (
          <BasicTheme {...formValue} style={style} title={title} background={background} borderRadius={borderRadius} />
        );
      case "modern":
        return (
          <ModernTheme {...formValue} style={style} title={title} background={background} borderRadius={borderRadius} />
        );
      case "outline":
        return (
          <OutlineTheme
            {...formValue}
            style={style}
            title={title}
            background={background}
            borderRadius={borderRadius}
          />
        );
      case "preview":
        return (
          <PreviewTheme
            {...formValue}
            style={style}
            title={title}
            background={background}
            borderRadius={borderRadius}
          />
        );
      case "stylish":
        return (
          <StylishTheme
            {...formValue}
            style={style}
            title={title}
            background={background}
            borderRadius={borderRadius}
          />
        );
      case "mobile":
        return (
          <MobileMockupTheme
            {...formValue}
            style={style}
            title={title}
            background={background}
            borderRadius={borderRadius}
          />
        );
      default:
        return (
          <BasicTheme {...formValue} style={style} title={title} background={background} borderRadius={borderRadius} />
        );
    }
  };
  return selectTheme(formValue.theme);
}

export default RenderViewCard;
