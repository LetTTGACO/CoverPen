import { create } from "zustand";
import { FormValue } from "../types";

export const defaultValue = {
  title: "Blog Title",
  author: "Cody",
  theme: "basic",
  icon: "react",
  customIcon: "",
  font: "font-sans",
  background: {
    type: "wallpaper",
    value: "macos-big-sur",
  },
  borderRadius: "10",
  paddingX: "10",
  paddingY: "10",
  width: "600",
  ratio: "1:1",
  aspectRatio: "16/9",
};

const useFormStore = create<FormValue>((set) => ({
  ...defaultValue,
}));

export default useFormStore;
