"use client";
import RenderViewCard from "@/components/card/RenderViewCard";
import FormCard from "@/components/card/FormCard";
import { Button, Layout } from "antd";
import React, { useRef, useState } from "react";
import useFormStore, { defaultValue } from "@/hooks/useFormStore";
import domtoimage from "dom-to-image";
const { Footer, Sider, Content } = Layout;

export default function Editor() {
  const { setState } = useFormStore;
  const [loading, setLoading] = useState<boolean>(false);
  const componentRef = React.createRef<HTMLDivElement>();
  const handleReset = () => {
    setState((pre) => {
      return {
        ...pre,
        theme: defaultValue.theme,
        aspectRatio: defaultValue.aspectRatio,
        background: defaultValue.background,
        borderRadius: defaultValue.borderRadius,
        width: defaultValue.width,
        font: defaultValue.font,
      };
    });
  };

  const handleDownload = async () => {
    setLoading(true);
    const element = componentRef.current;
    console.log("element", element);
    if (!element) {
      setLoading(false);
      return;
    }

    // console.log(element)
    // console.log(element.offsetHeight)

    let data = await domtoimage.toPng(element, {
      height: element.offsetHeight * 2,
      width: element.offsetWidth * 2,
      style: {
        transform: "scale(" + 2 + ")",
        transformOrigin: "top left",
        width: element.offsetWidth + "px",
        height: element.offsetHeight + "px",
      },
    });

    const a = document.createElement("A") as HTMLAnchorElement;
    a.href = data;
    a.download = `cover.png`;
    document.body.appendChild(a);
    setLoading(false);
    a.click();
    document.body.removeChild(a);
  };

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
            <Button danger type="primary" onClick={handleReset}>
              重置样式
            </Button>
          </Footer>
        </Sider>
        <Layout className="w-full">
          <Content className="lg:h-layout overflow-y-auto overflow-x-auto bg-white py-20">
            <div ref={componentRef}>
              <RenderViewCard />
            </div>
          </Content>
          <Footer
            style={{ width: "calc(100% - 400px)" }}
            className="flex items-center justify-center bg-lime-500 h-[64px] p-0 text-center fixed bottom-0"
          >
            <Button loading={loading} onClick={handleDownload} type="primary">
              截图
            </Button>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
