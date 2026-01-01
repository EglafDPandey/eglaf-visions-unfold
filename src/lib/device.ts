// Lightweight, synchronous device checks used to disable WebGL-heavy UI on mobile.
// We avoid relying on async hooks here because rendering a <Canvas> even once can
// crash some mobile browsers (WebGL context loss -> black screen).

export function isMobileWebGLDisabled() {
  if (typeof window === 'undefined') return true;

  const ua = navigator.userAgent || '';
  const uaMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // Many tablets/phones can present a "desktop" UA; touch + coarse pointer is a safer signal.
  const hasTouch = (navigator.maxTouchPoints ?? 0) > 0;

  // matchMedia doesn't trigger layout/reflow.
  const smallViewport = typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 767px)').matches
    : window.innerWidth <= 768;

  const coarsePointer = typeof window.matchMedia === 'function'
    ? window.matchMedia('(pointer: coarse)').matches
    : false;

  return uaMobile || smallViewport || (hasTouch && coarsePointer);
}
