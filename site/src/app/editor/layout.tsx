import React from "react";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      {/*header*/}
      <div className="flex items-center justify-between w-full h-16 px-4 bg-white shadow-sm border-b">
        <div className="text-lg font-bold">Editor</div>
        <div className="flex items-center space-x-4">
          <button className="btn">Save</button>
          <button className="btn">Publish</button>
        </div>
      </div>
      {children}
    </div>
  );
}
