import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Clock, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { videos, type VideoPost } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal, WordReveal } from "./Reveal";

export function VideoSlider() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState<VideoPost | null>(null);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla || open) return;
    const id = window.setInterval(() => embla.scrollNext(), 6000);
    return () => window.clearInterval(id);
  }, [embla, open]);

  return (
    <section id="videos" className="relative scroll-mt-20 overflow-hidden py-16 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 md:px-6">
        <div>
          <Reveal>
            <p className="eyebrow">Video posts</p>
          </Reveal>
          <h2 className="mt-5 font-display text-[2.5rem] leading-tight font-light md:text-6xl">
            <WordReveal text="Watch" />{" "}
            <em className="text-gradient">
              <WordReveal text="Vige.Dr" delay={0.1} />
            </em>{" "}
            <WordReveal text="in action" delay={0.2} />
          </h2>
        </div>
        <div className="hidden gap-3 md:flex">
          <Button
            variant="glass"
            size="icon-lg"
            aria-label="Previous video"
            onClick={() => embla?.scrollPrev()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="glass"
            size="icon-lg"
            aria-label="Next video"
            onClick={() => embla?.scrollNext()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden md:mt-14" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {videos.map((v, i) => {
            const active = i === selected;
            return (
              <div
                key={v.title}
                className="min-w-0 shrink-0 grow-0 basis-[82%] px-2 sm:basis-[70%] md:basis-[62%] md:px-5"
              >
                <button
                  type="button"
                  onClick={() => (active ? setOpen(v) : embla?.scrollTo(i))}
                  aria-label={`Play: ${v.title}`}
                  className={cn(
                    "group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border text-left transition-all duration-700 ease-out sm:aspect-video",
                    active ? "scale-100 opacity-100 shadow-glow" : "scale-[0.9] opacity-40",
                  )}
                >
                  <img
                    src={v.thumbnail}
                    alt=""
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_5%,transparent_65%)]" />
                  <span className="absolute top-[38%] left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center sm:top-1/2 sm:h-20 sm:w-20 rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                    <Play className="relative ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
                    <div>
                      <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] tracking-[0.2em] uppercase backdrop-blur">
                        {v.tag}
                      </span>
                      <h3 className="mt-3 max-w-lg font-display text-2xl leading-snug md:text-3xl">
                        {v.title}
                      </h3>
                    </div>
                    <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                      <Clock className="h-4 w-4" /> {v.duration}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
        <Button
          variant="glass"
          size="icon"
          className="h-10 w-10 rounded-full md:hidden"
          aria-label="Previous video"
          onClick={() => embla?.scrollPrev()}
        >
          <ArrowLeft />
        </Button>
        <div className="flex gap-2">
          {videos.map((v, i) => (
            <button
              key={v.title}
              type="button"
              aria-label={`Go to video ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === selected ? "w-10 bg-primary" : "w-4 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
        <Button
          variant="glass"
          size="icon"
          className="h-10 w-10 rounded-full md:hidden"
          aria-label="Next video"
          onClick={() => embla?.scrollNext()}
        >
          <ArrowRight />
        </Button>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-border bg-card p-0">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          {open && (
            <div className="aspect-video w-full bg-background">
              {open.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1&rel=0`}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={open.thumbnail}
                    alt=""
                    className="h-full w-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 grid place-items-center p-6 text-center">
                    <div>
                      <p className="eyebrow">Coming soon</p>
                      <p className="mt-3 font-display text-2xl md:text-3xl">{open.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
