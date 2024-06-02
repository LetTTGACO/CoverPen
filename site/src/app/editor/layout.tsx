"use client";
import React from "react";
import { Layout } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
const { Header, Footer } = Layout;


export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyleProvider layer>
      <Layout className="overflow-hidden rounded-lg w-full max-w-full">
        <Header className="leading-16 h-16 shadow-md border-b bg-white">
          <div className="flex justify-between items-center">
            <div>Editor</div>
            <div className="flex">
              <button className="btn">Save</button>
              <button className="btn">Publish</button>
            </div>
          </div>
        </Header>
        {children}
      </Layout>
    </StyleProvider>
  );
}
