import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  label: string;
  selected: boolean;
  multi: boolean;
  onSelect: () => void;
}

/**
 * Una respuesta.
 *
 * Es un botón real con semántica de radio o checkbox según el tipo de
 * pregunta, así el lector de pantalla anuncia si la elección es excluyente y
 * si está activa. La selección no se comunica solo por color: el estado
 * activo cambia fondo, texto y borde a la vez, y `aria-checked` lo expone.
 */
export function AnswerOption({
  label,
  selected,
  multi,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "rounded-[12px] border px-5 py-3.5 text-left font-sans text-[14px] leading-snug transition-[background-color,border-color,color] duration-300 ease-out",
        selected
          ? "border-ink bg-ink text-ivory"
          : "border-ink/18 bg-transparent text-ink hover:border-ink/45"
      )}
    >
      {label}
    </button>
  );
}
