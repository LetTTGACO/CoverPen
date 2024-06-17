"use client";
import useFormStore from "@/hooks/useFormStore";
import { useImperativeHandle, forwardRef } from "react";
import { Button, Col, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import WallpaperList from "@/components/card/WallpaperList";
import ThemeList from "@/components/card/ThemeList";
import SliderInput from "@/components/SliderInput";
import { FormValue } from "@/types";
import { aspectRatio, fontOptions, iconOptions } from "@/const";
import { useTranslations } from "next-intl";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const FormCard = forwardRef(function FormCard(props, ref) {
  const t = useTranslations("Editor");
  const setState = useFormStore.setState;
  const formValue = useFormStore();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      setValue: (value: FormValue) => {
        form?.setFieldsValue(value);
      },
    };
  });

  const onChange = (changedValues: any, allValues: FormValue) => {
    if (changedValues.customIcon?.file.status === "done") {
      //文件上传
      setState((state) => {
        return {
          ...state,
          icon: "",
          customIcon: URL.createObjectURL(changedValues.customIcon.file.originFileObj),
        };
      });
    } else {
      setState((state) => {
        return {
          ...state,
          ...allValues,
          customIcon: changedValues.icon ? "" : state.customIcon,
        };
      });
    }
  };

  const Label = ({ children }: any) => <span className="text-lg text-gray-500">{children}</span>;

  return (
    <Form form={form} layout="vertical" initialValues={formValue} onValuesChange={onChange} className="p-5 pb-16">
      <FormItem label={<Label>{t("theme")}</Label>} name="theme">
        <ThemeList />
      </FormItem>

      <FormItem label={<Label>{t("ratio")}</Label>} name="aspectRatio">
        <Select
          options={aspectRatio}
          optionRender={(option) => (
            <div className="flex gap-1 items-center">
              <div className="flex flex-col leading-7">
                <span className="font-bold">{option.data.desc}</span>
                <span>{option.data.label}</span>
              </div>
            </div>
          )}
        />
      </FormItem>

      <FormItem label={<Label>{t("title")}</Label>} name="title">
        <TextArea rows={1} placeholder={t("title_input_placeholder")} autoSize />
      </FormItem>
      {!["preview", "mobile"].includes(formValue.theme) && (
        <FormItem label={<Label>{t("author")}</Label>} name="author">
          <Input name="author" placeholder={t("author_input_placeholder")} />
        </FormItem>
      )}
      {!["preview", "mobile"].includes(formValue.theme) && (
        <Form.Item label={<Label>{t("icon")}</Label>}>
          <div className="flex items-center justify-between">
            <FormItem noStyle label={<Label>{t("icon")}</Label>} name="icon">
              <Select
                showSearch
                className="mr-4"
                options={iconOptions}
                optionRender={(option) => (
                  <div className="flex">
                    <span className="mr-2">{option.data.value}</span>
                    <div className="ml-auto mr-2">
                      <i className={`devicon-${option.data.value}-plain dev-icon text-2xl`}></i>
                    </div>
                  </div>
                )}
              />
            </FormItem>

            <FormItem noStyle name="customIcon">
              <Upload showUploadList={false}>
                <Button icon={<UploadOutlined />}>{t("custom")}</Button>
              </Upload>
            </FormItem>
          </div>
        </Form.Item>
      )}

      <FormItem label={<Label>{t("width")}</Label>} name="width">
        <SliderInput step={1} max={1000} min={400} />
      </FormItem>
      {!["preview", "outline", "mobile"].includes(formValue.theme) && (
        <FormItem label={<Label>{t("rounded")}</Label>} name="borderRadius">
          <SliderInput step={1} max={100} min={0} />
        </FormItem>
      )}
      <FormItem label={<Label>{t("background")}</Label>} name="background">
        <WallpaperList />
      </FormItem>
      {/*TODO Font 字体支持*/}
      {/*<FormItem label={<Label>字体</Label>} name="font">*/}
      {/*  <Select showSearch options={fontOptions} placeholder="请选择字体" />*/}
      {/*</FormItem>*/}
    </Form>
  );
});

export default FormCard;
