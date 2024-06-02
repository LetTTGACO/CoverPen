"use client";
import { NextUIProvider } from "@nextui-org/react";
import RenderViewCard from "@/components/card/RenderViewCard";
import FormCard from "@/components/card/FormCard";
import useFormStore from "@/hooks/useFormStore";

export default function Editor() {
  const formValue = useFormStore();
  return (
    <NextUIProvider>
      <div className="flex flex-col-reverse lg:flex-row max-h-layout overflow-y-auto">
        <div className="lg:w-[400px] flex-shrink-0 lg:h-layout bg-white lg:border-r">
          <FormCard />
        </div>
        <div className="w-full py-6 lg:py-0 bg-white px-8 ">
          <div className="overflow-x-auto max-h-layout ">
            <div className="py-16" style={{ minWidth: formValue.width }}>
              <RenderViewCard />
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}
