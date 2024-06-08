"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { ThemeFormValue } from "@/types";
const { Dragger } = Upload;

const StylishTheme: FC<ThemeFormValue> = (props) => {
  const { borderRadius, aspectRatio, width, title, author, font, icon, customIcon, background } = props;

  const [image, setImage] = useState<string>();

  const handleUpload = (info: any) => {
    setImage(URL.createObjectURL(info.file.originFileObj));
  };
  return (
    <div className="bg-white">
      <div
        className={` overflow-y-hidden flex flex-col mx-auto `}
        style={{ background, width: `${width}px`, aspectRatio }}
      >
        <div
          style={{ borderRadius }}
          className="flex flex-row  items-center bg-white rounded justify-center m-4 h-full "
        >
          <div style={{ borderRadius }} className="h-full w-1/2  bg-white">
            <div className={`${font} px-12 justify-center text-left h-full p-4 flex flex-col`}>
              <h1 className=" text-4xl font-bold text-gray-800">{title}</h1>
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
          <div style={{ borderRadius }} className="w-1/2 h-full">
            {image ? (
              <div style={{ borderRadius }} className="relative w-full h-full">
                <img
                  style={{ borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius }}
                  src={image}
                  className="object-cover w-full h-full"
                  alt="preview"
                />
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
              <div style={{ borderRadius }} className="p-20 py-28 bg-white relative  w-full h-full ">
                <Dragger
                  style={{ borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius }}
                  onChange={handleUpload}
                  showUploadList={false}
                  className="w-full h-full absolute top-0 left-0"
                >
                  <InboxOutlined style={{ fontSize: 48 }} />
                  <div className="mt-2">点击或拖动图片</div>
                </Dragger>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylishTheme;
