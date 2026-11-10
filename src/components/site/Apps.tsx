import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BadgeCheck, ClipboardList, HeartPulse } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { DEVELOPER_ID, DEVELOPER_PROFILE_URL } from "@/content/site";
import { Reveal, WordReveal } from "./Reveal";

export function Apps() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="apps" className="relative scroll-mt-20 py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-6 [perspective:1400px]">
        <Reveal>
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={{ rotateX: rx, rotateY: ry }}
            className="glass-card relative overflow-hidden rounded-[2rem] px-6 py-10 text-center [transform-style:preserve-3d] sm:p-10 md:p-16"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-1/2 h-full w-1/2 -translate-x-1/2 rounded-full bg-primary-glow/20 blur-[90px]"
              style={{ left: glowX }}
            />
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]" />
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
              className="relative inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-semibold text-success"
            >
              <BadgeCheck className="h-4 w-4" /> Google Play Verified
            </motion.span>
            <h2 className="relative mt-6 font-display text-[2.4rem] leading-tight font-light md:text-5xl">
              <WordReveal text="Mobile" />{" "}
              <em className="text-gradient">
                <WordReveal text="Development" delay={0.15} />
              </em>
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Vige.Dr develops proprietary Android applications ensuring professional standards in
              data entry and storage.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {[
                { icon: ClipboardList, label: "Pet Registration Form" },
                { icon: HeartPulse, label: "Pet Health Form" },
              ].map(({ icon: Icon, label }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-primary-glow" /> {label}
                </motion.span>
              ))}
            </div>
            <div className="relative mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
              <span>Developer ID</span>
              <code className="rounded-lg border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-foreground sm:text-sm">
                {DEVELOPER_ID}
              </code>
            </div>
            <Button
              asChild
              variant="hero"
              size="xl"
              className="relative mt-8 w-full sm:mt-10 sm:w-auto"
            >
              <a href={DEVELOPER_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                View developer profile <ArrowUpRight />
              </a>
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
