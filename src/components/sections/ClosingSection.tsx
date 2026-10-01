import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { closingCopy } from "@/data/content";

/**
 * HOME 09 — Cierre "Unite al ritual".
 *
 * Único plano oscuro después de la zona clara: es el final de la página y
 * continúa sin corte en el footer, que comparte el mismo campo. Un titular,
 * la frase de marca y dos salidas —el diagnóstico y El Registro—; nada más.
 */
export function ClosingSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="unite-al-ritual"
      aria-labelledby="closing-heading"
      data-header-tone="light"
      className="bg-deepBrown px-6 pb-24 pt-[clamp(112px,16vh,184px)] text-center text-ivory md:px-10 md:pb-32"
    >
      <div ref={ref} className="mx-auto flex w-full max-w-[880px] flex-col items-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/62 md:text-[11px]">
          {closingCopy.eyebrow}
        </p>
        <h2
          id="closing-heading"
          className="mt-6 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.95] tracking-[-0.04em] md:mt-8"
        >
          {closingCopy.title}
        </h2>
        <p className="mt-6 max-w-[420px] font-sans text-[14px] leading-relaxed text-ivory/72 md:mt-8 md:text-[15px]">
          {closingCopy.body}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-12">
          {closingCopy.links.map((link) => (
            <SiteLink
              key={link.label}
              href={link.href}
              className="inline-flex h-[48px] min-w-[220px] items-center justify-center rounded-[12px] border border-ivory/45 px-7 font-sans text-[11px] uppercase tracking-[0.18em] text-ivory transition-[background-color,border-color,color] duration-500 ease-out hover:border-ivory hover:bg-ivory hover:text-ink md:h-[52px] md:text-[12px]"
            >
              {link.label}
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
