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
        return `url('/images/wallpapers/${formValue.background.value}.jpg') center center / 100%`;
      case "color":
        return `url(${formValue.background.value}) center center / 100%`;
      default:
        return formValue.background.value;
    }
  }, [formValue.background]);

  const title = useMemo(() => {
    return formValue.title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, [formValue.title]);

  const selectTheme = (theme: string) => {
    switch (theme) {
      case "basic":
        return <BasicTheme {...formValue} title={title} background={background} />;
      case "modern":
        return <ModernTheme {...formValue} title={title} background={background} />;
      case "outline":
        return <OutlineTheme {...formValue} title={title} background={background} />;
      case "preview":
        return <PreviewTheme {...formValue} title={title} background={background} />;
      case "stylish":
        return <StylishTheme {...formValue} title={title} background={background} />;
      case "mobile":
        return <MobileMockupTheme {...formValue} title={title} background={background} />;
      default:
        return <BasicTheme {...formValue} title={title} background={background} />;
    }
  };
  return selectTheme(formValue.theme);
}

export default RenderViewCard;
