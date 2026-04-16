import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy pages
import { Suspense, lazy } from "react";

const GlucoseDashboardPage = lazy(() =>
  import("./pages/GlucoseDashboard").then((m) => ({
    default: m.GlucoseDashboardPage,
  })),
);
const CriticalAnalystPage = lazy(() =>
  import("./pages/CriticalAnalyst").then((m) => ({
    default: m.CriticalAnalystPage,
  })),
);
const BmiMapperPage = lazy(() =>
  import("./pages/BmiMapper").then((m) => ({ default: m.BmiMapperPage })),
);
const AthleteCaseStudyPage = lazy(() =>
  import("./pages/AthleteCaseStudy").then((m) => ({
    default: m.AthleteCaseStudyPage,
  })),
);

function PageLoader() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

// Root route wraps everything in Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Toaster richColors position="bottom-right" />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: GlucoseDashboardPage,
});

const criticalAnalystRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/critical-analyst",
  component: CriticalAnalystPage,
});

const bmiMapperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/critical-analyst/bmi-mapper",
  component: BmiMapperPage,
});

const athleteCaseStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/critical-analyst/athlete-case-study",
  component: AthleteCaseStudyPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  criticalAnalystRoute,
  bmiMapperRoute,
  athleteCaseStudyRoute,
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
