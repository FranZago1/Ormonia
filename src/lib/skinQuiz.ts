/**
 * Motor del cuestionario "Descubrí tu piel".
 *
 * Contiene tipos, resolución de opciones y el punto de entrada de la futura
 * lectura. NO contiene contenido (vive en `data/skinQuiz.ts`) ni estado de UI
 * (vive en `hooks/useSkinQuiz.ts`).
 */

/** Momentos visuales del panel izquierdo. Agrupan varias preguntas. */
export type VisualGroup = "observar" | "sentir" | "cambio" | "resultado";

export type QuestionType = "single" | "multi";

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  /** Etiqueta corta del bloque, visible sobre la pregunta. */
  category: string;
  visualGroup: VisualGroup;
  question: string;
  helper?: string;
  type: QuestionType;
  options?: QuizOption[];
  /**
   * Hereda las opciones de otra pregunta y descarta lo ya elegido allí.
   * Permite encadenar "¿y algo más?" sin duplicar el listado.
   */
  inheritOptionsFrom?: string;
  /** Opciones propias que se agregan al final de las heredadas. */
  extraOptions?: QuizOption[];
  /** Respuesta humana a "¿por qué te preguntamos esto?". Sin claims. */
  explanation: string;
  required: boolean;
  /** Solo para `multi`. */
  maxSelections?: number;
}

/** Respuestas elegidas. Siempre un array, también en `single`. */
export type QuizAnswers = Record<string, string[]>;

/** Resuelve las opciones visibles de una pregunta según lo ya respondido. */
export function resolveOptions(
  question: QuizQuestion,
  questions: QuizQuestion[],
  answers: QuizAnswers
): QuizOption[] {
  const base = question.inheritOptionsFrom
    ? (questions.find((q) => q.id === question.inheritOptionsFrom)?.options ?? [])
    : (question.options ?? []);

  const taken = question.inheritOptionsFrom
    ? (answers[question.inheritOptionsFrom] ?? [])
    : [];

  return [
    ...base.filter((option) => !taken.includes(option.id)),
    ...(question.extraOptions ?? []),
  ];
}

/** ¿La pregunta está respondida lo suficiente para poder avanzar? */
export function isAnswered(
  question: QuizQuestion,
  answers: QuizAnswers
): boolean {
  if (!question.required) return true;
  return (answers[question.id]?.length ?? 0) > 0;
}

/**
 * Aplica la elección de una opción y devuelve las respuestas nuevas.
 * En `single` reemplaza; en `multi` alterna y respeta `maxSelections`.
 */
export function toggleAnswer(
  question: QuizQuestion,
  answers: QuizAnswers,
  optionId: string
): QuizAnswers {
  const current = answers[question.id] ?? [];

  if (question.type === "single") {
    return { ...answers, [question.id]: [optionId] };
  }

  if (current.includes(optionId)) {
    return { ...answers, [question.id]: current.filter((id) => id !== optionId) };
  }

  const limit = question.maxSelections ?? Infinity;
  if (current.length >= limit) {
    // Al llegar al tope, la nueva elección desplaza a la más antigua en vez de
    // bloquear en silencio: el usuario nunca queda sin poder cambiar de idea.
    return { ...answers, [question.id]: [...current.slice(1), optionId] };
  }

  return { ...answers, [question.id]: [...current, optionId] };
}

/**
 * Descarta respuestas que dejaron de ser opciones válidas.
 *
 * Una pregunta que hereda opciones excluye lo elegido en su origen. Si la
 * persona vuelve y cambia el origen a lo que había elegido en la heredada, esa
 * respuesta quedaría guardada pero invisible —y duplicada—. Acá se limpia; si
 * la pregunta queda vacía, vuelve a pedir respuesta.
 */
export function pruneAnswers(
  questions: QuizQuestion[],
  answers: QuizAnswers
): QuizAnswers {
  let next = answers;
  for (const question of questions) {
    const current = next[question.id];
    if (!question.inheritOptionsFrom || !current?.length) continue;
    const valid = resolveOptions(question, questions, next).map((o) => o.id);
    const kept = current.filter((id) => valid.includes(id));
    if (kept.length !== current.length) {
      next = { ...next, [question.id]: kept };
    }
  }
  return next;
}

/** ¿Hay al menos una respuesta registrada? */
export function hasAnswers(answers: QuizAnswers): boolean {
  return Object.values(answers).some((ids) => ids.length > 0);
}

/**
 * Lectura de la piel.
 *
 * SPRINT 07B ENTRA ACÁ Y SOLO ACÁ.
 *
 * Hoy devuelve el contenido provisional tal cual está escrito en la data: no
 * infiere nada de las respuestas y lo declara con `provisional: true`. La UI
 * del resultado ya consume esta forma, así que conectar la lógica real de
 * fenotipos es reemplazar el cuerpo de esta función sin tocar ninguna vista.
 *
 * La forma separa a propósito dos cosas que no son lo mismo:
 * - `phenotype`: el comportamiento relativamente estructural de la piel;
 * - `currentState`: lo que parece estar pidiendo ahora.
 * Un mismo fenotipo puede devolver estados distintos en momentos distintos, así
 * que la arquitectura no obliga a un código único y fijo.
 */
export interface SkinAxis {
  id: string;
  label: string;
  /** 0–1. Placeholder de UI hasta que exista el modelo real. */
  value: number;
  note: string;
}

export interface SkinReading {
  provisional: boolean;
  phenotype: {
    title: string;
    summary: string;
  };
  currentState: {
    axes: SkinAxis[];
    needs: Array<{ title: string; body: string }>;
  };
  ritual: {
    primary: string | null;
    complement: string | null;
    complete: string | null;
  };
}

export function readSkin(
  answers: QuizAnswers,
  placeholder: SkinReading
): SkinReading {
  // Sprint 07A: el resultado es estructural, no inferido. `answers` ya llega
  // hasta acá para que 07B no tenga que cambiar la firma ni las llamadas.
  void answers;
  return placeholder;
}
