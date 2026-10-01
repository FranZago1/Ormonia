import { lazy, Suspense, type ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";

/*
 * Home viaja en el bundle inicial: es la puerta de entrada. El resto de las
 * rutas se descarga recién al visitarlas, así el diagnóstico, la tienda y las
 * páginas secundarias no pesan sobre la primera carga.
 */
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Learn = lazy(() => import("./pages/Learn"));
const DiscoverSkin = lazy(() => import("./pages/DiscoverSkin"));
const DiscoverSkinResult = lazy(() => import("./pages/DiscoverSkin/Result"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Mientras llega el chunk: el mismo campo ivory, sin spinner ni salto. */
function page(Component: ComponentType) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <Component />
    </Suspense>
  );
}

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/products",
    name: "products",
    element: page(Products),
  },
  {
    path: "/products/:slug",
    name: "product-detail",
    element: page(ProductDetail),
  },
  {
    path: "/learn",
    name: "learn",
    element: page(Learn),
  },
  /*
   * Ruta legacy. El diagnóstico real vive en /descubri-tu-piel; se redirige
   * para no romper links viejos. `pages/Discover.tsx` se conserva en el repo.
   */
  {
    path: "/discover",
    name: "discover",
    element: <Navigate to="/descubri-tu-piel" replace />,
  },
  {
    path: "/descubri-tu-piel",
    name: "discover-skin",
    element: page(DiscoverSkin),
  },
  {
    path: "/descubri-tu-piel/resultado",
    name: "discover-skin-result",
    element: page(DiscoverSkinResult),
  },
  {
    path: "/about",
    name: "about",
    element: page(About),
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: page(NotFound),
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
