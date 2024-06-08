"use client";
import RenderViewCard from "@/components/card/RenderViewCard";
import FormCard from "@/components/card/FormCard";
import {Button, Dropdown, Layout, notification, Space} from "antd";
import React, { useRef, useState } from "react";
import useFormStore, { defaultValue } from "@/hooks/useFormStore";
import domtoimage from "dom-to-image";
const DropdownButton = Dropdown.Button;
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

  const handleDownload = async (imgType: string, size: number) => {
    console.log("download", imgType, size);
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
    // 文件名 CoverView + 时间年月日
    const filename = `coverview-${new Date().toISOString().slice(0, 10)}`;
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
      message: '复制成功',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }

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
          <Footer className="z-10 flex items-center justify-center border-t-[1px] border-r-[1px] bg-white w-[400px] h-[64px] text-center p-0 fixed bottom-0">
            <Button danger type="primary" onClick={handleReset}>
              重置样式
            </Button>
          </Footer>
        </Sider>
        <Layout className="w-full">
          <Content className="lg:h-layout lg:w-layout min-w-layout overflow-y-auto overflow-x-auto bg-white py-20 flex items-center justify-center">
            <div ref={componentRef} className="w-fit">
              <RenderViewCard />
            </div>
          </Content>
          <Footer
            style={{ width: "calc(100% - 400px)" }}
            className="bg-white h-[64px] p-0 text-center fixed bottom-0 border-t-[1px]"
          >

            <div className="flex items-center h-full float-right mr-4">
              <Button type="primary" onClick={handleCopy}>复制</Button>
              <DropdownButton
                type="primary"
                className="float-right w-fit ml-4"
                menu={{
                  items: [
                    {
                      key: "png,1",
                      label: "PNG x1",
                    },
                    {
                      key: "png,2",
                      label: "PNG x2",
                    },
                    {
                      key: "jpeg,1",
                      label: "JPEG x1",
                    },
                    {
                      key: "jpeg,2",
                      label: "JPEG x2",
                    },
                  ],
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
      </Layout>
    </>
  );
}
