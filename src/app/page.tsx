import { MobileDashboard } from "../components/MobileDashboard";
import { NewsTicker } from "../components/dashboard";

export default function Home() {
  return (
    <div className="flex min-h-full w-full flex-col bg-[var(--pac-dark)] md:px-6 lg:px-8">
      <NewsTicker />
      <div className="flex flex-1 items-center justify-center">
        <MobileDashboard />
      </div>
    </div>
  );
}
