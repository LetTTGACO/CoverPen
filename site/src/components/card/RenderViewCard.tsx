"use client";

import BasicTheme from "@/components/themes/BasicTheme";
import ModernTheme from "@/components/themes/ModernTheme";
import OutlineTheme from "@/components/themes/OutlineTheme";
import PreviewTheme from "@/components/themes/PreviewTheme";
import StylishTheme from "@/components/themes/StylishTheme";
import MobileMockupTheme from "@/components/themes/MobileMockupTheme";
// import BackgroundTheme from "@/components/themes/BackgroundTheme";
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
        return <BasicTheme config={{ ...formValue, background, title }} />;
      case "modern":
        return <ModernTheme config={{ ...formValue, background, title }} />;
      case "outline":
        return <OutlineTheme config={{ ...formValue, background, title }} />;
      case "preview":
        return <PreviewTheme config={{ ...formValue, background, title }} />;
      case "stylish":
        return <StylishTheme config={{ ...formValue, background, title }} />;
      case "mobile":
        return <MobileMockupTheme config={{ ...formValue, background, title }} />;
      // case "background":
      //   return <BackgroundTheme config={{ ...formValue, background }} />;

      default:
        return <BasicTheme config={{ ...formValue, background }} />;
    }
  };
  // return <div className="md:w-full md:scale-100 scale-50">{selectTheme(formValue.theme)} </div>;
  return selectTheme(formValue.theme);
}

export default RenderViewCard;
