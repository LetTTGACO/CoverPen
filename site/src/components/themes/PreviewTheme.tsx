"use client";

import React, { FC, useMemo, useState } from "react";
import { FormValue } from "@/hooks/useFormStore";
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const { Dragger } = Upload;

const PreviewTheme: FC<{ config: FormValue }> = ({ config }) => {
  const { aspectRatio, width, background, title, font } = config;

  const [image, setImage] = useState<string>();



  const handleUpload = (info: any) => {
    setImage(URL.createObjectURL(info.file.originFileObj));
  };

  return (
    <div className="bg-white">
      <div
        className={`overflow-y-hidden flex flex-col px-4 pt-4 mx-auto`}
        style={{ background, width: `${width}px`, aspectRatio }}
      >
        <h1 className={`${font} text-2xl md:text-3xl p-10 text-white font-bold text-center`}>{title}</h1>

        <div className="w-10/12 group mx-auto mt-auto mb-0 shadow-lg  flex flex-col bg-white rounded-t-xl border-white">
          <div className="bg-gray-800 h-8 w-full p-2 flex items-center rounded-t-xl">
            <div className="bg-red-400 h-3 w-3 rounded-full mx-1"></div>
            <div className="bg-yellow-400 h-3 w-3 rounded-full mx-1"></div>
            <div className="bg-green-400 h-3 w-3 rounded-full mx-1"></div>
          </div>

          {image ? (
            <div className="relative">
              <img src={image} className="object-cover w-full h-full" alt="preview" />
              <button onClick={() => setImage("")} className="ml-auto mr-4 cursor-pointer">
                <svg
                  className="group-hover:inline-block absolute top-4 right-4  bg-gray-500 hidden w-8 h-8 p-2 text-white rounded-full z-10"
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
            <div className="p-20 py-28 bg-white relative  w-full h-full ">
              <Dragger onChange={handleUpload} className="w-full h-full absolute top-0 left-0" showUploadList={false}>
                <InboxOutlined style={{ fontSize: 48 }} />
                <div className="mt-2">点击或拖动图片</div>
              </Dragger>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewTheme;
