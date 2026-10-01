import { instagramCopy, type InstagramPost } from "@/data/content";

/** Cantidad de piezas visibles en Home. */
export const INSTAGRAM_SLOTS = 3;

/**
 * Fuente de las piezas de Instagram.
 *
 * Hoy devuelve la selección declarada en `instagramCopy.posts` (vacía). Un
 * feed dinámico reemplaza el cuerpo de esta función por un fetch a un
 * endpoint propio que devuelva `InstagramPost[]`; la sección no cambia.
 */
export function getInstagramPosts(): InstagramPost[] {
  return instagramCopy.posts.slice(0, INSTAGRAM_SLOTS);
}
