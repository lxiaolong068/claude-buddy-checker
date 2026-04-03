/**
 * useKeyboardShortcuts — global keydown shortcut binding
 *
 * Handlers run when their key is pressed, with two guards:
 *  - Typing guard: skips non-Escape keys while focus is in an editable element
 *  - Modifier guard: skips when Ctrl / Meta / Alt is held (avoids clobbering
 *    browser or OS shortcuts)
 *
 * Usage:
 *   useKeyboardShortcuts({
 *     "/":      (e) => { e.preventDefault(); inputRef.current?.focus(); },
 *     "Escape": ()  => closeModal(),
 *     "Enter":  ()  => submit(),
 *   });
 */

import { useEffect, useRef } from "react";

type ShortcutMap = Record<string, (e: KeyboardEvent) => void>;

function isEditableTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  const tag = (el as Element).tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return (el as HTMLElement).isContentEditable === true;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap): void {
  // Keep latest shortcuts in a ref so the effect never needs to re-run
  const shortcutsRef = useRef<ShortcutMap>(shortcuts);
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  });

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      // Skip when a modifier is held (Ctrl+S, Cmd+K, etc.)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Skip typing-target guard for all keys except Escape
      if (e.key !== "Escape" && isEditableTarget(e.target)) return;

      const fn = shortcutsRef.current[e.key];
      if (fn) fn(e);
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // intentionally empty — ref holds latest handlers
}
