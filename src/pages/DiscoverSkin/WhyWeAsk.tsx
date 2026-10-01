import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { skinQuizCopy } from "@/data/skinQuiz";
import { cn } from "@/lib/utils";

interface WhyWeAskProps {
  explanation: string;
}

/**
 * "¿Por qué te preguntamos esto?" — acordeón mínimo.
 *
 * Colapsado por defecto para no dejar un párrafo permanente bajo cada
 * pregunta. El texto describe la intención, nunca un diagnóstico.
 */
export function WhyWeAsk({ explanation }: WhyWeAskProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-t border-ink/12 pt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 hover:text-ink"
      >
        {skinQuizCopy.whyLabel}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="max-w-[440px] pt-4 font-sans text-[13px] leading-relaxed text-ink/68"
      >
        {explanation}
      </div>
    </div>
  );
}
