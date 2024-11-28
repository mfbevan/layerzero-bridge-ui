import { BridgeWidget } from "~/components/bridge/swap-widget";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-white">
      <BridgeWidget />
    </main>
  );
}
