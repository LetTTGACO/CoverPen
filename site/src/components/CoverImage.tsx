"use client";

import React from "react";
// import "./CoverImage.css";
// import "../assets/css/patterns.css";
import ModernTheme from "./themes/ModernTheme";
import BasicTheme from "./themes/BasicTheme";
import OutlineTheme from "./themes/OutlineTheme";
import PreviewTheme from "./themes/PreviewTheme";
import StylishTheme from "./themes/StylishTheme";
import MobileMockupTheme from "./themes/MobileMockupTheme";
import BackgroundTheme from "./themes/BackgroundTheme";

export default function CoverImage(props: { theme: string }) {
  const { theme } = props;

  const selectTheme = (theme: string) => {
    switch (theme) {
      case "basic":
        return <BasicTheme config={props} />;
      case "modern":
        return <ModernTheme config={props} />;
      case "outline":
        return <OutlineTheme config={props} />;
      case "preview":
        return <PreviewTheme config={props} />;
      case "stylish":
        return <StylishTheme config={props} />;
      case "mobile":
        return <MobileMockupTheme config={props} />;
      case "background":
        return <BackgroundTheme config={props} />;

      default:
        return <BasicTheme config={props} />;
    }
  };

  return <div className="md:w-full md:scale-100 scale-50">{selectTheme(theme)} </div>;
}
