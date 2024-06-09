import { create } from "zustand";
import { FormValue } from "@/types";

export const defaultValue = {
  title: "Blog Title",
  author: "Cody",
  theme: "basic",
  icon: "react",
  customIcon: "",
  font: "font-sans",
  background: {
    type: "color",
    value: "linear-gradient(135deg, rgb(181, 21, 59) 0%, rgb(235, 194, 47) 100%)",
  },
  borderRadius: "10",
  width: "600",
  ratio: "1:1",
  aspectRatio: "16/9",
};

const useFormStore = create<FormValue>((set) => ({
  ...defaultValue,
}));

export default useFormStore;
