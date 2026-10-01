import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { packCopy } from "@/data/content";
import { cn } from "@/lib/utils";

/** Campo claro de toda la zona comercial. */
const FIELD = "#F2EBDD";
/**
 * HOME 03 — Pack x4 / Ritual completo.
 *
 * Primera pieza de la zona comercial: a partir de acá la Home vive en campo
 * claro y sigue así hasta el shopping de 04B, que usa exactamente el mismo
 * crema. Entre una sección y otra no hay transición ni costura.
 *
 * El campo arranca crema desde el primer píxel: el paso desde El Ciclo es un
 * corte directo, sin rampa cromática. Por eso tampoco hay marcador de tono —
 * el header va en ink desde el borde, que es el valor por defecto.
 *
 * Composición horizontal simple: copy comercial a la izquierda y el visual del
 * pack a la derecha dentro de una forma arqueada tipo portal. Nada de card
 * flotante, escena oscura ni póster centrado.
 *
 * El arco es una caja con `rounded-t-full`: el radio se recorta solo a la mitad
 * del ancho, de modo que el remate superior es un semicírculo exacto y los
 * flancos quedan rectos. La fotografía va a sangre adentro, sin marco ni
 * sombra.
 *
 * En desktop la base es cuadrada —semicírculo arriba, flancos rectos abajo—
 * porque los assets del estuche son apaisados (1200×896): una base más
 * estrecha recortaría la caja por los extremos. Con esta proporción se
 * conserva el 75% del ancho original y el recorte cae sobre fondo vacío.
 *
 * El alto del arco lo gobierna el viewport, así toda la sección entra en una
 * pantalla de desktop sin scroll interno.
 *
 * Hover (desktop, con `motion-safe`): crossfade de la imagen por defecto a la
 * de hover. Sin zoom ni tilt. Si `packCopy.media.hover` es `null`, el visual
 * queda estable y no se monta ninguna transición. El cursor circular global
 * pasa a su variante ivory sobre el arco, vía `data-cursor-tone`.
 *
 * `#pack-x4` es el ancla del CTA del hero.
 *
 * Preparado para Sprint 04+: precio, ahorro frente a comprar los cuatro por
 * separado, assets definitivos de la caja y PDP de Shopify. Sin lógica de
 * compra y sin porcentajes hasta que el pricing los confirme.
 */
export function PackRitualSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  const { media } = packCopy;
  const hoverMedia = media.hover ?? media.primary;
  const hasHoverImage = media.hover !== null;

  return (
    <section
      id="pack-x4"
      aria-labelledby="pack-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: FIELD }}
    >
      <div
        ref={revealRef}
        className="relative mx-auto grid w-full max-w-[1320px] items-center gap-14 px-6 pb-[clamp(72px,10vh,120px)] pt-[clamp(96px,12vh,140px)] md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16"
      >
        {/* Copy comercial. */}
        <div className="text-ink">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/68 md:text-[11px]">
            {packCopy.eyebrow}
          </p>

          <h2
            id="pack-heading"
            className="mt-6 font-display text-[clamp(2.4rem,7vw,3.2rem)] leading-[1] tracking-[-0.035em] md:mt-7 lg:text-[clamp(2.7rem,4vw,3.9rem)] lg:leading-[0.96]"
          >
            {packCopy.titleLines[0]}
            <br />
            <em className="not-italic lg:italic">{packCopy.titleLines[1]}</em>
          </h2>

          <p className="mt-6 max-w-[380px] font-sans text-[13px] leading-relaxed text-ink/64 md:mt-7 md:text-[14px]">
            {packCopy.body}
          </p>

          {/* Precio y ahorro: aparecen recién cuando existan definitivos. */}
          {packCopy.price && (
            <div className="mt-7 flex items-baseline gap-4">
              <span className="font-display text-2xl tracking-[-0.02em]">
                {packCopy.price}
              </span>
              {packCopy.savings && (
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  {packCopy.savings}
                </span>
              )}
            </div>
          )}

          {/*
            Mismo lenguaje que el CTA del hero: marco fino, transparente,
            esquinas moderadas, sin ícono. Navega a la ruta de productos
            existente hasta que exista el PDP del pack.
          */}
          <Link
            to={packCopy.ctaHref}
            data-cursor-expand
            className="mt-9 inline-flex h-[48px] w-fit items-center justify-center rounded-[12px] border border-ink/45 bg-transparent px-7 font-sans text-[11px] uppercase tracking-[0.18em] text-ink transition-[background-color,border-color,color] duration-500 ease-out hover:border-ink hover:bg-ink hover:text-ivory md:h-[52px] md:px-9 md:text-[12px] lg:mt-10"
          >
            {packCopy.cta}
          </Link>
        </div>

        {/* Visual del pack dentro del arco. */}
        <div
          data-cursor-tone="light"
          className="group relative mx-auto aspect-[5/6] w-full max-w-[460px] overflow-hidden rounded-t-full lg:aspect-square lg:h-[clamp(420px,66vh,680px)] lg:w-auto lg:max-w-none"
        >
          <img
            src={media.primary.src}
            alt={media.primary.alt}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center",
              hasHoverImage &&
                "motion-safe:transition-opacity motion-safe:duration-650 motion-safe:ease-out motion-safe:group-hover:opacity-0"
            )}
          />
          {hasHoverImage && (
            <img
              src={hoverMedia.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 motion-safe:transition-opacity motion-safe:duration-650 motion-safe:ease-out motion-safe:group-hover:opacity-100"
            />
          )}
        </div>
      </div>
    </section>
  );
}
