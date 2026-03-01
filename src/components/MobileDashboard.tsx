"use client";

import { useState } from "react";
import {
  NewsTicker,
  BrandLogo,
  LightMenu,
  CurrentNumberDisplay,
  WhatsappButton,
  InfoText,
} from "./dashboard";

export function MobileDashboard() {
  const [activeLight, setActiveLight] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveLight((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto flex min-h-[640px] w-full max-w-sm flex-col gap-4 rounded-[0.5rem] bg-[var(--pac-screen)] px-4 py-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] sm:max-w-md sm:gap-5 md:max-w-lg md:min-h-[820px] md:gap-6 md:px-8 md:py-8 lg:max-w-lg lg:min-h-[900px] lg:gap-6 lg:px-10 lg:py-10">
      <NewsTicker />
      <div className="flex w-full justify-center">
        <BrandLogo />
      </div>
      <LightMenu
        count={5}
        activeIndex={activeLight}
        onToggle={handleToggle}
      />
      <CurrentNumberDisplay number="+541152357094" />
      <WhatsappButton href="https://wa.me/541152357094" />
      <div className="mt-6 md:mt-10">
        <InfoText />
      </div>
    </div>
  );
}
