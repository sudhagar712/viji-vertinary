import { Link } from "@tanstack/react-router";
import logo from "@/assets/vige-logo.png";
import { DEVELOPER_PROFILE_URL } from "@/content/site";
import { SocialIcons } from "./SocialIcons";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 text-center md:grid-cols-3 md:items-center md:gap-10 md:px-6 md:py-14 md:text-left">
        <div>
          <img
            src={logo}
            alt="Vige.Dr logo"
            className="mx-auto h-14 w-auto md:mx-0"
            width={584}
            height={523}
            loading="lazy"
          />
          <p className="mx-auto mt-4 max-w-xs text-sm text-muted-foreground md:mx-0">
            Modernising global pet data management with veterinary science and Web3.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:gap-x-8">
          <Link to="/" hash="about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/" hash="videos" className="text-muted-foreground hover:text-foreground">
            Videos
          </Link>
          <Link to="/" hash="contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <a
            href={DEVELOPER_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Developer profile
          </a>
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
        </nav>
        <div className="flex justify-center md:justify-end">
          <SocialIcons />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-6 text-xs text-muted-foreground md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Vige.Dr. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
