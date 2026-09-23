import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import { gsap } from "@/lib/gsap";
import { registerCopy, rhythmCopy } from "@/data/content";

/** Campo claro que precede y sigue a la escena. */
const FIELD = "#F2EBDD";

/**
 * Alto de la sección, en vh. El stage se pinea 100vh, así que el recorrido de
 * la transformación es SECTION_VH − 100. 100vh alcanzan para que el relevo del
 * copy se sienta viscoso en vez de conmutado.
 */
const SECTION_VH = 200;

/**
 * Sombras localizadas bajo el texto.
 *
 * Son estrictamente laterales: se apagan antes del 82-86% de su lado y no
 * tocan los bordes superior ni inferior, así el video llega limpio al corte
 * con el campo claro. No hay ningún fade vertical en esta escena.
 *
 * Las densidades están resueltas contra el peor caso —ivory sobre una cresta
 * de espuma clara— para sostener 4.5:1.
 */
const SHADE_LEFT = `linear-gradient(90deg,
  rgba(34,26,20,0.74) 0%,
  rgba(34,26,20,0.68) 26%,
  rgba(34,26,20,0.56) 44%,
  rgba(34,26,20,0.24) 64%,
  rgba(34,26,20,0) 82%)`;

const SHADE_RIGHT = `linear-gradient(270deg,
  rgba(34,26,20,0.74) 0%,
  rgba(34,26,20,0.72) 24%,
  rgba(34,26,20,0.68) 42%,
  rgba(34,26,20,0.34) 64%,
  rgba(34,26,20,0) 86%)`;

/** Velo uniforme para la versión angosta. Sin degradado: sin bordes lavados. */
const SHADE_COMPACT = "rgba(34,26,20,0.60)";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const f = clamp01((x - edge0) / (edge1 - edge0));
  return f * f * (3 - 2 * f);
};

/**
 * Ventana del relevo entre los dos momentos, en fracción del recorrido.
 *
 * Abarca casi la mitad del scroll de la escena a propósito: el cambio tiene
 * que repartirse lo suficiente como para que no exista un punto donde se
 * perciba que "cambió el texto".
 */
const CROSS_IN = 0.26;
const CROSS_OUT = 0.7;

/** Recorrido vertical de cada momento durante el relevo, en px. */
const RISE = 58;
const ENTER = 52;

/**
 * HOME 05 — Agua / El Ritmo + El Registro.
 *
 * Pausa sensorial después de la zona comercial. Una sola escena: el agua de
 * fondo, una idea que se transforma a la izquierda y El Registro fijo a la
 * derecha, que actúa de ancla mientras el resto cambia.
 *
 * LA ESCENA LLEGA ARMADA
 * No hay animación de entrada. En el primer frame ya están el agua, el primer
 * mensaje y El Registro completos, y los valores iniciales del JSX coinciden
 * con lo que escribe `render(0)`, así que nada aparece después de entrar.
 *
 * SIN FADES DE BORDE
 * El video llega limpio al borde superior e inferior de la sección: corte
 * directo entre el campo ivory y el agua. Las únicas sombras son laterales y
 * existen solo para sostener la lectura del texto.
 *
 * EL VIDEO NO DEPENDE DEL SCROLL
 * El agua vive de `autoPlay`, `loop` y un `playbackRate` fijo, más un drift
 * GSAP infinito que solo altera su transform. Nada lee ni escribe
 * `currentTime` y ningún ScrollTrigger la controla: se mueve siempre.
 *
 * El scroll gobierna una única cosa —el peso relativo de los dos mensajes de
 * la izquierda— desde un solo escalar y con funciones complementarias que
 * suman 1, de modo que no hay hueco ni salto en ninguna posición intermedia.
 *
 * El tono del header lo declara el propio stage: es la superficie de 100vh que
 * está realmente bajo la navegación, así que su geometría es exacta también
 * mientras está pinneado.
 *
 * Preparado para conectar un proveedor de newsletter: el formulario es un
 * estado controlado con `preventDefault` y sin envío. No simula éxito.
 */
