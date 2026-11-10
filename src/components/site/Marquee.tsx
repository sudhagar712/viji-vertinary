import { PawPrint } from "lucide-react";

const items = [
  "Veterinary Science",
  "Hedera Hashgraph",
  "Google for Startups",
  "Immutable Health Records",
  "Android Apps",
  "Since 2021",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-5 md:py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(to_right,var(--background),transparent)] md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(to_left,var(--background),transparent)] md:w-40" />
      <div className="animate-marquee flex w-max items-center gap-10 md:gap-16">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 md:gap-16">
            <span className="font-display text-2xl font-light whitespace-nowrap italic md:text-4xl">
              {t}
            </span>
            <PawPrint className="h-5 w-5 text-primary-glow" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
