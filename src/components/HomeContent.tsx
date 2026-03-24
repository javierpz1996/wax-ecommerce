"use client";

import { useNewsTickerText } from "@/hooks/useNewsTickerText";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";
import { useLightIcons } from "@/hooks/useLightIcons";
import { useLogoUrl } from "@/hooks/useLogoUrl";
import { useLightMenuEnabled } from "@/hooks/useLightMenuEnabled";
import { useAppUiConfig } from "@/hooks/useAppUiConfig";
import { NewsTicker } from "./dashboard/NewsTicker";
import { MobileDashboard } from "./MobileDashboard";
import { AppLoadingScreen } from "./AppLoadingScreen";

export function HomeContent() {
  const newsTicker = useNewsTickerText();
  const whatsapp = useWhatsappNumber();
  const lightIcons = useLightIcons();
  const logo = useLogoUrl();
  const lights = useLightMenuEnabled();
  const appUi = useAppUiConfig();

  const ready =
    !newsTicker.loading &&
    !whatsapp.loading &&
    !lightIcons.loading &&
    !logo.loading &&
    !lights.loading &&
    !appUi.loading;

  if (!ready) {
    return <AppLoadingScreen />;
  }

  return (
    <>
      <NewsTicker
        text={newsTicker.text}
        speedMultiplier={newsTicker.speedPercent / 100}
      />
      <div className="flex min-h-[calc(100dvh-3rem)] w-full flex-1 flex-col items-stretch justify-center md:min-h-0 md:py-6 lg:items-center lg:py-8 xl:py-10">
        <MobileDashboard
          logoUrl={logo.logoUrl}
          icons={lightIcons.icons}
          enabled={lights.enabled}
          number={whatsapp.number}
          whatsappHref={whatsapp.whatsappHref}
          label={whatsapp.label}
          iconUrl={whatsapp.iconUrl}
          showEmailSubscription={appUi.showEmailSubscription}
        />
      </div>
    </>
  );
}
