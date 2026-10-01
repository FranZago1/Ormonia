import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { parseAnchorHref, scrollToAnchor } from "@/lib/anchor";

interface SiteLinkProps {
  /**
   * Ruta interna ("/products"), ancla de una página ("/#ritmo") o URL externa
   * ("https://…"). `null` = destino que todavía no existe: se muestra como
   * texto inerte, sin inventar navegación.
   */
  href: string | null;
  className?: string;
  /** Clase extra solo para el estado inerte. */
  inertClassName?: string;
  children: ReactNode;
}

/**
 * Link del sitio que entiende los tres tipos de destino que usa la data.
 *
 * - Ancla en la página actual: scroll suave sin recargar.
 * - Ancla en otra página: navega y la página destino resuelve el hash
 *   (ver `useHashScroll`).
 * - Externo: pestaña nueva con `rel="noopener noreferrer"`.
 */
export function SiteLink({ href, className, inertClassName, children }: SiteLinkProps) {
  const location = useLocation();

  if (!href) {
    return (
      <span aria-disabled="true" className={inertClassName ?? className}>
        {children}
      </span>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  const anchor = parseAnchorHref(href);
  if (anchor && anchor.path === location.pathname) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          if (scrollToAnchor(anchor.id)) event.preventDefault();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}
