import { useEffect } from "react";
import { brandCopy } from "@/data/content";

const HOME_TITLE = `${brandCopy.wordmark} — ${brandCopy.tagline}`;

/**
 * Título de la pestaña por página ("Tienda — ORMONIA"). Sin argumento deja el
 * título de marca de la Home. Lo usan también lectores de pantalla y el
 * historial del navegador para distinguir páginas.
 */
export function usePageTitle(title?: string | null) {
  useEffect(() => {
    document.title = title ? `${title} — ${brandCopy.wordmark}` : HOME_TITLE;
  }, [title]);
}
