import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { About } from "@/components/site/About";
import { Apps } from "@/components/site/Apps";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { VideoSlider } from "@/components/site/VideoSlider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vige.Dr — Veterinary Science meets Web3" },
      {
        name: "description",
        content:
          "Vige.Dr modernises global pet data management with immutable veterinary health records on Hedera Hashgraph. Founded by Dr R. Vijayakumar, M.V.Sc.",
      },
      { property: "og:title", content: "Vige.Dr — Veterinary Science meets Web3" },
      {
        property: "og:description",
        content:
          "Immutable, secure pet health records and Android apps for veterinarians, built by Vige.Dr.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Apps />
          <VideoSlider />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
