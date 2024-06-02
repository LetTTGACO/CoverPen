"use client";
import RenderViewCard from "@/components/card/RenderViewCard";
import FormCard from "@/components/card/FormCard";
import { Button, Flex, Layout } from "antd";
import React from "react";
const { Footer, Sider, Content } = Layout;

export default function Editor() {
  return (
    <>
      <Layout className="flex flex-col-reverse lg:flex-row">
        <Sider
          width={400}
          breakpoint="lg"
          collapsedWidth="100%"
          className="lg:h-layout bg-white lg:border-r overflow-y-auto"
        >
          <FormCard />
          <Footer className="z-10 flex items-center justify-center border-t-[1px] bg-white w-[400px] h-[64px] text-center p-0 fixed bottom-0">
            <Button className="" danger type="primary">
              重置
            </Button>
          </Footer>
        </Sider>
        <Layout className="w-full">
          <Content className="lg:h-layout lg:w-layout overflow-y-auto overflow-x-auto bg-white pt-20">
            <RenderViewCard />
          </Content>
          <Footer style={{ width: "calc(100% - 400px)" }} className="flex items-center justify-center bg-lime-500 h-[64px] p-0 text-center fixed bottom-0">
            <Button type="primary">截图</Button>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
