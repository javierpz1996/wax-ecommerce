"use client";

import { useState } from "react";
import {
  BrandLogo,
  LightMenu,
  CurrentNumberDisplay,
  WhatsappButton,
  SubscripcionEmail,
} from "./dashboard";

export type MobileDashboardProps = {
  logoUrl: string;
  icons: string[];
  enabled: boolean[];
  number: string;
  whatsappHref: string;
  label: string;
  iconUrl: string | null;
  /** Si es false, no se muestra el formulario de suscripción en la home. */
  showEmailSubscription?: boolean;
};

export function MobileDashboard({
  logoUrl,
  icons,
  enabled,
  number,
  whatsappHref,
  label,
  iconUrl,
  showEmailSubscription = true,
}: MobileDashboardProps) {
  const [activeLight, setActiveLight] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveLight((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={`
        mx-auto flex min-h-full w-full max-w-full flex-col gap-2 bg-transparent px-0 py-5 text-white
        rounded-none shadow-none sm:rounded-[0.5rem] sm:bg-[var(--pac-screen)] sm:shadow-[0_8px_24px_rgba(0,0,0,0.6)]
        sm:max-w-xl sm:gap-5 sm:px-6 sm:py-6
        md:my-4 md:max-w-2xl md:gap-6 md:px-8 md:py-8 md:shadow-none
        lg:my-6 lg:max-w-3xl lg:gap-7 lg:px-10 lg:py-10 xl:max-w-4xl xl:px-12
      `}
    >
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
        <CurrentNumberDisplay number={number} />
        <div className="mt-1 w-full flex justify-center md:mt-0">
          <WhatsappButton
            href={whatsappHref}
            label={label}
            iconUrl={iconUrl}
          />
        </div>
        {showEmailSubscription && (
          <div className="mt-8 md:mt-10 w-full flex justify-center">
            <SubscripcionEmail />
          </div>
        )}
      </div>
    </div>
  );
}
