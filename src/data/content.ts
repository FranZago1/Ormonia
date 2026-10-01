/**
 * Bloques de copy reutilizables del sitio ORMONIA.
 * Centralizados aquí para editarlos en un solo lugar en vez de dispersos.
 */

export const brandCopy = {
  wordmark: "ORMONIA",
  tagline: "Lo que cambia adentro se expresa afuera.",
  shortPitch: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
};

/**
 * Barra superior del header. Umbral aprobado: ARS 145.000.
 */
export const announcementCopy = {
  message: "Envío gratis en órdenes mayores a $145.000",
};

export const nav = {
  /** Zona izquierda del header (desktop). Jerarquía aprobada en el Master Plan. */
  left: [
    { label: "Tienda", href: "/products" },
    { label: "Sobre Ormonia", href: "/about" },
    { label: "Explorar", href: "/learn" },
  ],
  /**
   * Zona derecha del header. Todavía no existe cuenta, buscador ni carrito:
   * se muestran como afordancias inertes hasta que Shopify esté integrado.
   * No inventar rutas ni comportamiento de compra antes de ese sprint.
   */
  utilities: [
    { label: "Cuenta", href: null as string | null },
    { label: "Buscar", href: null as string | null },
    { label: "Carrito", href: null as string | null },
  ],
  primary: [
    { label: "Tienda", href: "/products" },
    { label: "Sobre Ormonia", href: "/about" },
    { label: "Explorar", href: "/learn" },
    { label: "Descubrí tu piel", href: "/descubri-tu-piel" },
    // Placeholder: futuro punto de entrada al carrito/ritual (se conectará en un sprint posterior).
    { label: "Tu ritual", href: null as string | null },
  ],
};

export const heroCopy = {
  line1: "Lo que cambia adentro",
  line2: "se expresa afuera.",
  cta: "Descubrir el ritual",
  /** Ancla interna del bloque Pack x4. Mientras no exista PDP/Shopify. */
  ctaTarget: "#pack-x4",
};

/**
 * Popup diferido de descubrimiento.
 *
 * Invita al diagnóstico real (`/descubri-tu-piel`). "Fenotipo" aparece solo
 * como microcopy secundario (eyebrow) y no se define: el modelo de fenotipos
 * todavía no existe (Sprint 07B). El cuerpo reutiliza la bajada aprobada de
 * la entrada en Home, sin atar la piel al ciclo.
 *
 * `incentive`: el 5% está aprobado en el Master Plan pero todavía no hay
 * mecanismo para aplicarlo (Shopify). Se mantiene el texto existente.
 */
export const discoverPopupCopy = {
  eyebrow: "Fenotipo de piel",
  title: "Descubrí tu piel",
  body: "Un recorrido breve para entender cómo se comporta tu piel y qué necesita hoy.",
  incentive: "5% off en tu primer ritual",
  cta: "Descubrir mi piel",
  ctaHref: "/descubri-tu-piel",
  dismiss: "Ahora no",
  close: "Cerrar",
};

/**
 * Media del hero (Sprint 01). `src` es la URL pública del asset real
 * (pradera con caballo) servida desde /public; cambiar la imagen es editar
 * esta sola línea. `alt` describe la escena para lectores de pantalla.
 */
export const heroMedia = {
  src: "/pradera-y-caballo.png",
  alt: "Pradera abierta bajo luz cálida con un caballo pastando; tonos verdes y tierra.",
};

/**
 * HOME 05 — Agua / El Ritmo.
 *
 * Dos momentos de texto, no más: la escena es una pausa sensorial, no un
 * bloque explicativo. El agua sostiene el aire; el copy solo lo puntúa.
 */
/**
 * HOME 05 — Agua / El Ritmo.
 *
 * Dos momentos, sin eyebrow: la escena es una pausa sensorial y cuantos menos
 * elementos tenga, mejor respira. El relevo entre ambos es continuo, no un
 * cambio de estado.
 */
export const rhythmCopy = {
  moments: [
    {
      lines: ["La piel también", "tiene un ritmo."],
      note: "Cambia, responde, se transforma." as string | null,
    },
    {
      lines: ["Aprender a mirarla", "cambia la forma de cuidarla."],
      note: null as string | null,
    },
  ],
};

export const cycleCopy = {
  eyebrow: "Las cuatro fases",
  title: "Cuatro fases, cuatro gestos.",
  body: "Menstrual, folicular, ovulatoria y lútea. Cada una con un carácter propio y un serum que la acompaña.",
  phases: [
    { phase: "Menstrual", note: "Introspección y descanso" },
    { phase: "Follicular", note: "Energía ascendente" },
    { phase: "Ovulatory", note: "Luz en su punto alto" },
    { phase: "Luteal", note: "Reparación y preparación" },
  ],
};

