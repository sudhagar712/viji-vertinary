import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/vige-logo.png";
import { Button } from "@/components/ui/button";
import { DEVELOPER_PROFILE_URL } from "@/content/site";
import { cn } from "@/lib/utils";
import { SocialIcons } from "./SocialIcons";

const nav = [
  { label: "About", hash: "about" },
  { label: "Apps", hash: "apps" },
  { label: "Videos", hash: "videos" },
  { label: "Contact", hash: "contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-border bg-background/75 py-3 backdrop-blur-xl"
            : "py-5 md:py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-6">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Vige.Dr home"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="Vige.Dr logo"
              className="h-10 w-auto md:h-12"
              width={584}
              height={523}
            />
          </Link>
          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((n) => (
              <Link
                key={n.hash}
                to="/"
                hash={n.hash}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-primary-glow transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <Button asChild variant="glass" size="sm" className="hidden h-9 px-5 md:inline-flex">
            <Link to="/" hash="contact">
              Get in touch
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-foreground/5 backdrop-blur md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-primary"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-background/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
            <nav className="relative flex flex-col">
              {nav.map((n, i) => (
                <motion.div
                  key={n.hash}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border"
                >
                  <Link
                    to="/"
                    hash={n.hash}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="font-display text-4xl font-light">{n.label}</span>
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="relative mt-auto space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button asChild variant="hero" size="xl" className="w-full">
                <a href={DEVELOPER_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  View developer profile <ArrowUpRight />
                </a>
              </Button>
              <div className="flex justify-center">
                <SocialIcons />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
