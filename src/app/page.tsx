import { PocBanner } from "~/components/banners/poc-banner";
import { BridgeWidget } from "~/components/bridge/bridge-widget";

export default function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <BridgeWidget />
      <PocBanner />
    </main>
  );
}