/**
 * HOME 04 — Productos individuales.
 *
 * El mensaje baja el énfasis en la vida cíclica: los serums se compran por lo
 * que la piel necesita, no por estar en una fase determinada. La fase sigue
 * informando cada producto, pero como dato secundario, no como condición.
 *
 * Sin eyebrow: "Los serums" repetía la idea del titular y sumaba ruido.
 */
export const fourPhasesCopy = {
  title: "Los esenciales de ORMONIA.",
  body: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
};

/**
 * HOME 03 — Pack x4 / Ritual completo.
 *
 * Momento comercial central: comprar los cuatro serums juntos es la forma de
 * vivir el ciclo completo. `price` y `savings` quedan preparados para cuando
 * existan precios definitivos y se pueda comunicar la ventaja frente a
 * comprarlos por separado; mientras son `null`, esos bloques no se renderizan.
 *
 * `ctaHref` resuelve provisionalmente en la ruta de productos existente. Cuando
 * exista el PDP del pack en Shopify, se cambia solo esta línea.
 *
 * El bloque no vuelve a nombrar los cuatro serums: el usuario acaba de verlos
 * en El Ciclo. Acá el mensaje es el ritual completo, no cada fórmula.
 */
export const packCopy = {
  eyebrow: "Pack x4 · Ritual completo",
  titleLines: ["Las 4 fases,", "un solo ritual."],
  /**
   * Provisional. Cuando el pricing definitivo confirme el número, esta línea
   * pasa a comunicar el ahorro concreto ("Ahorrá X% con el ritual completo").
   * No inventar el porcentaje antes de esa confirmación.
   */
  body: "Una forma simple de recorrer el ritual completo y ahorrar eligiendo el set.",
  cta: "Descubrir el ritual completo",
  ctaHref: "/products",
  price: null as string | null,
  savings: null as string | null,
  media: {
    /**
     * Assets provisionales del estuche del Pack x4 (1200×896).
     *
     * `pack-box-dark.png` —la caja negra vista desde arriba— queda disponible
     * como tercera imagen futura. No hay galería todavía.
     */
    primary: {
      src: "/products/pack-box-open.png",
      alt: "Estuche abierto del Pack x4 de Ormonia con los serums en su interior.",
    },
    /** En `null` la pieza usa una sola imagen estable, sin crossfade. */
    hover: {
      src: "/products/pack-box-hand.png",
      alt: "",
    } as { src: string; alt: string } | null,
  },
};

export const insideOutsideCopy = {
  eyebrow: "Adentro / afuera",
  title: "Lo que vivís adentro se ve afuera.",
  body: "El descanso, la hidratación, el estrés y el ánimo dejan huella en la piel. No se trata de corregir, sino de acompañar lo que ya está cambiando.",
  caption: "Cuidado como reflejo, no como corrección.",
};

export const ritualWords = ["Escuchar", "Observar", "Acompañar", "Cuidar"];

export const discoverCopy = {
  eyebrow: "Encontrá tu ritmo",
  title: "¿En qué fase estás hoy?",
  body: "Un breve quiz te acerca al serum que tu piel pide ahora mismo. Sin prisa, sin prescripción.",
  cta: "Descubrir mi ritual",
};

/**
 * HOME 06 — Descubrí tu piel.
 *
 * Entrada al diagnóstico. No explica el cuestionario: invita. La curiosidad
 * hace el trabajo y el test explica después.
 *
 * El copy es la acción que sigue a la reflexión de HOME 05: allí la idea es
 * que mirar la piel importa; acá, que la tuya responde de una forma propia.
 * Por eso el titular no vuelve sobre observar.
 *
 * ────────────────────────────────────────────────────────────────────────
 * BRIEF DEL ASSET DEFINITIVO
 *
 * Fotografía editorial horizontal, piel real de una persona real, con detalle
 * visible de textura. Luz natural o suave, sin retoque excesivo. Nada de spa
 * genérico ni de estética clínica. Debe traer espacio negativo previsto para
 * el copy —preferentemente a la izquierda— y funcionar recortada tanto en
 * desktop como en mobile.
 *
 * Para incorporarla alcanza con `media.src`, su `alt`, el `tone` según si la
 * imagen es clara u oscura, y los dos `objectPosition`. El layout no cambia.
 * ────────────────────────────────────────────────────────────────────────
 */
