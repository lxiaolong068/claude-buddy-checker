/**
 * PageTransition - Re-triggers CRT boot animation on every route change.
 *
 * Strategy: keep the wrapper div mounted at all times so there's no layout
 * flash; when `location` changes the new page content is already in the DOM,
 * and we reset + restart the CSS animation via a forced reflow.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "wouter";

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  const [location] = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Remove class → force reflow → re-add to restart @keyframes
    el.classList.remove("page-transition-enter");
    void el.offsetWidth; // eslint-disable-line @typescript-eslint/no-unused-expressions
    el.classList.add("page-transition-enter");
  }, [location]);

  return (
    <div ref={ref} className="page-transition-enter">
      {children}
    </div>
  );
}
