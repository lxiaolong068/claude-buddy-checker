/**
 * ShareCardModal - Preview, download, copy, and share generated card images
 * Design: CRT terminal-style modal with canvas preview
 * Fix: previewRef is always mounted so canvas can be appended during async render
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useI18n } from "@/contexts/I18nContext";
import {
  type ShareCardData,
  renderBuddyShareCard,
  renderSpeciesShareCard,
  downloadCanvas,
  copyCanvasToClipboard,
  shareCanvas,
} from "@/lib/share-card-renderer";

interface ShareCardModalProps {
  data: ShareCardData | null;
  onClose: () => void;
}

export default function ShareCardModal({ data, onClose }: ShareCardModalProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const render = useCallback(async () => {
    if (!data) return;
    setIsRendering(true);
    try {
      let canvas: HTMLCanvasElement;
      if (data.type === "buddy") {
        canvas = await renderBuddyShareCard({ ...data, showPetitionBadge: showBadge });
      } else {
        canvas = await renderSpeciesShareCard(data);
      }
      canvasRef.current = canvas;

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (previewRef.current) {
          previewRef.current.innerHTML = "";
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          previewRef.current.appendChild(canvas);
        }
        setIsRendering(false);
      });
    } catch (err) {
      console.error("Failed to render share card:", err);
      setIsRendering(false);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      render();
      setCanShare(!!navigator.share);
    }
    return () => {
      // Cleanup on close
      canvasRef.current = null;
      setCopied(false);
    };
  }, [data, render, showBadge]);

  // Close on Escape
  useEffect(() => {
    if (!data) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, data]);

  if (!data) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const name = data.type === "buddy"
      ? `claude-buddy-${Date.now()}.png`
      : `claude-buddy-species-${Date.now()}.png`;
    downloadCanvas(canvasRef.current, name);
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    const ok = await copyCanvasToClipboard(canvasRef.current);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    await shareCanvas(
      canvasRef.current,
      "Claude Buddy",
      "Check your Claude Code Buddy!"
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl border border-border bg-card animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
          <span className="w-2.5 h-2.5 rounded-full bg-crt-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-crt-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-crt-green" />
          <span className="ml-3 text-xs text-muted-foreground uppercase tracking-widest flex-1">
            {t("share.modalTitle")}
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            aria-label="Close"
          >
            [ESC]
          </button>
        </div>

        {/* Preview Area - always mounted so canvas can be appended */}
        <div className="p-4">
          <div
            ref={previewRef}
            className="border border-border/30 overflow-hidden min-h-[120px] flex items-center justify-center"
          >
            {isRendering && (
              <div className="text-sm text-muted-foreground animate-pulse py-12">
                {t("share.rendering")}
              </div>
            )}
          </div>
        </div>

        {/* Petition Badge Toggle — only shown for buddy cards */}
        {data.type === "buddy" && (
          <div className="mx-4 mb-3 px-3 py-2 border border-crt-amber/30 bg-crt-amber/5 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-crt-amber tracking-wider">
                ★ {t("share.badgeToggleLabel")}
              </span>
              <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                {t("share.badgeToggleHint")}
              </span>
            </div>
            <button
              onClick={() => setShowBadge((v) => !v)}
              className={`shrink-0 px-3 py-1 text-xs font-bold border transition-all font-mono tracking-wider ${
                showBadge
                  ? "border-crt-amber bg-crt-amber/20 text-crt-amber"
                  : "border-border/40 text-muted-foreground/50 hover:border-crt-amber/40 hover:text-crt-amber/60"
              }`}
            >
              {showBadge ? t("share.badgeOn") : t("share.badgeOff")}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 px-4 pb-4">
          <button
            onClick={handleDownload}
            disabled={isRendering}
            className="flex-1 min-w-[120px] px-4 py-2.5 bg-crt-green/10 border border-crt-green/40 text-crt-green text-xs font-semibold uppercase tracking-wider hover:bg-crt-green/20 hover:border-crt-green/60 transition-all disabled:opacity-50"
          >
            {t("share.download")}
          </button>
          <button
            onClick={handleCopy}
            disabled={isRendering}
            className="flex-1 min-w-[120px] px-4 py-2.5 bg-crt-amber/10 border border-crt-amber/40 text-crt-amber text-xs font-semibold uppercase tracking-wider hover:bg-crt-amber/20 hover:border-crt-amber/60 transition-all disabled:opacity-50"
          >
            {copied ? t("share.copied") : t("share.copy")}
          </button>
          {canShare && (
            <button
              onClick={handleShare}
              disabled={isRendering}
              className="flex-1 min-w-[120px] px-4 py-2.5 bg-crt-blue/10 border border-crt-blue/40 text-crt-blue text-xs font-semibold uppercase tracking-wider hover:bg-crt-blue/20 hover:border-crt-blue/60 transition-all disabled:opacity-50"
            >
              {t("share.shareBtn")}
            </button>
          )}
        </div>

        {/* Hint */}
        <div className="px-4 pb-3 text-center">
          <p className="text-[10px] text-muted-foreground/60">
            {t("share.hint")}
          </p>
        </div>
      </div>
    </div>
  );
}
