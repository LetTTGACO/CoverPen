import { create } from "zustand";
export interface FormValue {
  /** 主题 */
  theme: string;
  /** 标题 */
  title: string;
  /** 作者 */
  author?: string;
  /** 图标 */
  icon?: string;
  /** 自定义图标 */
  customIcon?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 圆角半径 */
  borderRadius: string;
  /** 水平内边距 */
  paddingX?: string;
  /** 垂直内边距 */
  paddingY?: string;
  /** 字体 */
  font?: string;
  /** 宽度 */
  width?: string;
  /**比例 */
  ratio?: string;
  /** 适用平台预设 */
  aspectRatio?: string;
}

const useFormStore = create<FormValue>((set) => ({
  title: "Blog Title",
  author: "Cody",
  theme: "base",
  icon: "react",
  customIcon: "",
  font: "font-sans",
  backgroundColor: "#949ee5",
  borderRadius: "10",
  paddingX: "10",
  paddingY: "10",
  width: "600",
  ratio: "1:1",
  aspectRatio: "16/9",
}));

export default useFormStore;
