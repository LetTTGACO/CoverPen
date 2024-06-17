"use client";
import React from "react";
import { Button, Dropdown, Layout, Space } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { DownOutlined, GithubOutlined } from "@ant-design/icons";
import Image from "next/image";
import Logo from "../../../../public/icons/logo.png";
import { useLocale } from "next-intl";
import { localNames, locales } from "@/const/intl";
import { usePathname, Link } from "@/libs/i18nNavigation";
const { Header, Footer } = Layout;

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();
  const pathname = usePathname();

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
              <Dropdown
                className="mr-2"
                menu={{
                  items: locales.map((_locale) => ({
                    key: _locale,
                    disabled: locale === _locale,
                    label: (
                      <Link href={pathname} locale={_locale}>
                        {localNames[_locale]}
                      </Link>
                    ),
                  })),
                }}
              >
                <div className="flex items-center" onClick={(e) => e.preventDefault()}>
                  <span
                    className="text-base w-4 h-4 mr-1 block"
                    style={{
                      maskSize: "100% 100%",
                      backgroundColor: "currentcolor",
                      mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6'/%3E%3C/svg%3E") no-repeat`,
                    }}
                  />
                  <DownOutlined />
                </div>
              </Dropdown>
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
