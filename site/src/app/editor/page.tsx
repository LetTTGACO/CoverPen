"use client";
import RenderViewCard from "@/components/card/RenderViewCard";
import FormCard from "@/components/card/FormCard";
import { Button, Dropdown, Layout, notification, Space } from "antd";
import React, { useRef, useState } from "react";
import useFormStore, { defaultValue } from "@/hooks/useFormStore";
import domtoimage from "dom-to-image";
import { dropdownItems } from "@/const";
const DropdownButton = Dropdown.Button;
const { Footer, Sider, Content } = Layout;

export default function Editor() {
  const { setState } = useFormStore;
  const [loading, setLoading] = useState<boolean>(false);
  const componentRef = React.createRef<HTMLDivElement>();

  const formRef = useRef(null);

  const handleReset = () => {
    const resetValue = {
      theme: defaultValue.theme,
      aspectRatio: defaultValue.aspectRatio,
      background: defaultValue.background,
      borderRadius: defaultValue.borderRadius,
      width: defaultValue.width,
      font: defaultValue.font,
    };
    // @ts-ignore
    formRef.current?.setValue(resetValue);
    setState((pre) => {
      return {
        ...pre,
        ...resetValue,
      };
    });
  };

  const handleDownload = async (imgType: string, size: number) => {
    setLoading(true);
    const element = componentRef.current;
    if (!element) {
      setLoading(false);
      return;
    }
    // imgType首字母大写
    const type = imgType.replace(/^\S/, (s) => s.toUpperCase());
    // @ts-ignore
    const func = domtoimage[`to${type}`];

    // console.log(element)
    // console.log(element.offsetHeight)

    let data = await func(element, {
      height: element.offsetHeight * size,
      width: element.offsetWidth * size,
      style: {
        transform: "scale(" + size + ")",
        transformOrigin: "top left",
        width: element.offsetWidth + "px",
        height: element.offsetHeight + "px",
      },
    });

    const a = document.createElement("A") as HTMLAnchorElement;
    a.href = data;
    // 文件名 CoverPen + 时间年月日
    const filename = `coverpen-${new Date().toISOString().slice(0, 10)}-x${size}`;
    a.download = `${filename}.${imgType}`;
    document.body.appendChild(a);
    setLoading(false);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = async () => {
    const element = componentRef.current;
    if (!element) {
      return;
    }

    let data = await domtoimage.toBlob(element, {
      height: element.offsetHeight,
      width: element.offsetWidth,
      style: {
        transformOrigin: "top left",
        width: element.offsetWidth + "px",
        height: element.offsetHeight + "px",
      },
    });
    // 复制到剪贴板
    const item = new ClipboardItem({ "image/png": data });
    await navigator.clipboard.write([item]);
    notification.open({
      message: "复制成功",
      description: "复制到剪贴板成功",
    });
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
          <FormCard ref={formRef} />
        </Sider>
        <Layout className="w-full bg-white overflow-x-auto ">
          <Content className="min-w-fit lg:h-layout lg:w-layout py-20 flex items-center justify-center">
            <div ref={componentRef} className="min-w-fit">
              <RenderViewCard />
            </div>
          </Content>
        </Layout>
        <Footer className="flex items-center justify-between bg-white h-[64px] w-full p-0 text-center fixed bottom-0 border-t-[1px] z-10">
          <div className="lg:w-[400px] lg:ml-0 ml-4">
            <Button type="primary" onClick={handleReset}>
              重置样式
            </Button>
          </div>
          <div className="flex items-center h-full float-right mr-4">
            <Button type="primary" onClick={handleCopy}>
              复制
            </Button>
            <DropdownButton
              type="primary"
              className="float-right w-fit ml-4"
              menu={{
                items: dropdownItems,
                onClick: (e) => handleDownload(e.key.split(",")[0], Number(e.key.split(",")[1])),
              }}
              onClick={() => handleDownload("png", 1)}
              loading={loading}
            >
              下载
            </DropdownButton>
          </div>
        </Footer>
      </Layout>
    </>
  );
}