export const discoverSkinCopy = {
  eyebrow: "Descubrí tu piel",
  titleLines: ["Tu piel tiene una forma", "propia de responder."],
  body: "Un recorrido breve para entender cómo se comporta y qué necesita hoy.",
  cta: "Descubrir mi piel",
  ctaHref: "/descubri-tu-piel",
  media: {
    /** `null` mientras no exista la fotografía de producción. */
    src: null as string | null,
    alt: "",
    /**
     * Gobierna el contraste de toda la pieza: "light" deja el copy en ink y el
     * header en su tinta por defecto; "dark" lo pasa todo a ivory y declara el
     * tono claro para la navegación.
     */
    tone: "light" as "light" | "dark",
    /** Campo tonal mientras no haya imagen. */
    placeholderTone: "#D4C4AE",
    objectPosition: "62% 50%",
    objectPositionMobile: "58% 45%",
    pending: "Producción · fotografía editorial de piel",
  },
};

/**
 * HOME 07 — Lecturas para el ritual.
 *
 * Bloque editorial: cambia el ritmo después de la campaña de Descubrí tu piel.
 * No es otra zona de compra ni una grilla de blog.
 *
 * Cada pieza declara su formato (`kind`): un video de YouTube, una nota o un
 * escrito. El primer ítem es el destacado. Para publicar una pieza real basta
 * con completar `href` (ruta interna o URL externa) y `media`; mientras `href`
 * sea `null` la pieza se muestra como "Próximamente" y no enlaza a ningún
 * lado. No inventar links ni contenido.
 *
 * Los tres textos actuales vienen del contenido existente del repo.
 */
export type ReadingKind = "video" | "nota" | "escrito";

export interface Reading {
  id: string;
  kind: ReadingKind;
  /** Etiqueta editorial visible (Ensayo, Glosa, Práctica…). */
  label: string;
  title: string;
  teaser: string;
  href: string | null;
  /** Imagen de portada. `null` mientras no exista la pieza de producción. */
  media: { src: string; alt: string } | null;
  /** Duración ("12 min") o tiempo de lectura, si se conoce. */
  meta?: string | null;
}

export const learnCopy = {
  eyebrow: "Lecturas",
  title: "Lecturas para el ritual.",
  body: "Botánica, ciclo y cuidado. Material editorial para acompañar tu práctica.",
  cta: "Ver todas las lecturas",
  ctaHref: "/learn",
  soon: "Próximamente",
  kindLabel: {
    video: "Video",
    nota: "Nota",
    escrito: "Escrito",
  } as Record<ReadingKind, string>,
  pending: "Producción · imagen editorial",
  readings: [
    {
      id: "ciclo-guia-estacional",
      kind: "escrito",
      label: "Ensayo",
      title: "El ciclo como guía estacional",
      teaser:
        "Por qué tu piel pide cosas distintas en cada fase y cómo leer esas señales.",
      href: null,
      media: null,
    },
    {
      id: "botanica-de-los-serums",
      kind: "nota",
      label: "Glosa",
      title: "Botánica de los serums",
      teaser:
        "Los activos de cada fórmula, su origen y su función en el gesto del ritual.",
      href: null,
      media: null,
    },
    {
      id: "ritual-paso-a-paso",
      kind: "nota",
      label: "Práctica",
      title: "El ritual paso a paso",
      teaser:
        "Cómo aplicar, en qué orden y cuándo. Una guía sencilla para sostener la práctica.",
      href: null,
      media: null,
    },
  ] as Reading[],
};

/**
 * El Registro — newsletter. Vive dentro de la escena de agua (HOME 05).
 *
 * Copy deliberadamente corto: la interfaz necesita respirar. Sin cadencias,
 * frecuencias ni promesas editoriales de más.
 *
 * `disclaimer` se conserva para `RegisterSection`, el bloque autónomo que
 * queda disponible en el repo; la escena de agua no lo renderiza.
 */
export const registerCopy = {
  eyebrow: "El Registro",
  title: "El Registro",
  body: "Ideas, fórmulas y rituales para entender mejor tu piel y elegir cómo cuidarla.",
  placeholder: "Tu email",
  cta: "Recibir El Registro",
  disclaimer: "Al registrarte aceptás recibir comunicaciones de ORMONIA.",
  /**
   * Respuesta honesta al enviar mientras no haya proveedor conectado: no
   * confirma una suscripción que no ocurrió. Se elimina al conectar el envío.
   */
  pendingNotice: "El Registro todavía no está abierto. Muy pronto vas a poder sumarte.",
};

