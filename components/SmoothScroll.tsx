"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrap the app in this once, in app/layout.tsx.
 * Syncs Lenis's smooth-scroll loop with GSAP's ticker so ScrollTrigger
 * animations never jitter out of phase with the scroll position.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ lenis?: { raf: (time: number) => void } } | null>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => gsap.ticker.remove(update);
  }, [reducedMotion]);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.2, syncTouch: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}

// Optional helper — call inside any client component to react to scroll progress
export function useScrollProgress(onScroll: (progress: number) => void) {
  useLenis((lenis) => onScroll(lenis.progress));
}
