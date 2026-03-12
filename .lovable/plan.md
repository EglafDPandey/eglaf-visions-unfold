

# Fix Build Errors + Mobile Performance (FCP/LCP)

There are **3 issues** to resolve: 2 build errors and the mobile speed problem.

---

## 1. Build Error: Missing `@tiptap/starter-kit` package

The TipTap editor imports `@tiptap/starter-kit` but this package is not installed. Will add it to dependencies.

**File:** `package.json` — add `@tiptap/starter-kit`

---

## 2. Build Error: CSS `@import` order

The `@import url(...)` for Google Fonts is placed **after** the `@tailwind` directives, which violates CSS spec. This must come first.

**File:** `src/index.css`
- Move `@import url('https://fonts.googleapis.com/...')` to line 1, before `@tailwind base`

---

## 3. Mobile FCP/LCP: 4.6s → target under 2.5s

Multiple factors are causing slow paint on mobile:

### a) Render-blocking Google Fonts
The CSS `@import` blocks rendering until fonts download. Replace with a `<link rel="preload">` in `index.html` so fonts load asynchronously.

**Files:** `index.html` (add preload link), `src/index.css` (remove @import)

### b) Heavy homepage bundle
The Index page eagerly imports `MethodologyPreview.tsx` (1,153 lines with Three.js/Canvas). On mobile, this JavaScript must parse before anything paints.

**File:** `src/pages/Index.tsx`
- Lazy-load `MethodologyPreview` components (`StatsSection`, `DataFlowSection`, `ProjectTimeline`)
- These are below the fold and don't affect FCP/LCP

### c) Framer Motion animation delays on hero content
The hero text (LCP element) has animation delays (0.1s-0.15s) which postpone paint. On mobile, reduce these to 0 so text appears immediately.

**File:** `src/components/HeroSection.tsx`
- Remove animation delays on h1 and description paragraph (the LCP candidates)
- Keep animations but start them instantly

### d) Inline critical font-family
Add `font-display: swap` behavior by preloading fonts with `crossorigin` attribute so text renders immediately with fallback fonts.

**File:** `index.html`

---

## Summary of Changes

| File | Change |
|------|--------|
| `package.json` | Add `@tiptap/starter-kit` dependency |
| `src/index.css` | Remove `@import` for Google Fonts |
| `index.html` | Add `<link rel="preload">` for fonts |
| `src/pages/Index.tsx` | Lazy-load MethodologyPreview components |
| `src/components/HeroSection.tsx` | Remove animation delays on LCP elements |

