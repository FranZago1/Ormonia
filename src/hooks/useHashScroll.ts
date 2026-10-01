import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToAnchor } from "@/lib/anchor";

/** Tiempo para que GSAP monte los pins antes de medir el destino. */
const SETTLE_MS = 450;

/**
 * Al llegar a una página con hash ("/#ritmo" desde otra ruta), desplaza hasta
 * el ancla. Espera a que ScrollTrigger cree los pins: si se mide antes, las
 * posiciones de las secciones pinneadas todavía no son las reales.
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToAnchor(id);
    }, SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [hash]);
}
