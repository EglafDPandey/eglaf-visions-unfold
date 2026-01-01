// Lightweight, synchronous device checks used to disable WebGL-heavy UI on mobile.
// We avoid relying on async hooks here because rendering a <Canvas> even once can
// crash some mobile browsers (WebGL context loss -> black screen).

export function isMobileWebGLDisabled() {
  if (typeof window === 'undefined') return true;

  const ua = navigator.userAgent || '';
  const uaMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // matchMedia doesn't trigger layout/reflow.
  const mql = typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 767px)')
    : null;

  return uaMobile || (mql ? mql.matches : window.innerWidth <= 768);
}
