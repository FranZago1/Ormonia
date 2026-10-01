import { useCallback, useEffect, useMemo, useState } from "react";
import {
  isAnswered,
  pruneAnswers,
  resolveOptions,
  toggleAnswer,
  type QuizAnswers,
  type QuizQuestion,
  type VisualGroup,
} from "@/lib/skinQuiz";

/** El recorrido son las preguntas más un paso final de email. */
export const EMAIL_STEP = "email";

/**
 * Progreso guardado en la pestaña: recargar no borra el recorrido y el
 * resultado puede releerse. Solo respuestas y paso; el email nunca se guarda.
 * `sessionStorage` muere con la pestaña, así que no queda nada entre visitas.
 */
const STORAGE_KEY = "ormonia:skin-quiz";

interface StoredQuiz {
  step: number;
  answers: QuizAnswers;
}

function isAnswerMap(value: unknown): value is QuizAnswers {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every(
      (ids) => Array.isArray(ids) && ids.every((id) => typeof id === "string")
    )
  );
}

export function readStoredQuiz(): StoredQuiz | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredQuiz>;
    if (typeof parsed.step !== "number" || !isAnswerMap(parsed.answers)) {
      return null;
    }
    return { step: parsed.step, answers: parsed.answers };
  } catch {
    // Almacenamiento bloqueado o dato corrupto: se empieza de cero.
    return null;
  }
}

function writeStoredQuiz(value: StoredQuiz) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Sin almacenamiento el recorrido funciona igual, solo no sobrevive a un reload.
  }
}

export function clearStoredQuiz() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada que limpiar.
  }
}

interface UseSkinQuiz {
  step: number;
  totalSteps: number;
  progress: number;
  question: QuizQuestion | null;
  options: ReturnType<typeof resolveOptions>;
  answers: QuizAnswers;
  selected: string[];
  visualGroup: VisualGroup;
  isEmailStep: boolean;
  canGoBack: boolean;
  canAdvance: boolean;
  showRequiredHint: boolean;
  select: (optionId: string) => void;
  next: () => boolean;
  back: () => void;
}

/**
 * Estado del cuestionario.
 *
 * Sabe en qué paso está y qué se eligió; no sabe qué significan las respuestas
 * —eso es de `lib/skinQuiz.ts`— ni cómo se ven —eso es de la UI—.
 *
 * Volver atrás nunca borra: las respuestas viven en un único mapa por id de
 * pregunta y se conservan al navegar en cualquier dirección.
 */
export function useSkinQuiz(questions: QuizQuestion[]): UseSkinQuiz {
  const totalSteps = questions.length + 1;

  const [initial] = useState(readStoredQuiz);
  const [step, setStep] = useState(() =>
    Math.min(Math.max(0, initial?.step ?? 0), totalSteps - 1)
  );
  const [answers, setAnswers] = useState<QuizAnswers>(
    () => initial?.answers ?? {}
  );
  const [showRequiredHint, setShowRequiredHint] = useState(false);

  useEffect(() => {
    writeStoredQuiz({ step, answers });
  }, [step, answers]);

  const isEmailStep = step >= questions.length;
  const question = isEmailStep ? null : questions[step];

  const options = useMemo(
    () => (question ? resolveOptions(question, questions, answers) : []),
    [question, questions, answers]
  );

  const select = useCallback(
    (optionId: string) => {
      if (!question) return;
      setAnswers((current) =>
        pruneAnswers(questions, toggleAnswer(question, current, optionId))
      );
      setShowRequiredHint(false);
    },
    [question, questions]
  );

  const canAdvance = question ? isAnswered(question, answers) : true;

  const next = useCallback(() => {
    if (question && !isAnswered(question, answers)) {
      setShowRequiredHint(true);
      return false;
    }
    setShowRequiredHint(false);
    setStep((current) => Math.min(current + 1, totalSteps - 1));
    return true;
  }, [question, answers, totalSteps]);

  const back = useCallback(() => {
    setShowRequiredHint(false);
    setStep((current) => Math.max(0, current - 1));
  }, []);

  return {
    step,
    totalSteps,
    progress: (step + 1) / totalSteps,
    question,
    options,
    answers,
    selected: question ? (answers[question.id] ?? []) : [],
    visualGroup: question ? question.visualGroup : "resultado",
    isEmailStep,
    canGoBack: step > 0,
    canAdvance,
    showRequiredHint,
    select,
    next,
    back,
  };
}
