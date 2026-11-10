import { Award, GraduationCap, ShieldCheck, Smartphone, Sparkles, Cloud } from "lucide-react";
import logo from "@/assets/vige-logo.png";
import { Reveal, Stagger, StaggerItem, WordReveal } from "./Reveal";

const credentials = [
  { icon: GraduationCap, label: "M.V.Sc. in Veterinary Medicine" },
  { icon: Smartphone, label: "Expert Android app developer" },
  { icon: Award, label: "Gold medal in startup pitching" },
];

const pillars = [
  { icon: Sparkles, title: "Founded 2021", text: "A proprietary pet-tech startup." },
  { icon: ShieldCheck, title: "Hedera Hashgraph", text: "Immutable, secure health records." },
  { icon: Cloud, title: "Google for Startups", text: "Part of the Cloud Program." },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 md:py-40">
      <div className="pointer-events-none absolute top-1/3 left-[-10%] h-[480px] w-[480px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>
        <h2 className="mt-5 max-w-3xl font-display text-[2.5rem] leading-tight font-light md:text-6xl">
          <WordReveal text="The Founder &" />{" "}
          <em className="text-gradient">
            <WordReveal text="Vige.Dr" delay={0.2} />
          </em>
        </h2>

        <div className="mt-10 grid gap-8 md:mt-16 md:gap-10 lg:grid-cols-12">
          {/* Founder */}
          <Reveal className="lg:col-span-5">
            <article className="glass-card relative h-full overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10">
              <div className="animate-float-slow absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative flex items-center gap-5">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-background/60 p-2.5 md:h-20 md:w-20 md:p-3">
                  <span className="border-shimmer absolute inset-0" />
                  <img
                    src={logo}
                    alt=""
                    aria-hidden
                    className="relative h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    Founder
                  </p>
                  <h3 className="mt-1 font-display text-[1.6rem] leading-tight md:text-3xl">
                    Dr R. Vijayakumar
                  </h3>
                </div>
              </div>
              <p className="relative mt-6 leading-relaxed text-muted-foreground md:mt-8">
                A highly qualified professional holding a Master of Veterinary Science (M.V.Sc.) in
                Veterinary Medicine, an expert Android app developer, and a recipient of a gold
                medal in startup pitching.
              </p>
              <Stagger as="ul" className="relative mt-6 space-y-3 md:mt-8">
                {credentials.map(({ icon: Icon, label }) => (
                  <StaggerItem
                    as="li"
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-foreground/[0.03] px-4 py-3 transition-colors duration-300 hover:border-primary/50"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </article>
          </Reveal>

          {/* Company */}
          <div className="flex flex-col justify-between gap-8 md:gap-10 lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="font-display text-[1.45rem] leading-snug font-light md:text-3xl">
                Vige.Dr is a proprietary technology startup founded in 2021, operating at the
                intersection of{" "}
                <span className="text-gradient">
                  veterinary science and decentralised technology
                </span>
                .
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
                Our mission is to modernise global pet data management through scalable SaaS
                ecosystems. By leveraging Hedera Hashgraph (Web3) infrastructure, Vige.Dr ensures
                that veterinary health records are immutable, secure, and easily accessible. Vige.Dr
                is proud to be part of the Google for Startups Cloud Program, pushing the boundaries
                of what's possible in pet-tech.
              </p>
            </Reveal>
            <Stagger className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {pillars.map(({ icon: Icon, title, text }) => (
                <StaggerItem key={title}>
                  <div className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow sm:block sm:p-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-foreground/5 sm:h-auto sm:w-auto sm:border-0 sm:bg-transparent">
                      <Icon className="h-5 w-5 text-primary-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-6 sm:w-6" />
                    </span>
                    <div>
                      <h4 className="font-semibold sm:mt-5">{title}</h4>
                      <p className="mt-0.5 text-sm text-muted-foreground sm:mt-1">{text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
