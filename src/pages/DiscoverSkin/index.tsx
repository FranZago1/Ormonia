import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skinQuizCopy, skinQuizQuestions } from "@/data/skinQuiz";
import { useSkinQuiz } from "@/hooks/useSkinQuiz";
import { cn } from "@/lib/utils";
import { AnswerOption } from "./AnswerOption";
import { DiscoverShell } from "./DiscoverShell";
import { EmailCapture } from "./EmailCapture";
import { WhyWeAsk } from "./WhyWeAsk";

/** Duración del relevo entre pasos. La salida ocupa la primera mitad. */
const LEAVE_MS = 190;

/**
 * /descubri-tu-piel — la experiencia.
 *
 * Una pregunta por pantalla sobre un split persistente. El paso no se
 * reemplaza de golpe: el contenido actual se va hacia arriba mientras el
 * siguiente entra desde abajo, y la barra de progreso avanza en el mismo
 * movimiento.
 *
 * El estado vive en `useSkinQuiz`; el contenido en `data/skinQuiz`; la lógica
 * de opciones en `lib/skinQuiz`. Esta vista solo presenta y encamina.
 */
const DiscoverSkin = () => {
  const navigate = useNavigate();
  const quiz = useSkinQuiz(skinQuizQuestions);
  const [leaving, setLeaving] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setLeaving(false), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  /** Encadena salida → cambio de paso, para que no haya recarga visual. */
  const transition = useCallback(
    (move: () => void) => {
      if (reduced) {
        move();
        return;
      }
      setLeaving(true);
      window.setTimeout(move, LEAVE_MS);
    },
    [reduced]
  );

  const onNext = () => {
    if (!quiz.canAdvance) {
      quiz.next(); // deja el aviso sutil, no avanza
      return;
    }
    transition(() => quiz.next());
  };

  const finish = (email: string | null) => {
    navigate("/descubri-tu-piel/resultado", {
      state: { answers: quiz.answers, email },
    });
  };

  const stepLabel = `${String(quiz.step + 1).padStart(2, "0")} / ${String(
    quiz.totalSteps
  ).padStart(2, "0")}`;

  return (
    <DiscoverShell
      visualGroup={quiz.visualGroup}
      progress={quiz.progress}
      stepLabel={stepLabel}
    >
      <div className="flex flex-1 flex-col justify-between gap-10 px-6 py-10 md:px-12 lg:px-16 lg:py-14">
        <div
          key={quiz.question?.id ?? "email"}
          className={cn(
            "flex-1 motion-safe:transition-[opacity,transform] motion-safe:duration-380 motion-safe:ease-out",
            leaving
              ? "opacity-0 motion-safe:-translate-y-3"
              : "opacity-100 motion-safe:translate-y-0"
          )}
        >
          {quiz.isEmailStep ? (
            <EmailCapture onDone={finish} />
          ) : (
            quiz.question && (
              <div className="max-w-[560px]">
                <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/50">
                  {quiz.question.category}
                </p>
                <h1 className="mt-6 font-display text-[clamp(1.75rem,2.9vw,2.5rem)] leading-[1.1] tracking-[-0.03em]">
                  {quiz.question.question}
                </h1>
                {quiz.question.helper && (
                  <p className="mt-4 font-sans text-[13px] leading-relaxed text-ink/60">
                    {quiz.question.helper}
                  </p>
                )}

                <div
                  role={quiz.question.type === "multi" ? "group" : "radiogroup"}
                  aria-label={quiz.question.question}
                  className="mt-9 flex flex-wrap gap-2.5"
                >
                  {quiz.options.map((option) => (
                    <AnswerOption
                      key={option.id}
                      label={option.label}
                      multi={quiz.question?.type === "multi"}
                      selected={quiz.selected.includes(option.id)}
                      onSelect={() => quiz.select(option.id)}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {!quiz.isEmailStep && quiz.question && (
          <div className="flex flex-col gap-7">
            <div
              aria-live="polite"
              className="flex flex-wrap items-center gap-5"
            >
              <button
                type="button"
                onClick={() => transition(quiz.back)}
                disabled={!quiz.canGoBack}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/55 transition-colors duration-300 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                {skinQuizCopy.back}
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-disabled={!quiz.canAdvance}
                className={cn(
                  "h-[52px] rounded-[11px] px-9 font-sans text-[12px] uppercase tracking-[0.2em] transition-[background-color,opacity,color] duration-300 ease-out",
                  quiz.canAdvance
                    ? "bg-ink text-ivory hover:bg-deepBrown"
                    : "bg-ink/35 text-ivory"
                )}
              >
                {skinQuizCopy.next}
              </button>

              {quiz.showRequiredHint && (
                <span className="font-sans text-[11px] text-ink/60">
                  {skinQuizCopy.requiredHint}
                </span>
              )}
            </div>

            <WhyWeAsk explanation={quiz.question.explanation} />
          </div>
        )}
      </div>
    </DiscoverShell>
  );
};

export default DiscoverSkin;
