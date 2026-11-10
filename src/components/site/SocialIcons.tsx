import { Instagram } from "lucide-react";
import { instagram } from "@/content/site";
import { cn } from "@/lib/utils";

export function SocialIcons({ className }: { className?: string }) {
  return (
    <a
      href={instagram.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow Vige.Dr on Instagram (${instagram.handle})`}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-border bg-foreground/5 py-1.5 pr-5 pl-1.5 text-sm font-semibold transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,color-mix(in_oklab,var(--primary-glow)_25%,transparent),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-12">
        <Instagram className="h-4 w-4" />
      </span>
      <span className="relative">{instagram.handle}</span>
    </a>
  );
}
