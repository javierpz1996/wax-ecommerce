"use client";

import { useState } from "react";
import {
  BrandLogo,
  LightMenu,
  CurrentNumberDisplay,
  WhatsappButton,
} from "./dashboard";
import { useLightMenuEnabled } from "../hooks/useLightMenuEnabled";

export function MobileDashboard() {
  const [activeLight, setActiveLight] = useState<number | null>(0);
  const { enabled } = useLightMenuEnabled();

  const handleToggle = (index: number) => {
    setActiveLight((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto my-0 md:my-10 flex min-h-screen w-full max-w-sm flex-col gap-4 rounded-[0.5rem] bg-[var(--pac-screen)] px-4 py-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] sm:max-w-md sm:gap-5 md:max-w-lg md:min-h-[820px] md:gap-6 md:px-8 md:py-8 lg:max-w-lg lg:min-h-[900px] lg:gap-6 lg:px-10 lg:py-10">
      <div className="flex w-full justify-center">
      <BrandLogo />
    </div>
  
    <LightMenu
      count={5}
      activeIndex={activeLight}
      onToggle={handleToggle}
      enabled={enabled}
    />
  
    <CurrentNumberDisplay number="+541152357094" />
  
    <WhatsappButton href="https://wa.me/541152357094" />
  
  </div>
  );
}
