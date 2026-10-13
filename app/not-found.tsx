import { Button } from "@/components/site/Button";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function NotFound() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-[1400px] px-4 py-28 sm:px-6">
        <p className="label">404</p>
        <h1 className="mt-4 text-4xl tracking-tight">This sector is not on the map.</h1>
        <div className="mt-8">
          <Button href="/">Return</Button>
        </div>
      </div>
    </MarketingShell>
  );
}
