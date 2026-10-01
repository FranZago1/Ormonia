import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  FeaturedReading,
  IndexReading,
  ReadingsHeader,
} from "@/components/sections/LearnSection";
import { learnCopy } from "@/data/content";

/**
 * /learn — índice de Lecturas para el ritual.
 *
 * Misma data y mismas piezas que la sección de Home (`learnCopy.readings`):
 * cuando se publique una lectura, aparece en los dos lugares a la vez.
 */
const Learn = () => {
  const [featured, ...rest] = learnCopy.readings;

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="min-h-screen bg-[#F2EBDD] pt-32 outline-none md:pt-40"
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-28 md:px-10">
          <ReadingsHeader as="h1" />
          {featured && (
            <div className="mt-12 grid gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
              <FeaturedReading reading={featured} headingAs="h2" />
              {rest.length > 0 && (
                <ol className="flex flex-col">
                  {rest.map((reading) => (
                    <li key={reading.id} className="border-t border-ink/14 last:border-b">
                      <IndexReading reading={reading} headingAs="h2" />
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Learn;
