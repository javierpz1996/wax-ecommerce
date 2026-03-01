import { MobileDashboard } from "../components/MobileDashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--pac-dark)] md:px-6 md:py-10 lg:px-8 lg:py-12">
      <MobileDashboard />
    </div>
  );
}
