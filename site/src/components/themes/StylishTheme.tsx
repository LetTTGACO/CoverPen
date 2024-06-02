"use client";

import React, { FC, useMemo } from "react";
import Image from "next/image";
import { FormValue } from "@/hooks/useFormStore";

const StylishTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { aspectRatio, width, title, author, font, icon, customIcon, backgroundColor } = config;

  const lines = useMemo(() => {
    return title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, [title]);
  return (
    <div className=" bg-white rounded">
      <div
        className={` overflow-y-hidden flex flex-col rounded mx-auto `}
        style={{ backgroundColor, width: `${width}px`, aspectRatio }}
      >
        <div className="flex flex-row  items-center bg-white  justify-center m-4 ">
          <div className="h-full w-1/2  bg-white rounded-l-xl">
            <div className={`${font} px-12 justify-center text-left rounded-xl h-full p-4 flex flex-col`}>
              <h1 className=" text-4xl font-bold text-gray-800">{lines}</h1>
              <div className="flex items-center mt-10 text-left">
                {customIcon ? (
                  <div className=" ">
                    <Image
                      src={customIcon}
                      alt="img"
                      className="w-12 h-12 mr-2 rounded-full bg-white border border-white"
                    />
                  </div>
                ) : (
                  <div className="mr-2 items-center justify-center flex">
                    <i className={`devicon-${icon}-plain  dev-icon text-3xl`}></i>
                  </div>
                )}
                <h2 className="text-xl  font-semibold text-left ">{author}</h2>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative flex group">
              <div className="h-96 w-96 ">
                {/*<Image*/}
                {/*  src={unsplashImage.url && unsplashImage.url}*/}
                {/*  className=" object-cover h-96 w-96  "*/}
                {/*  alt="preview"*/}
                {/*/>*/}
                123123
              </div>

              {/*<button onClick={() => setUnsplashImage("")} className="absolute  top-4 right-2 cursor-pointer">*/}
              {/*  <svg*/}
              {/*    className="group-hover:inline-block hidden w-6 h-6 text-gray-800 bg-white p-1 rounded-full z-10"*/}
              {/*    fill="none"*/}
              {/*    stroke="currentColor"*/}
              {/*    viewBox="0 0 24 24"*/}
              {/*    xmlns="http://www.w3.org/2000/svg"*/}
              {/*  >*/}
              {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>*/}
              {/*  </svg>*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylishTheme;
