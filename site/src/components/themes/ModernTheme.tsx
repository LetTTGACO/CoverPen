"use client";

import React, { FC } from "react";
import Image from "next/image";
import { ThemeFormValue } from "@/types";

const ModernTheme: FC<ThemeFormValue> = (props) => {
  const { style, width, aspectRatio, title, borderRadius, background, author, icon, font, customIcon } = props;

  return (
    <div className="m-auto bg-white " style={{ background, width: `${width}px`, ...style }}>
      <div className=" overflow-y-hidden w-full flex  items-center" style={{ aspectRatio }}>
        <div className={` m-auto h-full p-4 text-gray-800 flex  items-center`} style={{ aspectRatio }}>
          {customIcon ? (
            <div className="mx-auto items-center justify-center flex">
              <Image src={customIcon} alt="img" className="w-28 h-28 rounded-full bg-white border-4 border-white" />
            </div>
          ) : (
            <div className=" rounded-full p-6 w-32 h-32 bg-white mx-auto items-center justify-center flex">
              <i className={`devicon-${icon}-plain  p-4 dev-icon text-7xl`}></i>
            </div>
          )}

          <div className="h-full w-2/3">
            <div
              className={`${font} bg-white px-12 justify-center text-left rounded-xl h-full p-4 flex flex-col`}
              style={{ borderRadius }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{title}</h1>
              <h2 className="text-xl mt-10 font-semibold text-left ">{author}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTheme;
