# El Mostafa Belayd · Developer portfolio

A responsive English/French portfolio for El Mostafa Belayd, Junior Full-Stack Web Developer in Fès, Morocco. Built with React 19, TypeScript, Vite 7, Tailwind CSS 4, Motion, and Lucide icons. Typography is bundled locally with Fontsource.

The single-page experience includes a responsive navigation, dark/light themes, project case studies, technical skills, experience and education, and an accessible contact form. All professional content comes from the supplied brief. Project mockups contain **illustrative sample data**; they are not screenshots or live connected services.

## Local development

Use Node.js **22.12 or later** and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. `npm start` is an alias for the development server.

```bash
npm run typecheck  # TypeScript checks
npm run build      # TypeScript checks and production assets in dist/
npm run preview    # Preview the production build locally
```

The GitHub Actions workflow runs dependency installation, type checking, and a production build. It does not publish or deploy the site.

For container-based development:

```bash
docker compose up --build
```

Open `http://localhost:5173`. Source, public assets, and the HTML entry point are mounted for local development. The Docker configuration runs the development server; use the static `dist/` output for production hosting.

## Content and settings

Edit `src/data/content.ts` for the centralized English/French copy, profile information, project details, and site configuration. Keep both translations in sync. Technology names, company names, and project names remain unchanged between languages.

- The **EN / FR** control switches language without a page reload.
- The theme defaults to dark. The navigation theme control persists the selected theme in local storage under `em-theme`; storage restrictions fall back gracefully to dark.
- The availability badge is editable profile copy, not a live employment status.
- Only the supplied GitHub and LinkedIn profile links are included. Add project repository/demo buttons only after real URLs are available.

### Connect the real CV

A resume PDF was not supplied. `siteConfig.cvUrl` is intentionally `null`, so the portfolio does not pretend that a resume can be downloaded.

1. Create `public/resume/` and place the actual PDF there, for example `el-mostafa-belayd-cv.pdf`.
2. Set `siteConfig.cvUrl` in `src/data/content.ts` to `./resume/el-mostafa-belayd-cv.pdf`.
3. Verify that the download opens the correct document in the production preview.

Never substitute another person's CV or a fabricated resume. The template's previous personal assets are not connected to this portfolio.

### Replace illustrative visuals

The hero and project previews are original interface illustrations made in code. Each project preview is marked as illustrative. Replace these with genuine project screenshots when available and update the accompanying alt text. Keep the illustrative label until a preview actually depicts the project.

### Contact behavior

The form validates the visitor's name, email, subject, and message, then opens a prepared email through `mailto:` to **elmostafabelayd@gmail.com**. The visitor sends it through their own email application. There is no server, form service, or fake delivery confirmation. Direct email, copy-email, phone, GitHub, and LinkedIn contact actions are also available.

If adding a form backend later, configure its actual endpoint, validate and protect submissions on the server, and show success only after the endpoint confirms acceptance. Do not place service secrets in browser code.

## Publishing

Run `npm run build` and upload the contents of `dist/` to a static host. Vite uses a relative base so the build can also be served from a repository subdirectory. Section navigation and project case studies stay within the single page.

No public domain has been supplied, so canonical URLs, an `og:url`, a custom-domain `CNAME`, and a sitemap are intentionally absent. After choosing the real deployment URL:

1. Add a canonical URL and `og:url` in the root `index.html`.
2. Export `public/social-card.svg` as a **1200 × 630 PNG/JPEG** for wider social-platform compatibility. Update the Open Graph and Twitter image tags to an absolute URL on the deployed domain.
3. Create a sitemap using real public page URLs, and add its absolute location to `public/robots.txt`.
4. Verify the published metadata and social preview, phone/email links, and CV download.

The included favicon, web manifest, robots file, and Person structured data use the supplied identity and contact details. No analytics, advertisements, or tracking services are configured.

## Accessibility and verification

Interactions use semantic elements, keyboard focus states, labeled form controls, and reduced-motion support. Check both languages and themes after content edits; longer French copy can affect layout. Review widths of 320, 375, 430, 768, 1024, and 1440 pixels, keyboard navigation, project dialogs, form validation, and copying email before publishing.

Build success is not a Lighthouse score. Measure performance, accessibility, best practices, and SEO against the final hosted site if those scores are needed.

## License

The repository's existing MIT license is preserved in `LICENSE`. The portfolio is an original implementation created within the existing MasterPortfolio repository.
