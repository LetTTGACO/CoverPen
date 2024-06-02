"use client";

import React, { FC, useMemo } from "react";
import Image from "next/image";
import type { FormValue } from "@/hooks/useFormStore";

const BasicTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { title, backgroundColor, borderRadius, author, icon, font, customIcon, aspectRatio, width } = config;
  const lines = useMemo(() => {
    return title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, [title]);
  return (
    <div
      className={`mx-auto h-auto my-0 flex text-gray-800 items-center`}
      style={{ backgroundColor, width: `${width}px`, aspectRatio }}
    >
      <div className={`${font} bg-white w-10/12  m-auto flex flex-col pt-10 rounded-xl`} style={{ borderRadius }}>
        <div className="px-12">
          <div>
            <h1 className="overflow-hidden leading-[1.4] text-[2.4rem] text-gray-800 font-bold text-center">{lines}</h1>
          </div>
        </div>

        <div className="flex box-border p-4 mx-4 rounded-xl items-center bg-transparent">
          {customIcon ? (
            <div className="w-16 h-16">
              <Image src={customIcon} width={64} height={64} alt="img" className="rounded-full bg-white border-white" />
            </div>
          ) : (
            <div className="mr-auto ml-2 items-center justify-center flex">
              <i className={`devicon-${icon}-plain p-2 dev-icon text-5xl`}></i>
            </div>
          )}

          <h2 className="text-xl ml-auto mr-2 font-semibold">{author}</h2>
        </div>
      </div>
    </div>
  );
};

export default BasicTheme;
