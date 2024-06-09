"use client";
import React from "react";
import { Button, Layout } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { GithubOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/icons/logo.png";
const { Header, Footer } = Layout;

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyleProvider layer>
      <Layout className="overflow-hidden rounded-lg w-full max-w-full">
        <Header className="leading-16 h-16 shadow-md border-b bg-white px-6">
          <div className="leading-16 h-16 flex justify-between items-center">
            <div className="flex justify-center items-center">
              <Link href="/">
                <Image src={Logo} alt="logo" className="h-12 w-12 mr-4 rounded-xl"></Image>
              </Link>
              <h1 className="text-2xl">Cover Pen</h1>
            </div>

            <div className="flex">
              {/*<Link href="/" type="text">帮助</Link>*/}
              <Button type="text" href="https://github.com/LetTTGACO/CoverPen" target="_blank">
                <GithubOutlined style={{ fontSize: 20 }} />
              </Button>
            </div>
          </div>
        </Header>
        {children}
      </Layout>
    </StyleProvider>
  );
}
