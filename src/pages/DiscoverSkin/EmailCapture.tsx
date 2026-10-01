import { useState, type FormEvent } from "react";
import { skinQuizCopy } from "@/data/skinQuiz";

interface EmailCaptureProps {
  onDone: (email: string | null) => void;
}

/**
 * Paso final: guardar la lectura.
 *
 * Todavía no hay proveedor de email conectado. El formulario no envía nada y
 * no simula que lo hizo: al confirmar, el flujo sigue al resultado igual que
 * con "continuar sin guardar", y el email queda disponible para el punto de
 * integración futuro. Es el único lugar a tocar cuando exista el proveedor.
 */
export function EmailCapture({ onDone }: EmailCaptureProps) {
  const [email, setEmail] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onDone(email.trim() || null);
  };

  return (
    <div className="max-w-[460px]">
      <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/66">
        {skinQuizCopy.email.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.04] tracking-[-0.035em]">
        {skinQuizCopy.email.title}
      </h1>
      <p className="mt-5 font-sans text-[14px] leading-relaxed text-ink/68">
        {skinQuizCopy.email.body}
      </p>

      <form onSubmit={onSubmit} className="mt-9 flex flex-col gap-3">
        <label htmlFor="skin-email" className="sr-only">
          {skinQuizCopy.email.placeholder}
        </label>
        <input
          id="skin-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={skinQuizCopy.email.placeholder}
          autoComplete="email"
          className="h-[56px] w-full rounded-[11px] border border-ink/20 bg-transparent px-5 font-sans text-[14px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/45 focus:border-ink/55"
        />
        <button
          type="submit"
          className="h-[56px] w-full rounded-[11px] bg-ink font-sans text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors duration-300 ease-out hover:bg-deepBrown"
        >
          {skinQuizCopy.email.cta}
        </button>
      </form>

      <button
        type="button"
        onClick={() => onDone(null)}
        className="mt-6 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/66 underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
      >
        {skinQuizCopy.email.skip}
      </button>
    </div>
  );
}
