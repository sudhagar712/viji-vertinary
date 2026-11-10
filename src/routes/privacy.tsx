import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { policyBlocks, policyUpdated } from "@/content/privacy-policy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vige.Dr" },
      {
        name: "description",
        content: "How Vige.Dr collects, uses and protects your personal data.",
      },
      { property: "og:title", content: "Privacy Policy — Vige.Dr" },
      {
        property: "og:description",
        content: "How Vige.Dr collects, uses and protects your personal data.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-36 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <p className="eyebrow mt-10">Legal</p>
        <h1 className="mt-4 font-display text-5xl font-light md:text-6xl">
          Privacy <em className="text-gradient">Policy</em>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {policyUpdated}</p>

        <article className="mt-12 space-y-5 leading-relaxed text-muted-foreground">
          {policyBlocks.map((b, i) => {
            if (b.t === "h2")
              return (
                <h2 key={i} className="pt-8 font-display text-3xl text-foreground">
                  {b.x}
                </h2>
              );
            if (b.t === "h3")
              return (
                <h3 key={i} className="pt-3 text-lg font-semibold text-foreground">
                  {b.x}
                </h3>
              );
            if (b.t === "ul")
              return (
                <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.x}</p>;
          })}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
