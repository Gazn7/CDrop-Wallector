# Handoff: Wallector Landing Page

## Overview

Marketing landing page for **Wallector** — a service by **CriticalDrop** that turns marketplace catalogs into custom ChatGPT apps (OpenAI store). The page sells a 4-week productized engagement: discovery → build → brand & test → launch.

The page contains:
- A hero with a **live, working mini-chat** that intent-matches against a fake catalog of 8 artworks
- A second, fuller chat instance in the "Try it live" section (same engine, more space)
- A 3-step coverflow + dense product-spec table (with click-to-flip cells)
- A "How we work" 4-week timeline of click-to-flip cards
- An accordion FAQ
- Final CTA card with email/calendar links + footer
- A **Tweaks panel** (toggleable via toolbar) for editing brand color, density, hero variant, and section visibility

## About the Design Files

The files in this bundle are **design references created in HTML** — a high-fidelity prototype showing intended look, copy, and behavior. They are **not production code to copy directly.**

The task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, Remix, plain HTML, whatever Wallector/CriticalDrop is using) using its established patterns, component library, and styling system. If no environment exists yet, choose what suits a marketing site best — Next.js + Tailwind is a fine default, but Astro is even better for a static-first marketing page like this.

The chat demo is intentionally a real working interaction (calls Claude with a 4.5s timeout, falls back to a deterministic local intent matcher). When productionizing, you'll likely want to swap the local matcher for a real backend that hits the actual catalog.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interaction details are all decided. Recreate pixel-perfectly using the codebase's existing libraries.

## Screens / Views

The page is a single long scroll. Sections in order:

### 1. Header (sticky)
- **Layout**: Full-width, fixed/sticky top, padded container
- **Left**: CriticalDrop logo (SVG) × Wallector logo (SVG), separated by a small × glyph
- **Right**: Nav links — "How it works", "Try it", "Process", "FAQ" (hidden ≤860px)
- **Far right**: Primary CTA button "Book a call →"

### 2. Hero
- **Layout**: Two-column grid (text left, mock right) at desktop; stacks at ≤1024px
- **Eyebrow**: "A SERVICE BY CRITICALDROP" (mono, 0.7rem, muted, uppercase, letter-spacing 0.18em)
- **H1**: "Turn your marketplace into a `<em>ChatGPT app</em>`" — `<em>` is the orange accent color
- **Sub**: 1.05rem, muted-1, max-width ~520px
- **Actions row**: Primary "See it work →" + ghost "Book a 20-min call" — both `btn-lg` (48px tall)
- **Meta row**: Three small mono labels — "4 weeks to live · 1 catalog per app · Lives in OpenAI store"
- **Right column**: Mock browser frame showing widget-2.jpg (a Wallector chat screenshot)

### 3. Live Mini-Chat (hero alternate / inline)
- The hero has a "wide" tweak variant where the chat takes the full width
- Chat container has padding 18px, dark bg-1, rounded radius-lg, border var(--line)
- Top bar: green dot + "Wallector · ChatGPT app" + "Live" pill
- Body: scrollable message list, bot bubbles get a "Wallector" mono label above
- When the bot returns artworks, they render as a 3-up grid of `chat-result` cards (image, title, technique, price). Drops to 2-up at ≤640px
- Suggestion chips below the body (4 starter prompts)
- Input row: text input (font-size 16px to prevent iOS zoom) + circular send button with ↑

### 4. Proof Bar
- 4-column grid of `proof-item`s, each: big mono number (e.g. "8") + small mono label below
- Stacks 2-up at ≤860px, single column at ≤640px (with hairline rules between)
- Items: "8 artworks indexed", "12 avg session depth", "94% multi-turn refines", "28d to live"

### 5. How It Works (Coverflow + Spec Table)
- **Coverflow**: 3 panels, center one prominent, side ones rotated/offset. Click a side panel or dot to make it active. Caption underneath: step number + title + description.
- **Spec table** (below coverflow): 4 cells in a row connected by 1px borders. Each cell is a **flip card** — front shows `Query type / Modality / Memory / Hosting` with the value in orange, back shows a longer explanation paragraph. Click to flip.
- Stacks 2-up at ≤1024px, single column at ≤640px

### 6. Try It Live (Full Demo)
- Two-column: full-width chat (same `<MiniChat>` component, different suggestions/copy) on right, numbered "how to try it" rail on left
- Rail has 3 numbered cards (`demo-point-num` + h4 + p)
- Stacks at ≤1024px

