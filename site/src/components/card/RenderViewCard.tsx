"use client";

import { Card, CardBody } from "@nextui-org/react";
import BasicTheme from "@/components/themes/BasicTheme";
import ModernTheme from "@/components/themes/ModernTheme";
import OutlineTheme from "@/components/themes/OutlineTheme";
import PreviewTheme from "@/components/themes/PreviewTheme";
import StylishTheme from "@/components/themes/StylishTheme";
import MobileMockupTheme from "@/components/themes/MobileMockupTheme";
import BackgroundTheme from "@/components/themes/BackgroundTheme";
import useFormStore from "@/hooks/useFormStore";

export default function RenderViewCard() {
  const formValue = useFormStore();

  const selectTheme = (theme: string) => {
    switch (theme) {
      case "basic":
        return <BasicTheme config={formValue} />;
      case "modern":
        return <ModernTheme config={formValue} />;
      case "outline":
        return <OutlineTheme config={formValue} />;
      case "preview":
        return <PreviewTheme config={formValue} />;
      case "stylish":
        return <StylishTheme config={formValue} />;
      case "mobile":
        return <MobileMockupTheme config={formValue} />;
      case "background":
        return <BackgroundTheme config={formValue} />;

      default:
        return <BasicTheme config={formValue} />;
    }
  };
  // return <div className="md:w-full md:scale-100 scale-50">{selectTheme(formValue.theme)} </div>;
  return selectTheme(formValue.theme);
}
