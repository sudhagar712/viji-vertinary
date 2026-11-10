import { Mail, MapPin, Phone, LifeBuoy } from "lucide-react";
import { contact } from "@/content/site";
import { Reveal, Stagger, StaggerItem, WordReveal } from "./Reveal";
import { SocialIcons } from "./SocialIcons";

const rows = [
  { icon: MapPin, label: "Location", value: contact.location, href: undefined },
  { icon: Mail, label: "Admin", value: contact.admin, href: `mailto:${contact.admin}` },
  { icon: LifeBuoy, label: "Support", value: contact.support, href: `mailto:${contact.support}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-16 md:py-36">
      <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:gap-14 md:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">Contact us</p>
          </Reveal>
          <h2 className="mt-5 font-display text-[2.5rem] leading-tight font-light md:text-6xl">
            <WordReveal text="Official" />{" "}
            <em className="text-gradient">
              <WordReveal text="Headquarters" delay={0.12} />
            </em>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-muted-foreground md:mt-6">
              Questions about our apps, partnerships or your pet's records? We'd love to hear from
              you.
            </p>
            <div className="mt-8 md:mt-10">
              <p className="mb-4 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                Follow us
              </p>
              <SocialIcons />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Stagger
            as="ul"
            className="glass-card divide-y divide-border overflow-hidden rounded-3xl"
          >
            {rows.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-foreground/5 text-primary-glow transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {label}
                    </span>
                    <span className="mt-1 block text-[15px] font-semibold break-all sm:break-normal md:text-lg">
                      {value}
                    </span>
                  </span>
                </>
              );
              return (
                <StaggerItem as="li" key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-center gap-4 p-5 transition-colors hover:bg-foreground/[0.03] active:bg-foreground/[0.05] md:gap-5 md:p-7"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 p-5 md:gap-5 md:p-7">{inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
