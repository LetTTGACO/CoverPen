"use client";

import React, { FC, useMemo, useState } from "react";
import Image from "next/image";
import { FormValue } from "@/hooks/useFormStore";

const MobileMockupTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { width, aspectRatio, backgroundColor, title, font } = config;

  const [image, setImage] = useState();

  const lines = useMemo(() => {
    return title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, [title]);

  return (
    <div className="p-4 bg-white">
      <div
        className={`overflow-y-hidden flex flex-row items-center justify-center px-8 pt-4 mx-auto`}
        style={{ backgroundColor, width: `${width}px`, aspectRatio }}
      >
        <h1 className={`${font} text-2xl w-1/2 md:text-4xl px-4 text-white font-bold text-left`}>{lines}</h1>

        <div className="w-5/12 m-4 mt-10 group mx-auto h-full  shadow-lg  flex flex-col  bg-white border-t-8 border-x-8 border-gray-800 rounded-t-3xl">
          <div className="bg-gray-800 h-8 w-full p-2 pb-3 flex items-center rounded-t">
            <div className="flex mx-auto items-center">
              <div className="bg-white h-3 w-3 rounded-full mx-1"></div>
              <div className="bg-white h-2 w-20 rounded-full mx-1"></div>
            </div>
          </div>

          {image ? (
            <div className="group relative">
              <Image src={image && image} className="object-cover rounded -translate-y-1 h-full" alt="preview" />
              <button onClick={() => setImage("")} className="ml-auto mr-4 cursor-pointer">
                <svg
                  className="group-hover:inline-block absolute top-4 right-2  bg-gray-500 hidden w-8 h-8 p-2 text-white rounded-full z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col px-4 rounded-xl py-20 bg-white items-center justify-center">
              <input
                type="file"
                className="text-sm  flex flex-col cursor-pointer mb-2 bg-white rounded border"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              />
              <span className=" text-center italic">click to upload a screenshot</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMockupTheme;
