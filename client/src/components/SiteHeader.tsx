/**
 * SiteHeader — Unified sticky navigation bar
 * Replaces all page-level Top Bar / nav sections.
 * Structure: Brand | Tools · Species · Blog     ThemeToggle LanguageSwitcher
 */

import { useLocation, Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

// ── Nav link ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  href:        string;
  label:       string;
  current:     string;
  exact?:      boolean;
  mobileHide?: boolean;
}

function NavLink({ href, label, current, exact = false, mobileHide = false }: NavLinkProps) {
  const active = exact ? current === href : current === href || current.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`text-[10px] uppercase tracking-widest transition-colors px-1.5 py-0.5 rounded-sm whitespace-nowrap ${
        mobileHide ? "hidden sm:inline-block" : ""
      } ${
        active
          ? "text-crt-green glow-text"
          : "text-crt-green/40 hover:text-crt-green/80"
      }`}
    >
      {label}
    </Link>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <span className="text-crt-green/15 text-[10px] select-none hidden sm:inline">·</span>
  );
}

// ── Main header ───────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-crt-green/15 bg-background/95 backdrop-blur-sm">
      <div className="max-w-[900px] mx-auto px-4 h-10 flex items-center justify-between gap-2">

        {/* Left: brand + nav */}
        <nav className="flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-none">
          {/* Brand */}
          <Link
            href="/"
            className="text-crt-green text-[11px] font-bold tracking-[0.2em] mr-2 shrink-0 glow-text select-none"
          >
            BUDDY
          </Link>

          {/* Tools group */}
          <NavLink href="/"                  label="CHECKER"    current={location} exact />
          <NavLink href="/collection"        label="COLLECTION" current={location} mobileHide />
          <NavLink href="/compare"           label="COMPARE"    current={location} mobileHide />
          <NavLink href="/powerup-tracker"   label="/POWERUP"   current={location} mobileHide />

          <Divider />

          {/* Revive — highlighted in amber */}
          <Link
            href="/revive"
            className={`text-[10px] uppercase tracking-widest transition-colors px-1.5 py-0.5 rounded-sm whitespace-nowrap font-bold ${
              location === "/revive"
                ? "text-crt-amber"
                : "text-crt-amber/50 hover:text-crt-amber/80"
            }`}
          >
            REVIVE
          </Link>

          {/* Hidden Features / Leak — purple */}
          <Link
            href="/hidden-features"
            className={`text-[10px] uppercase tracking-widest transition-colors px-1.5 py-0.5 rounded-sm whitespace-nowrap hidden sm:inline-block ${
              location === "/hidden-features"
                ? "text-crt-purple"
                : "text-crt-purple/40 hover:text-crt-purple/70"
            }`}
          >
            LEAK
          </Link>

          <Divider />

          {/* Discovery group */}
          <NavLink href="/species" label="SPECIES" current={location} />
          <NavLink href="/blog"    label="BLOG"    current={location} />
        </nav>

        {/* Right: controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  );
}
