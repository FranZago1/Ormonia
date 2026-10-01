import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DiscoverPopup } from "@/components/layout/DiscoverPopup";
import { HeroLandscape } from "@/components/sections/HeroLandscape";
import { CycleSection } from "@/components/sections/CycleSection";
import { PackRitualSection } from "@/components/sections/PackRitualSection";
import { FourPhasesSection } from "@/components/sections/FourPhasesSection";
import { RhythmSection } from "@/components/sections/RhythmSection";
import { DiscoverYourSkinSection } from "@/components/sections/DiscoverYourSkinSection";
import { LearnSection } from "@/components/sections/LearnSection";
import { InstagramUniverseSection } from "@/components/sections/InstagramUniverseSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

/**
 * Orden de la Home tras el Integration Pass 01–03.
 *
 * El agua (Sprint 02) deja de interrumpir el inicio: ahora se llega rápido al
 * producto — Hero → El Ciclo → Pack x4 → productos individuales — y la
 * experiencia sensorial llega después de la zona comercial como pausa, con El
 * Registro fusionado dentro de la misma escena (HOME 05).
 *
 * `RegisterSection` ya no se monta: su newsletter vive ahora dentro de
 * `RhythmSection`. El componente se conserva en el repo por si se necesita un
 * bloque de registro autónomo en otra página.
 *
 * InsideOutsideSection (Sprint 05) y RitualSection (Sprint 06) ya no se
 * montan: no forman parte de la arquitectura aprobada (Handoff §9) y cortaban
 * el universo claro con un placeholder vacío y un bloque oscuro. Siguen en el
 * repo y en el roadmap; su ubicación se decide en sus sprints.
 * Ningún bloque futuro se construye anticipadamente para llenar la página.
 *
 * `DiscoverYourRhythmSection` (teaser viejo "¿En qué fase estás hoy?" → /discover)
 * ya no se monta: competía con la entrada real al diagnóstico,
 * `DiscoverYourSkinSection`. El componente se conserva en el repo.
 */
const Home = () => {
  return (
    <>
      <Header defaultTone="dark" overlay />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroLandscape />
        <CycleSection />
        <PackRitualSection />
        <FourPhasesSection />
        <RhythmSection />
        <DiscoverYourSkinSection />
        <LearnSection />
        <InstagramUniverseSection />
        <ClosingSection />
      </main>
      <Footer />
      <DiscoverPopup />
    </>
  );
};

export default Home;
