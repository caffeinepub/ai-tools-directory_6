import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { BestAIImageGeneratorsPage } from "./pages/BestAIImageGeneratorsPage";
import { BestAIToolsPage } from "./pages/BestAIToolsPage";
import { BestAIVideoGeneratorsPage } from "./pages/BestAIVideoGeneratorsPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategorySeoPage } from "./pages/CategorySeoPage";
import { FreeAIToolsPage } from "./pages/FreeAIToolsPage";
import { HomePage } from "./pages/HomePage";
import { NewsFeedPage } from "./pages/NewsFeedPage";

// Root layout
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoriesPage,
});

const bestAIToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/best-ai-tools",
  component: BestAIToolsPage,
});

const bestAIImageGeneratorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/best-ai-image-generators",
  component: BestAIImageGeneratorsPage,
});

const bestAIVideoGeneratorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/best-ai-video-generators",
  component: BestAIVideoGeneratorsPage,
});

const freeAIToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/free-ai-tools",
  component: FreeAIToolsPage,
});

const newsFeedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news-feed",
  component: NewsFeedPage,
});

const categorySeoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$slug",
  component: CategorySeoPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  categoriesRoute,
  bestAIToolsRoute,
  bestAIImageGeneratorsRoute,
  bestAIVideoGeneratorsRoute,
  freeAIToolsRoute,
  newsFeedRoute,
  categorySeoRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
