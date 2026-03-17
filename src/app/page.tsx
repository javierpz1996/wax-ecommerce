import { MobileDashboard } from "../components/MobileDashboard";
import { NewsTickerWithConfig } from "../components/dashboard";

export default function Home() {
  return (
    <div className="flex w-full flex-col md:px-6 lg:px-8">
      <NewsTickerWithConfig />
      <div className="flex flex-1 min-h-[calc(100dvh-3rem)] items-stretch justify-center md:min-h-0 md:items-center md:py-8">
        <MobileDashboard />
      </div>
    </div>
  );
}
