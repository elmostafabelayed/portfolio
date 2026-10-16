# Portfolio audit — 16 October 2026

Targeted performance, accessibility, and security changes preserve the signature intro,
Cormorant Garamond typography, luxury palette, EN/FR content, themes, and all project artwork.
The production build passes. The 90+ performance target is **not confirmed**.

## Measurements actually collected

The comparison uses Lighthouse **13.5.0**, Chrome **155**, the default Moto G Power
mobile emulation (412 × 823, DPR 1.75), simulated slow 4G and 4× CPU slowdown,
against the production build at http://127.0.0.1:4173. These are single cold-load samples,
not field data or statistically stable benchmarks. The initial exploratory baseline
ran alongside coverage work and scored 51; it was excluded from the comparison in
favor of the isolated baseline below. The intermediate optimized run scored 70;
the final run below includes the last focus/transition refinements.

The supplied deployed scores (85 / 96 / 96 / 100; FCP 2.9 s; LCP 3.0 s; TBT 0 ms;
CLS 0; Speed Index 6.0 s) are a separate test environment, not the local baseline.

| Metric | Local baseline | Final local build |
| --- | ---: | ---: |
| Performance | 67 | 86 |
| Accessibility | 96 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 3.23 s | 2.55 s |
| LCP | 3.41 s | 3.04 s |
| Speed Index | 4.95 s | 3.78 s |
| TBT | 608 ms | 217 ms |
| CLS | 0 | 0.0002 |
| Main-thread work | 6.04 s | 2.99 s |
| Long tasks | 8 | 6 |
| Initial DOM elements (Lighthouse) | 1241 | 888 |
| Estimated unused JS | 55.1 KiB | 43.2 KiB |
| Render-blocking estimated savings | 1800 ms | 1200 ms |
| Forced reflow audit | Flagged | Passed |

The final trace recorded a very small shift (0.0002) on the logo dot; earlier
optimized and baseline runs recorded zero. No exact-zero CLS guarantee is made.

Build sizes are deterministic and separate from timing estimates:

| Initial resource | Before | After | Change |
| --- | ---: | ---: | ---: |
| JavaScript, uncompressed | 430.34 kB | 365.99 kB | −15.0% |
| JavaScript, gzip | 134.62 kB | 116.68 kB | −13.3% |
| Blocking CSS, uncompressed | 106.61 kB | 62.85 kB | −41.0% |
| Blocking CSS, gzip | 26.36 kB | 13.44 kB | −49.0% |

The project illustration chunk is 17.30 kB JS / 4.90 kB gzip plus 18.94 kB CSS /
4.20 kB gzip. The case-study dialog chunk is 2.97 kB JS / 1.23 kB gzip.
They are deferred, not removed. Browser network checks confirm neither project
chunk is requested at the top of the page. Fonts: **eight actual font downloads
before and after**, with the same files and byte sizes. No font traffic reduction
is claimed from deleting unused subset declarations.

Raw Lighthouse reports and traces: /tmp/portfolio-audit/before-isolated.report.html,
/tmp/portfolio-audit/final.report.html, and their JSON companions; traces are saved for the exploratory baseline and final run.
The durable machine-readable summary is [portfolio-audit-metrics.json](portfolio-audit-metrics.json).

## Investigation and verified causes

