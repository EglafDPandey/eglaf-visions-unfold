import { useRef, useState, useEffect, Suspense, ComponentType } from 'react';

/**
 * Defers rendering (and thus dynamic import) of a lazy component
 * until the placeholder scrolls near the viewport.
 * This prevents Three.js / react-three-fiber from loading on initial paint.
 */
export function LazySection<P extends object>({
  component: Component,
  fallbackHeight = '200px',
  rootMargin = '400px',
  ...props
}: {
  component: ComponentType<P>;
  fallbackHeight?: string;
  rootMargin?: string;
} & P) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (!shouldLoad) {
    return <div ref={ref} style={{ minHeight: fallbackHeight }} />;
  }

  return (
    <Suspense fallback={<div style={{ minHeight: fallbackHeight }} />}>
      {/* @ts-ignore - props spread */}
      <Component {...(props as P)} />
    </Suspense>
  );
}
