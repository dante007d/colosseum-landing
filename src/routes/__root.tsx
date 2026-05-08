import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ash px-4">
      <div className="marble-texture" />
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-7xl font-display text-gold">404</h1>
        <h2 className="mt-4 text-xl font-heading text-parchment uppercase tracking-widest">Page not found</h2>
        <p className="mt-2 text-sm text-parchment/60 font-body italic">
          The arena you seek has vanished into history.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-crimson px-6 py-2 text-xs font-heading text-parchment uppercase tracking-[0.3em] transition-all hover:scale-105"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ash px-4">
      <div className="marble-texture" />
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-xl font-heading text-gold uppercase tracking-widest">
          The Arena is Shaking
        </h1>
        <p className="mt-2 text-sm text-parchment/60 font-body italic">
          Something went wrong. The gods are displeased.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-crimson px-6 py-2 text-xs font-heading text-parchment uppercase tracking-[0.3em] transition-all hover:scale-105"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-gold/20 bg-transparent px-6 py-2 text-xs font-heading text-gold uppercase tracking-[0.3em] transition-all hover:bg-gold/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
