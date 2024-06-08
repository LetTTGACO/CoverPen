import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        layout: "calc(100vh - 64px)",
      },
      width: {
        layout: "calc(100vw - 400px)",
      },
      minWidth: {
        layout: "calc(100vw - 400px)",
      },
      maxHeight: {
        layout: "calc(100vh - 64px)",
      },
    },
  },
};
export default config;