| Area investigated | Evidence and resulting action |
| --- | --- |
| Render blocking | The blocking request was the generated stylesheet, not an external Google Fonts request. Restricted Tailwind scanning to the active TSX app, removed unused script/subset font declarations, and split illustration CSS with its component. Styles needed for the initial layout remain synchronous to avoid flashes. |
| Fonts | All eight configured faces were actually downloaded. Kept all used weights, Cormorant italic, Inter, Space Grotesk, and JetBrains Mono. Latin ranges cover existing EN/FR accents and ligatures; retained `font-display: swap`. Preloaded only hero/intro Cormorant 600 and Inter. Generated font assets alone were not treated as downloads. |
| Unused JavaScript | Reproduced roughly 55 KiB of estimated initial unused code. Full Motion features included drag/layout machinery although no component uses layout/drag props. Switched to `LazyMotion`, `m`, and `domAnimation`. Deferred detailed offscreen illustrations and unopened dialogs. React/Motion runtime still accounts for substantial initial code; not all coverage-marked code is safely removable. |
| Main-thread work / long tasks | Initial layout and Motion work were significant. Reduced initial illustration DOM and removed unneeded Motion features. Timings remain variable and blocking tasks remain; the result is not a claim that all main-thread problems are solved. |
| Forced reflow | The baseline trace pointed to Motion projection's viewport measurement and computed-style reads, plus a small scroll-hook read. The final initial-load trace no longer flags forced reflow. Intro's arrival line now animates scale instead of width. Scroll measurements remain grouped before writes; pointer glow geometry reads remain because no measured first-load evidence implicated them. |
| Scroll rendering | Every scroll frame formerly updated React state for the whole App. Progress now updates its own transform; React only updates when the active section/back-to-top state changes. |
| DOM size | Detailed project illustrations were mounted below the fold at initial load. They now mount 600 px before entering view, reserving the same 1.65 aspect ratio. Semantic project text and navigation remain immediately available. No content was deleted. |
| Intro lifecycle | The inline completion callback changed on App renders, restarting effect timers after scroll updates. Stabilized it, guarded repeated skip actions, retained cleanup and the 2.28-second timeline, and preserved session/replay behavior. Reduced motion bypasses even replay. |
| Intro accessibility | `aria-hidden` alone did not stop background tabbing. Background regions are now inert during the intro, Tab stays on Skip Intro, Escape works, and completion hands focus to the main landmark. Its programmatic focus does not draw an outline around the entire page; interactive controls retain focus rings. |
| Contrast | The reported `span.mono` was the small `</>` decoration at the end of Skills, **not** the “02 / TECH STACK” eyebrow. Original #8D3A3C on #341016 measured 2.27:1 in axe. It now uses theme-aware accent color (approximately 8.38:1 dark, 6.39:1 light). Full scrolling also exposed low contrast in secondary light-theme text, category/date labels and some illustration text. Adjusted only those colors/opacity using Camel, Rubine, and darker Boho-derived tones. |
| Dialog keyboard behavior | React autofocus ran before the modal opened, compromising initial focus and the saved return target. Explicitly focus the close button after `showModal()`, preserving the trigger for restoration. Escape and browser-hash navigation pass. |
| DevTools Issues | No Issues-panel events, uncaught errors, or console warnings were captured in the final ordinary local session. Separate tests with the proposed security response headers had no CSP/Trusted Types violation events during intro, language/theme, dialog, and validation interactions. The authenticated deployment's own Issues panel could not be inspected. |
| Dependencies / old files | The active entry is main.tsx → App.tsx. Legacy JS pages/assets are not imported by that graph. They were not deleted or blamed for shipped JavaScript. Dependency audit found zero known vulnerabilities. |

## Security configuration

The existing vercel.json **already contained** X-Frame-Options, nosniff,
Referrer-Policy, Permissions-Policy, and a report-only CSP. These differ from the
older missing-header observations in the brief. Existing protection is preserved.

Enforced after Vercel deploys this configuration:

- X-Frame-Options: DENY and CSP frame-ancestors 'none'.
- X-Content-Type-Options: nosniff.
- Referrer-Policy: strict-origin-when-cross-origin.
- Existing restrictions on camera, microphone, geolocation, and payment.
- Cross-Origin-Opener-Policy: same-origin; no popup authentication or cross-window messaging is used.
- Limited CSP: object-src 'none'; base-uri 'self'; frame-ancestors 'none'.

Monitored only: the broader resource allowlist and Trusted Types. The inline
saved-theme script and JSON-LD have exact SHA-256 hashes, verified against
built HTML. Self-hosted scripts/fonts/styles and SVG data images are accounted
for; inline styles remain allowed for React/Motion. No unsafe-eval is allowed.
Trusted Types is **not enforced** and no permissive default policy was added.
Actual app interactions produced no violations in the local header simulation;
that is not proof of compatibility with every browser or Vercel preview tooling.

