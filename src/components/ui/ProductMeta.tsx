import { cn } from "@/lib/utils";
import { phaseLabel, type Product } from "@/data/products";
import { formatPrice } from "@/lib/price";

interface ProductMetaProps {
  product: Product;
  className?: string;
}

/**
 * Metadatos editoriales del producto: precio, tagline, activos y fase.
 *
 * Handoff §6: en zonas de compra el producto domina y la fase es contexto, no
 * condición. Por eso la fase va al final, como referencia en texto, y no
 * como etiqueta de color al tope (`PhaseMarker` queda en el repo).
 */
export function ProductMeta({ product, className }: ProductMetaProps) {
  const count = product.ingredients.length;
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {product.price != null && (
        <p className="font-sans text-[13px] tracking-[0.04em] text-foreground">
          {formatPrice(product.price)}
        </p>
      )}
      <p className="font-sans text-sm text-muted-foreground">{product.tagline}</p>
      <p className="font-sans text-[11px] uppercase tracking-wide text-muted-foreground">
        {count > 0 ? `${count} activos` : "Fórmula en desarrollo"}
        {product.phase
          ? ` · Referencia: fase ${phaseLabel[product.phase].toLowerCase()}`
          : " · Niebla de cierre"}
      </p>
    </div>
  );
}