### 7. How We Work (4-Week Timeline)
- Section head: "From zero to live in `<em>4 weeks</em>`, not 4 quarters." with side description
- 4-column grid of **flip cards**:
  - Front: orange-bordered circle with step number (40px circle, mono font) + week label + step name + "Tap to expand" hint
  - Back: week + step name + full description + `→ Output: ___` line
- Cards are equal-height (min-height 230px desktop, 200px mobile), stretch to grid row
- Stacks 2-up at ≤1024px, 1-up at ≤600px
- Decorative orange dotted line connecting the circles, hidden at ≤1024px

### 8. FAQ
- 2-column grid: section head left, accordion list right
- 6 items, click to expand. Closed: question + "+", open: rotated "+" → "×", answer slides down
- Hairline borders between items
- Stacks at ≤860px

### 9. CTA Card
- Centered orange-glow card (radial gradient at top behind it)
- Two-column: heading/sub left, action buttons + contact dl right
- Heading: "Ready to skip the filters?"
- Action buttons + dl with email, location, response time
- Stacks at ≤1024px

### 10. Footer
- 4-column grid: project / contact / legal / built-with
- Bottom row: copyright + version
- Stacks 2-up at ≤860px, 1-up at ≤640px

## Interactions & Behavior

### Mini-Chat
- On submit, push user message → show typing indicator → call `window.claude.complete()` with system prompt that lists the catalog and asks Claude to return JSON `{reply, ids}` → render bot bubble + result cards
- Timeout: 4.5s. On timeout/error/missing API, fall back to **local intent matcher**: keyword scoring across `title`, `technique`, `style`, `mood`, `palette`, `priceRange` — return top-3 by score
- Multi-turn: keeps last 6 messages in context
- The 8-item fake catalog lives inline in `chat.jsx` (titles, techniques, prices, tag arrays, image URLs)

### Flip Cards (timeline + spec table)
- 3D flip on Y-axis, 700ms `cubic-bezier(0.22, 1, 0.36, 1)`
- Click toggles a `--flipped` class on the outer button
- Both faces have `backface-visibility: hidden`. Front face has explicit `transform: rotateY(0deg)` to anchor it as the front plane (without this, faces are co-planar and the front gets hidden, exposing reversed back-face text — common Safari/Chrome bug)
- Spec cells keep an orange left-rail accent (`::before`) that fills on hover OR while flipped

### Coverflow
- 3 panels arranged in 3D space, side panels at ±18° rotateY and translateX(-150px / 150px) at 0.85 scale
- Click side panel or dot dot to set active. Active panel scales to 1, opacity 1
- Caption fades + slides on `key={active}` change

### FAQ
- Single-open accordion. `.faq-a` uses `grid-template-rows` 0fr → 1fr animation (smooth height transition without `max-height` jank)

