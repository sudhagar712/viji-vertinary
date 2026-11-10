import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, type CSSProperties, type MouseEvent } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import heroDog from "@/assets/hero-dog.png";
import { Button } from "@/components/ui/button";
import { DEVELOPER_PROFILE_URL } from "@/content/site";
import { WordReveal } from "./Reveal";

// Deterministic so server and browser render the same particles.
const particles = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${30 + ((i * 53) % 65)}%`,
  size: 2 + (i % 3),
  dur: `${7 + (i % 5) * 1.6}s`,
  delay: `${(i % 7) * -1.3}s`,
  dx: `${((i % 5) - 2) * 18}px`,
}));

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const dogY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const dogScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -18);
  const bgYm = useTransform(sy, (v) => v * -12);
  const dogX = useTransform(sx, (v) => v * 26);
  const dogYm = useTransform(sy, (v) => v * 14);
  const wordX = useTransform(sx, (v) => v * -40);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative h-[100svh] min-h-[600px] overflow-hidden"
    >
      {/* Layer 1: atmosphere */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
          style={{ x: bgX, y: bgYm }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,var(--background)_75%)] opacity-70" />

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="animate-drift absolute rounded-full bg-primary-glow shadow-glow"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--dur": p.dur,
                "--delay": p.delay,
                "--dx": p.dx,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Layer 2: giant wordmark */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[42%] flex justify-center select-none md:top-[18%]"
        style={{ y: wordY, x: wordX, opacity: fade }}
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "-0.04em" }}
          transition={{ duration: 2, ease }}
          className="font-display text-[34vw] leading-none font-light text-foreground/[0.05] italic md:text-[26vw]"
        >
          Vige.Dr
        </motion.span>
      </motion.div>

      {/* Layer 3: subject (centered on phones, right on desktop) */}
      <div className="absolute inset-x-0 bottom-0 flex h-[50%] justify-center sm:h-[62%] md:h-[88%] md:justify-end md:pr-[6%]">
        <motion.div className="relative h-full" style={{ y: dogY, scale: dogScale, x: dogX }}>
          <div
            aria-hidden
            className="absolute top-[8%] left-1/2 aspect-square w-[95%] -translate-x-1/2 rounded-full p-px opacity-60 md:w-[85%]"
          >
            <div className="glow-ring animate-spin-slow h-full w-full rounded-full blur-2xl" />
          </div>
          <motion.img
            src={heroDog}
            alt="Golden retriever in violet studio light"
            width={817}
            height={1132}
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.3 }}
            className="relative h-full w-auto object-contain drop-shadow-[0_30px_60px_var(--primary)]"
            style={{ y: dogYm }}
          />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-[image:var(--gradient-fade)] md:h-48" />

      {/* Layer 4: copy */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pt-28 text-center sm:pt-32 md:justify-center md:px-6 md:pt-0 md:text-left"
        style={{ y: copyY, opacity: fade }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Veterinary science × Web3
        </motion.p>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-[2.6rem] leading-[1.02] font-light tracking-tight sm:text-6xl md:mx-0 md:mt-6 md:text-7xl lg:text-8xl">
          <WordReveal text="Every pet's health," animateOnMount delay={0.45} />{" "}
          <em className="text-gradient">
            <WordReveal text="on record forever." animateOnMount delay={0.75} />
          </em>
        </h1>
        <motion.div
          className="mt-7 flex flex-wrap justify-center gap-3 md:mt-10 md:justify-start md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button asChild variant="hero" size="xl" className="h-11 px-5 md:h-12 md:px-7">
            <a href={DEVELOPER_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              View developer profile <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="glass" size="xl" className="hidden md:inline-flex">
            <a href="#about">Our story</a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:flex flex-col items-center gap-2 md:bottom-8">
        <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="animate-scroll-cue absolute top-0 left-0 h-4 w-px bg-primary-glow" />
        </span>
      </div>
    </section>
  );
}
