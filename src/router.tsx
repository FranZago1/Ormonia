import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Learn from "./pages/Learn";
import DiscoverSkin from "./pages/DiscoverSkin";
import DiscoverSkinResult from "./pages/DiscoverSkin/Result";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/products",
    name: "products",
    element: <Products />,
  },
  {
    path: "/products/:slug",
    name: "product-detail",
    element: <ProductDetail />,
  },
  {
    path: "/learn",
    name: "learn",
    element: <Learn />,
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
    element: <DiscoverSkin />,
  },
  {
    path: "/descubri-tu-piel/resultado",
    name: "discover-skin-result",
    element: <DiscoverSkinResult />,
  },
  {
    path: "/about",
    name: "about",
    element: <About />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
