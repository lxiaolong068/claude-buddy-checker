/**
 * LazyImage - Performance-optimized image component
 * Features:
 * - Native lazy loading with IntersectionObserver fallback
 * - Fade-in animation on load
 * - Placeholder skeleton while loading
 * - Explicit width/height to prevent CLS
 * - decoding="async" for non-blocking decode
 */

import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean; // true = eager load (LCP images)
  placeholder?: "skeleton" | "blur" | "none";
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "skeleton",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for non-priority images
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // Start loading 200px before viewport
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const aspectRatio = `${width} / ${height}`;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton placeholder */}
      {placeholder === "skeleton" && !isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "linear-gradient(90deg, rgba(51,255,51,0.03) 25%, rgba(51,255,51,0.08) 50%, rgba(51,255,51,0.03) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto transition-opacity duration-500 ${
            isLoaded ? "opacity-90" : "opacity-0"
          }`}
          style={{ aspectRatio }}
        />
      )}
    </div>
  );
}
