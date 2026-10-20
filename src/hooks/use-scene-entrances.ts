import { useEffect, type RefObject } from 'react';

/** Add motion only to offscreen pieces; SSR and reduced-motion content stays visible. */
export function useSceneEntrances(ref: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const pieces = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('scene-entered');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    pieces.forEach(piece => {
      if (piece.getBoundingClientRect().top < window.innerHeight) piece.classList.add('scene-entered');
      else { piece.classList.add('scene-motion-ready'); observer.observe(piece); }
    });
    const disable = () => {
      if (media.matches) { pieces.forEach(piece => piece.classList.remove('scene-motion-ready')); observer.disconnect(); }
    };
    media.addEventListener('change', disable);
    return () => {
      observer.disconnect(); media.removeEventListener('change', disable);
      pieces.forEach(piece => piece.classList.remove('scene-motion-ready', 'scene-entered'));
    };
  }, [ref, selector]);
}