### Tweaks Panel
- Loaded from `tweaks-panel.jsx` (the project's tweaks-panel starter component)
- Toggle visibility via `__edit_mode_available` / `__activate_edit_mode` postMessage protocol
- Persists state by posting `__edit_mode_set_keys` and writing back into the `EDITMODE-BEGIN/END` JSON block in the HTML
- Controls:
  - Brand color picker (writes to `--accent` and a derived `--accent-glow`)
  - Hero variant: "Split" (2-col text+mock) vs "Wide" (centered, full-width chat)
  - Density: compact / default / airy (changes section padding via `data-density` attribute)
  - Show/hide proof bar
  - Show/hide FAQ section

### Reveal Animations
- `<Reveal>` wraps most blocks. Uses IntersectionObserver to add `.in` class on enter
- Default: opacity 0 → 1, translateY(20px) → 0, 600ms ease
- Optional `delay` prop in ms
- Disabled under `prefers-reduced-motion`

## State Management

### Mini-chat
- `messages: Array<{who: 'user'|'bot', text, items?, intro?}>` — chat log
- `input: string` — current draft
- `busy: boolean` — disables input while waiting
- Conversation history is replayed to Claude on each turn (last 6 messages)

### Coverflow
- `active: number` — index of centered panel (0–2)

### FAQ
- `open: number` — index of open item, -1 for none

### FlipCard / SpecFlipCell
- `flipped: boolean` — local per-card

### Tweaks
- `tweaks: object` — merged from `TWEAK_DEFAULTS` JSON block, persisted via postMessage
- Keys: `accent`, `hero` ('split'|'wide'), `density` ('compact'|'default'|'airy'), `showProof: bool`, `showFaq: bool`

## Design Tokens

```css
/* Colors (dark theme, single mode) */
--bg:        #0a0a0b   /* page background */
--bg-1:      #131316   /* card / panel surface */
--bg-2:      #1a1a1d   /* hover / elevated surface */
--text:      #f4f4f5   /* primary text */
--muted:     #71717a   /* secondary / mono labels */
--muted-1:   #a1a1aa   /* body copy */
--line:      #27272a   /* hairlines, borders */
--line-1:    #3f3f46   /* hover borders */
--accent:    #f97316   /* Wallector orange, used for emphasis */
--accent-glow: rgba(249, 115, 22, 0.12)  /* radial-gradient backdrops */

/* Typography */
--sans: 'Geist', -apple-system, system-ui, sans-serif
--mono: 'Geist Mono', ui-monospace, 'JetBrains Mono', monospace

/* Type scale (rough) */
H1 hero:     clamp(2.6rem, 5.4vw, 4.8rem), weight 600, line-height 1.04, letter-spacing -0.03em
H2:          clamp(2.1rem, 4vw, 3rem),     weight 600, line-height 1.08, letter-spacing -0.02em
H3:          1.15–1.25rem,                  weight 600
Body:        0.96rem, line-height 1.6
Eyebrow:     0.7rem mono, uppercase, letter-spacing 0.18em
Mono label:  0.68–0.7rem mono, uppercase, letter-spacing 0.1em

/* Spacing */
Container: max-width 1240px, side padding 32px (20px ≤640, 16px ≤380)
Section vertical padding: 96px desktop, 64px mobile (×0.7 compact, ×1.3 airy)
Grid gaps: 16–32px depending on context

/* Radii */
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 16px

/* Shadows */
Subtle elevation only — single 1px borders + bg-1/bg-2 contrast carry the depth.

/* Easing */
Default: cubic-bezier(0.22, 1, 0.36, 1)  /* "ease-out-expo-ish" */
Flip: 700ms with the above
Reveal: 600ms ease
Hover: 180–220ms ease
```

## Responsive Breakpoints

- `≤1024px` — hero/demo/cta-card stack to 1 column; spec table & timeline → 2 columns
- `≤860px` — nav hides; proof grid → 2 col; FAQ → 1 col; footer → 2 col
- `≤640px` — full mobile pass: section padding tightens, hero stacks CTA buttons full-width, chat results 2-up, coverflow shrinks to 320px, all grids collapse to 1 column, footer 1 col, buttons min-height 48px
- `≤380px` — extra container padding tighten, hero h1 capped at 2rem

## Assets

All in `assets/` folder of this handoff:
- `criticaldrop-logo.svg` — CriticalDrop wordmark (used in header + footer)
- `wallector-logo.svg` — Wallector wordmark (used in header)
- `widget-1.jpg`, `widget-2.jpg`, `widget-3.jpg` — screenshots of the actual Wallector ChatGPT widget, used in coverflow and hero mock
- The 8 artwork thumbnails in the chat catalog are remote URLs (Unsplash) hardcoded in `chat.jsx`. **Replace with actual artwork imagery / a real catalog endpoint when productionizing.**

## Files

- `Wallector Landing.html` — entry point, loads React 18.3.1 + Babel standalone, all scripts
- `styles.css` — all styles (~1300 lines), heavily commented section by section
- `app.jsx` — top-level App component, layout, all sections except the chat and coverflow/FAQ
- `chat.jsx` — `MiniChat` component, fake catalog, intent matcher, Claude integration
- `sections.jsx` — `Coverflow`, `FAQ` components
- `tweaks-panel.jsx` — Tweaks panel scaffold (from project starter)

## Notes for the implementer

1. **Drop the React+Babel-in-browser setup.** It's there because this is a single-file design tool. In a real codebase, just port the JSX directly into your framework's component model.
2. **The chat demo's intent matcher** in `chat.jsx` is fine for a marketing-page demo but should be backed by a real search endpoint in production (your actual catalog + an LLM call server-side).
3. **The catalog data** (8 artworks) is all in one constant at the top of `chat.jsx`. Easy to swap.
4. **Tweaks panel is a design-time tool** — don't ship it. The values it controls become CSS tokens / build-time constants in production.
5. **Fonts**: Geist + Geist Mono. Use `next/font` (or equivalent) instead of Google CDN for production performance.
6. **`<Reveal>` IntersectionObserver pattern** is reusable as-is — port it to a custom hook in your framework.
