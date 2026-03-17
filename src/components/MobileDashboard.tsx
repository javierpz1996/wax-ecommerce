"use client";

import { useState } from "react";
import {
  BrandLogo,
  LightMenu,
  CurrentNumberDisplay,
  WhatsappButton,
  SubscripcionEmail,
} from "./dashboard";
import { useLightIcons } from "../hooks/useLightIcons";
import { useLightMenuEnabled } from "../hooks/useLightMenuEnabled";
import { useLogoUrl } from "../hooks/useLogoUrl";
import { useWhatsappNumber } from "../hooks/useWhatsappNumber";

export function MobileDashboard() {
  const [activeLight, setActiveLight] = useState<number | null>(0);
  const { enabled } = useLightMenuEnabled();
  const { logoUrl } = useLogoUrl();
  const { icons } = useLightIcons();
  const { number: whatsappNumber, whatsappHref, label: whatsappLabel } =
    useWhatsappNumber();

  const handleToggle = (index: number) => {
    setActiveLight((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-col gap-2 rounded-[0.5rem] bg-[var(--pac-screen)] px-4 py-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] sm:max-w-md sm:gap-5 md:my-10 md:max-w-lg md:min-h-[820px] md:gap-6 md:px-8 md:py-8 lg:max-w-lg lg:min-h-[900px] lg:gap-6 lg:px-10 lg:py-10">
      <div className="flex w-full justify-center">
      <BrandLogo src={logoUrl} />
    </div>
  
    <LightMenu
      count={5}
      activeIndex={activeLight}
      onToggle={handleToggle}
      icons={icons}
      enabled={enabled}
    />

    <div className="mt-10 md:mt-12 flex flex-col items-center gap-6 md:gap-7">
      <CurrentNumberDisplay number={whatsappNumber} />
      <div className="mt-6 md:mt-8 w-full flex justify-center">
        <WhatsappButton href={whatsappHref} label={whatsappLabel} />
      </div>
      <div className="mt-8 md:mt-10 w-full flex justify-center">
        <SubscripcionEmail />
      </div>
    </div>
  
  </div>
  );
}
