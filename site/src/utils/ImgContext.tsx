import React, { createContext, useState } from "react";
const ImgContext = createContext(undefined);

const ImgProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [unsplashImage, setUnsplashImage] = useState();

  // @ts-ignore
  return <ImgContext.Provider value={{ unsplashImage, setUnsplashImage }}>{children}</ImgContext.Provider>;
};

export { ImgProvider, ImgContext };
