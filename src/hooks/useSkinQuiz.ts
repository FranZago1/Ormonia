import { useCallback, useMemo, useState } from "react";
import {
  isAnswered,
  resolveOptions,
  toggleAnswer,
  type QuizAnswers,
  type QuizQuestion,
  type VisualGroup,
} from "@/lib/skinQuiz";

/** El recorrido son las preguntas más un paso final de email. */
export const EMAIL_STEP = "email";

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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showRequiredHint, setShowRequiredHint] = useState(false);

  const totalSteps = questions.length + 1;
  const isEmailStep = step >= questions.length;
  const question = isEmailStep ? null : questions[step];

  const options = useMemo(
    () => (question ? resolveOptions(question, questions, answers) : []),
    [question, questions, answers]
  );

  const select = useCallback(
    (optionId: string) => {
      if (!question) return;
      setAnswers((current) => toggleAnswer(question, current, optionId));
      setShowRequiredHint(false);
    },
    [question]
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
