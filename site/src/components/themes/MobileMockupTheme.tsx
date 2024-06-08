"use client";

import React, { FC, useMemo, useState } from "react";
import { FormValue } from "@/hooks/useFormStore";
import {InboxOutlined} from "@ant-design/icons";
import { Upload } from "antd";
const { Dragger } = Upload;

const MobileMockupTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { width, aspectRatio, background, title, font } = config;

  const [image, setImage] = useState<string>();

  const handleUpload = (info: any) => {
    setImage(URL.createObjectURL(info.file.originFileObj));
  };


  return (
    <div className="bg-white">
      <div
        className={`overflow-y-hidden flex flex-row items-center justify-center px-8 pt-4 mx-auto`}
        style={{ background, width: `${width}px`, aspectRatio }}
      >
        <h1 className={`${font} text-2xl w-1/2 md:text-4xl px-4 text-white font-bold text-left`}>{title}</h1>

        <div className="w-5/12 m-4 mt-10 group mx-auto h-full  shadow-lg  flex flex-col  bg-white border-t-8 border-x-8 border-gray-800 rounded-t-3xl">
          <div className="bg-gray-800 h-8 w-full p-2 pb-3 flex items-center rounded-t">
            <div className="flex mx-auto items-center">
              <div className="bg-white h-3 w-3 rounded-full mx-1"></div>
              <div className="bg-white h-2 w-20 rounded-full mx-1"></div>
            </div>
          </div>

          {image ? (
            <div className="relative h-full">
              <img src={image && image} className="object-cover rounded -translate-y-1 h-full" alt="preview" />
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
            <div className="bg-white relative w-full h-full ">
              <Dragger onChange={handleUpload} className="w-full h-full absolute top-0 left-0" showUploadList={false}>
                <InboxOutlined style={{fontSize: 48}}/>
                <div className="mt-2">点击或拖动图片</div>
              </Dragger>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMockupTheme;
