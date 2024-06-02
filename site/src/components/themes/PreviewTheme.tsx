"use client";

import React, { FC, useMemo, useState } from "react";
import Image from "next/image";
import { FormValue } from "@/hooks/useFormStore";

const PreviewTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { aspectRatio, width, backgroundColor, title, font } = config;

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
        className={`overflow-y-hidden flex flex-col px-4 pt-4 mx-auto`}
        style={{ backgroundColor, width: `${width}px`, aspectRatio }}
      >
        <h1 className={`${font} text-2xl md:text-3xl p-10 text-white font-bold text-center`}>{lines}</h1>

        <div className="w-10/12 group mx-auto mt-auto mb-0 shadow-lg  flex flex-col bg-white rounded-t-xl border-white">
          <div className="bg-gray-800 h-8 w-full p-2 flex items-center rounded-t-xl">
            <div className="bg-red-400 h-3 w-3 rounded-full mx-1"></div>
            <div className="bg-yellow-400 h-3 w-3 rounded-full mx-1"></div>
            <div className="bg-green-400 h-3 w-3 rounded-full mx-1"></div>
          </div>

          {image ? (
            <div className="relative">
              <img src={image && image} className="object-cover" alt="preview"/>
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
            <div className="flex flex-col p-20 py-28 bg-white items-center justify-center">
              <input
                type="file"
                className="text-xl cursor-pointer mb-2 bg-white rounded border"
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

export default PreviewTheme;