/**
 * HOME 08 — Instagram / Universo ORMONIA.
 *
 * Tres piezas visibles, integradas a la estética del sitio (no un widget de
 * plugin). Hoy no hay cuenta ni API conectadas: `posts` está vacío y se ven
 * tres campos tonales con su nota de producción.
 *
 * Para conectarlo:
 * - selección curada: completar `posts` a mano (imagen, alt, permalink);
 * - feed dinámico: la Instagram Graph API necesita un token que no puede vivir
 *   en el frontend. Un endpoint propio (o servicio aprobado) devuelve esta
 *   misma forma y la sección no cambia (`lib/instagram.ts`).
 *
 * `handle` y `profileUrl` en `null` hasta tener la cuenta confirmada.
 */
export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  permalink: string;
}

export const instagramCopy = {
  eyebrow: "Instagram",
  title: "El universo ORMONIA.",
  body: "Rituales, procesos y campo visual. Pronto en Instagram.",
  note: "Próximamente",
  handle: null as string | null,
  profileUrl: null as string | null,
  follow: "Seguir en Instagram",
  pending: "Producción · contenido de Instagram",
  posts: [] as InstagramPost[],
};

/**
 * HOME 09 — Cierre "Unite al ritual".
 *
 * Cierre emocional (Master Plan §5). No repite la newsletter: El Registro ya
 * vive en la escena de agua, así que acá solo se lo señala.
 */
export const closingCopy = {
  eyebrow: "ORMONIA",
  title: "Unite al ritual.",
  body: "Lo que cambia adentro se expresa afuera.",
  links: [
    { label: "Descubrir mi piel", href: "/descubri-tu-piel" },
    { label: "Recibir El Registro", href: "/#ritmo" },
  ],
};

/**
 * Footer.
 *
 * Los destinos que todavía no existen (ayuda, políticas, redes) quedan en
 * `null`: se ven como texto inerte y no inventan páginas ni textos legales.
 * Completar `href` cuando cada página o cuenta exista.
 */
export interface FooterLink {
  label: string;
  href: string | null;
}

export const footerCopy = {
  /** Bajada aprobada de Los esenciales: el producto no queda atado a una fase. */
  tagline: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
  columns: [
    {
      heading: "Tienda",
      links: [
        { label: "Los esenciales", href: "/products" },
        { label: "Pack x4", href: "/#pack-x4" },
        { label: "CLARITY", href: "/products/clarity" },
        { label: "BLOOM", href: "/products/bloom" },
        { label: "RADIANCE", href: "/products/radiance" },
        { label: "RESTORE", href: "/products/restore" },
      ] as FooterLink[],
    },
    {
      heading: "Explorar",
      links: [
        { label: "Sobre ORMONIA", href: "/about" },
        { label: "Lecturas para el ritual", href: "/learn" },
        { label: "Descubrí tu piel", href: "/descubri-tu-piel" },
        { label: "El Registro", href: "/#ritmo" },
      ] as FooterLink[],
    },
    {
      heading: "Ayuda",
      links: [
        { label: "Envíos", href: null },
        { label: "Cambios y devoluciones", href: null },
        { label: "Preguntas frecuentes", href: null },
        { label: "Contacto", href: null },
      ] as FooterLink[],
    },
  ],
  social: [{ label: "Instagram", href: instagramCopy.profileUrl }] as FooterLink[],
  legal: [
    { label: "Términos y condiciones", href: null },
    { label: "Política de privacidad", href: null },
  ] as FooterLink[],
  copyright: "ORMONIA",
};

export const notFoundCopy = {
  code: "404",
  title: "Esta página todavía no florece.",
  body: "La dirección no existe o aún no está disponible. Volvé al ritual para continuar.",
  cta: "Volver al inicio",
};

export const pageShells = {
  products: {
    eyebrow: "Tienda",
    title: "Los esenciales de ORMONIA.",
    body: "Fórmulas pensadas para acompañar lo que tu piel necesita. AURA, la niebla de cierre, llegará pronto.",
  },
  learn: {
    eyebrow: "Aprender",
    title: "Lecturas para el ritual.",
    body: "Pronto: ensayos, glosas y guías prácticas sobre botánica, ciclo y cuidado.",
  },
  discover: {
    eyebrow: "Descubrí",
    title: "Encontrá tu ritmo.",
    body: "El quiz de ritmo llegará pronto. Mientras tanto, explorá los serums y sus fases.",
  },
  about: {
    eyebrow: "Nosotros",
    title: "ORMONIA.",
    body: "Una práctica de cuidado que escucha el ciclo. Pronto compartiremos la historia, la filosofía y el campo detrás de cada fórmula.",
  },
};