No reporting endpoint is invented. Report-only policy observations are local
browser diagnostics until a real collector and report-to/Reporting-Endpoints
configuration are supplied. Broad CSP enforcement should wait for production
compatibility review. These choices follow [MDN's CSP guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
and [Vercel's header configuration](https://vercel.com/docs/project-configuration/vercel-json).
Local Lighthouse best-practice scores do not prove production headers are active.

The supplied Vercel deployment URL returned HTTP 302 to Vercel SSO. That response
had HSTS and X-Frame-Options, but belongs to the access gate, not the portfolio.
No deployment protection setting was changed and no deployment was published.

## Verification

- `npm run typecheck`: passed on the final source.
- `npm run build`: passed on the final source.
- `npm audit`: zero known vulnerabilities.
- 16 desktop/mobile browser regression checks passed.
- Four extended accessibility checks passed, covering the entire scrolled page and every case-study dialog in EN/FR and dark/light themes on both viewport sizes.
- Covered intro completion under scrolling, session persistence, replay, click/Escape skip, reduced motion, Tab containment, focus handoff, all three dialogs and deep links, focus restoration, menu/Escape/navigation, theme/language persistence, empty/invalid-email form validation, and real CV PDF response/download.
- Responsive overflow checks passed at 320, 375, 430, 768, 1024, and 1440 px. Mobile/desktop screenshots were visually inspected.
- Header simulation checked built inline hashes, CSP/Trusted Types violations, runtime errors, and DevTools Issues. Vite preview does not itself apply vercel.json.
- No email was sent; the contact form remains a mailto handoff. Sending through an installed mail client was not automated.

Run locally: `npm run build && npm run test:audit` with Google Chrome installed.

## Exact files changed for this audit

- `src/App.tsx`: smaller Motion feature set, stable intro handoff, inert regions, lazy project dialogs/illustrations.
- `src/components/DeferredProjectVisual.tsx`: nearby loading with stable dimensions and observer cleanup.
- `src/components/PortfolioIntro.tsx`: focus/keyboard lifecycle, skip guard, scale animation, lightweight Motion elements.
- `src/components/ProjectDialog.tsx`: modal initial focus and restoration.
- `src/hooks/usePortfolio.ts`: progress updates without per-frame App rendering.
- `src/main.tsx`, `src/styles/fonts.css`, `index.html`: scoped font declarations and two critical preloads.
- `src/styles/global.css`: scoped Tailwind scanning, verified contrast fixes, placeholder dimensions, main-landmark focus presentation.
- `src/styles/portfolio-intro.css`: fixed-width scale line and targeted transitions.
- `src/styles/project-visuals.css`: verified illustration-text contrast fixes.
- `vercel.json`: preserved headers, COOP, limited enforced CSP, corrected broader report-only CSP/Trusted Types.
- `playwright.config.ts`, `tests/audit.spec.ts`, `package.json`, `.gitignore`: repeatable browser checks and ignored generated output.
- `README.md`, `docs/portfolio-audit.md`, `docs/portfolio-audit-metrics.json`: verification and deployment documentation/evidence.

## Remaining work and deployment requirements

1. The 90+ mobile performance goal is not established. Blocking time, long tasks, remaining JS coverage, and one blocking CSS request still need measurement on the final hosted site. Do not remove the intro solely to chase the score.
2. Deploy the source/configuration, then inspect the portfolio's actual HTTP 200 response headers on an accessible preview or production domain. The supplied gated URL cannot establish whether the app's headers are currently deployed.
3. Re-run mobile Lighthouse against that deployment under the original environment. The local results cannot be compared directly with the supplied 85-point production run.
4. Add a real CSP reporting destination if centralized monitoring is desired; only tighten/enforce the broader CSP and Trusted Types after reviewing production reports. Regenerate inline-script hashes whenever those HTML scripts change.
5. Automated accessibility checks are not a substitute for a full assistive-technology review. Screen-reader and real mail-client testing remain manual checks.
