import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from 'react';

const ProjectVisual = lazy(() => import('./ProjectVisual').then(module => ({ default: module.ProjectVisual })));

// The detailed illustrations are decorative and several screens below the hero.
// Keep their dimensions stable and fetch them before they enter the viewport.
export function DeferredProjectVisual(props: ComponentProps<typeof ProjectVisual>) {
  const container = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setNearby(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={container} className="deferred-project-visual" aria-hidden="true">
    {nearby && <Suspense fallback={<div className="project-visual-placeholder" />}>
      <ProjectVisual {...props} />
    </Suspense>}
  </div>;
}
