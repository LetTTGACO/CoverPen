import { CSSProperties, ReactNode } from "react";
import { CSSObject } from "@ant-design/cssinjs";

export interface BaseFormValue {
  /** 主题 */
  theme: string;

  /** 作者 */
  author?: string;
  /** 图标 */
  icon?: string;
  /** 自定义图标 */
  customIcon?: string;
  /** 背景颜色 */
  /** 圆角半径 */
  borderRadius: string;
  /** 字体 */
  font?: string;
  /** 宽度 */
  width?: string;
  /**比例 */
  ratio?: string;
  /** 适用平台预设 */
  aspectRatio?: string;
}

export interface FormValue extends BaseFormValue {
  background: { type: string; value: string };
  /** 标题 */
  title: string;
}

export interface ThemeFormValue extends BaseFormValue {
  background: string;
  style: CSSProperties;
  /** 标题 */
  title: ReactNode[];
}
