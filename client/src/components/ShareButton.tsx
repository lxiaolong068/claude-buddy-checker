/**
 * ShareButton - CRT-styled button to trigger share card generation
 * Used in both BuddyResultCard and SpeciesDetail pages
 */

import { useI18n } from "@/contexts/I18nContext";

interface ShareButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ShareButton({ onClick, variant = "primary", className = "" }: ShareButtonProps) {
  const { t } = useI18n();

  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98]";

  const variantClasses = variant === "primary"
    ? "bg-crt-green/10 border border-crt-green/40 text-crt-green hover:bg-crt-green/20 hover:border-crt-green/60"
    : "bg-crt-amber/10 border border-crt-amber/40 text-crt-amber hover:bg-crt-amber/20 hover:border-crt-amber/60";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      {t("share.button")}
    </button>
  );
}