export function RhythmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const momentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [email, setEmail] = useState("");

  /*
   * El agua: autónoma y sin relación con el scroll.
   *
   * Hay dos elementos de video —uno por breakpoint— y cada uno tiene su propio
   * ref: compartirlo haría que el segundo montaje sobrescribiera al primero y
   * el video pinneado quedara sin `playbackRate` ni deriva.
   */
  useEffect(() => {
    const videos = [videoRef.current, mobileVideoRef.current].filter(
      (el): el is HTMLVideoElement => el !== null
    );
    const cleanups: Array<() => void> = [];

    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.playbackRate = 0.32;

      const start = () => {
        video.play().catch(() => {
          // Si el navegador bloquea el autoplay muteado, queda el primer frame.
        });
      };

      if (video.readyState >= 2) start();
      else video.addEventListener("canplay", start, { once: true });

      cleanups.push(() => {
        video.removeEventListener("canplay", start);
        video.pause();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return;

    const moments = momentRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        /*
         * Deriva óptica del agua. Vive fuera de ScrollTrigger a propósito: es
         * lo que mantiene la escena viva cuando el usuario se queda quieto.
         */
        const drift = gsap.timeline({ repeat: -1, yoyo: true });
        drift.to(video, {
          scale: 1.1,
          xPercent: 1.4,
          yPercent: -0.9,
          duration: 11,
          ease: "sine.inOut",
        });

        /**
         * Único punto de escritura de la escena.
         *
         * `t` es el peso del segundo momento. Las opacidades son exactamente
         * complementarias, así que en cualquier posición intermedia la suma es
         * 1 y la composición nunca queda vacía; el desplazamiento vertical
         * opuesto es lo que separa ambos mensajes mientras conviven.
         */
        const render = (p: number) => {
          const t = smoothstep(CROSS_IN, CROSS_OUT, p);

          gsap.set(moments[0], { autoAlpha: 1 - t, y: -RISE * t });
          gsap.set(moments[1], { autoAlpha: t, y: ENTER * (1 - t) });
        };

        render(0);

        const driver = { progress: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.to(driver, {
          progress: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => render(driver.progress),
        });

        return () => drift.kill();
      });

      // Reduced motion: escena estable, sin deriva ni coreografía de scroll.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(moments[0], { autoAlpha: 1, y: 0 });
        gsap.set(moments[1], { autoAlpha: 0, y: 0 });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  const onSubmit = (event: FormEvent) => {
    // Todavía no hay proveedor de newsletter conectado: no se envía nada y no
    // se simula ningún resultado. Al conectarlo, este es el único punto a tocar.
    event.preventDefault();
  };

  const water = (ref: RefObject<HTMLVideoElement>) => (
    <video
      ref={ref}
      src="/ritual-water.mp4"
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.94)_contrast(1.06)_saturate(0.8)] [will-change:transform]"
    />
  );

  /**
   * Superficie de El Registro: se percibe por estructura, no por relleno.
   * Ivory con alfa muy baja y un borde de 1px, sin blur, para que el agua se
   * siga viendo por detrás.
   */
  const panelClass = "rounded-[20px] border border-ivory/[0.18] bg-ivory/[0.06]";

  const register = (
    <>
      <h3 className="font-display text-[clamp(2.2rem,3.2vw,3.5rem)] leading-[1] tracking-[-0.035em] text-ivory [text-shadow:0_2px_32px_rgba(16,12,8,0.45)]">
        {registerCopy.title}
      </h3>
      <p className="mt-5 max-w-[330px] font-sans text-[14px] leading-relaxed text-ivory/82 [text-shadow:0_1px_16px_rgba(16,12,8,0.5)]">
        {registerCopy.body}
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={registerCopy.placeholder}
          aria-label={registerCopy.placeholder}
          className="h-[56px] w-full rounded-[11px] border border-ivory/30 bg-ivory/[0.08] px-5 font-sans text-[14px] text-ivory outline-none transition-colors duration-300 placeholder:text-ivory/60 focus:border-ivory/65"
        />
        <button
          type="submit"
          className="h-[56px] w-full rounded-[11px] bg-ink font-sans text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors duration-300 ease-out hover:bg-deepBrown"
        >
          {registerCopy.cta}
        </button>
      </form>
    </>
  );

  return (
    <section
      id="ritmo"
      ref={sectionRef}
      aria-labelledby="rhythm-heading"
      className="relative md:h-[200vh]"
      style={{ backgroundColor: FIELD }}
    >
      {/*
        Desktop: una sola escena pinneada.
        El tono del header se declara acá y no en un wrapper: éste es el plano
        de 100vh que está realmente bajo la navegación, y al estar pinneado
        reporta coordenadas de viewport exactas.
      */}
      <div
        ref={stageRef}
        data-header-tone="light"
        className="relative hidden h-screen w-full overflow-hidden md:block"
        style={{ backgroundColor: "#6E736D" }}
      >
        {water(videoRef)}

        {/* Sombras laterales. Nunca tocan los bordes superior ni inferior. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: SHADE_LEFT }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: SHADE_RIGHT }}
        />

        {/* Izquierda: la idea que se transforma. */}
        <div className="absolute inset-y-0 left-[6vw] z-10 flex w-[42vw] max-w-[620px] items-center">
          <div className="relative w-full">
            {rhythmCopy.moments.map((moment, index) => (
              <div
                key={moment.lines.join("")}
                ref={(el) => {
                  momentRefs.current[index] = el;
                }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  transform: index === 0 ? undefined : `translateY(${ENTER}px)`,
                }}
              >
                <h2
                  id={index === 0 ? "rhythm-heading" : undefined}
                  className="font-display text-[clamp(2.6rem,4.6vw,5rem)] leading-[1] tracking-[-0.04em] text-ivory [text-shadow:0_2px_40px_rgba(16,12,8,0.42)]"
                >
                  {moment.lines[0]}
                  <br />
                  {moment.lines[1]}
                </h2>
                {moment.note && (
                  <p className="mt-7 max-w-[360px] font-sans text-[14px] leading-relaxed text-ivory/80 [text-shadow:0_1px_16px_rgba(16,12,8,0.5)]">
                    {moment.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Derecha: El Registro, presente de principio a fin. */}
        <div className="absolute inset-y-0 right-[5vw] z-10 flex w-[36vw] max-w-[540px] flex-col justify-center">
          <div className={`${panelClass} px-9 py-11`}>{register}</div>
        </div>
      </div>

      {/* Mobile: misma escena, sin coreografía y sin fades de borde. */}
      <div
        className="relative overflow-hidden md:hidden"
        data-header-tone="light"
        style={{ backgroundColor: "#6E736D" }}
      >
        {water(mobileVideoRef)}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: SHADE_COMPACT }}
        />

        <div className="relative z-10 flex flex-col gap-12 px-6 pb-20 pt-20">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,9vw,3rem)] leading-[1.02] tracking-[-0.035em] text-ivory">
              {rhythmCopy.moments[0].lines[0]}
              <br />
              {rhythmCopy.moments[0].lines[1]}
            </h2>
            {rhythmCopy.moments[0].note && (
              <p className="mt-6 font-sans text-[14px] leading-relaxed text-ivory/80">
                {rhythmCopy.moments[0].note}
              </p>
            )}
          </div>

          <p className="font-display text-[clamp(1.7rem,6.8vw,2.2rem)] leading-[1.1] tracking-[-0.03em] text-ivory/75">
            {rhythmCopy.moments[1].lines[0]}
            <br />
            {rhythmCopy.moments[1].lines[1]}
          </p>

          <div className={`${panelClass} px-6 py-9`}>{register}</div>
        </div>
      </div>
    </section>
  );
}
