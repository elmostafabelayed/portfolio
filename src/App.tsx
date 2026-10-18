import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { domAnimation, LazyMotion, MotionConfig, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Braces, BrainCircuit, Check, CheckCheck, Code2, Cpu, Database, Download, Github, GraduationCap, Layers, Lightbulb, Linkedin, MapPin, Menu, Monitor, Moon, Network, Puzzle, Sparkles, Sun, Terminal, Users, Wrench, X } from 'lucide-react';
import { content, siteConfig, type Language } from './data/content';
import { useMetadata, useScrollState, useStoredState } from './hooks/usePortfolio';
import { HeroVisual } from './components/HeroVisual';
import { TechIcon, ReactMark, LaravelMark } from './components/TechIcon';
const ProjectDialog = lazy(() => import('./components/ProjectDialog').then(module => ({ default: module.ProjectDialog })));
import { ContactSection } from './components/ContactForm';
import { PortfolioIntro } from './components/PortfolioIntro';

// Cinematic Animation System Components
import { CharacterMaskTitle } from './components/cinematic/CharacterMaskTitle';
import { SignatureArchitecturalLine } from './components/cinematic/SignatureArchitecturalLine';
import { ProjectsArchitecturalFrame } from './components/cinematic/ProjectsArchitecturalFrame';
import { ProjectJobsyExhibit } from './components/cinematic/ProjectJobsyExhibit';
import { ProjectGuardianExhibit } from './components/cinematic/ProjectGuardianExhibit';
import { ProjectNotesExhibit } from './components/cinematic/ProjectNotesExhibit';
import { EditorialReveal, EditorialHeading } from './components/cinematic/EditorialReveal';
import { EASING } from './components/cinematic/motionTokens';

const skillIcons = [Monitor, Braces, Database, Terminal, Cpu, Wrench];
const qualityIcons = [Users, Puzzle, Code2, Layers, CheckCheck, BrainCircuit, BookOpen];

export default function App() {
  const [language, setLanguage] = useStoredState<Language>('em-language', 'en', ['en', 'fr']);
  const [theme, setTheme] = useStoredState<'dark' | 'light'>('em-theme', 'dark', ['dark', 'light']);
  const [menuOpen, setMenuOpen] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [projectId, setProjectId] = useState<string | null>(() => location.hash.startsWith('#project/') ? location.hash.slice(9) : null);
  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const p = new URLSearchParams(window.location.search);
    if (p.get('intro') === 'true' || p.get('replay') === 'true') return true;
    try { return !sessionStorage.getItem('em-intro-seen'); } catch { return true; }
  });
  const openedHere = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const hero = useRef<HTMLElement>(null);
  const { progressRef, active, showTop } = useScrollState();
  const reduced = useReducedMotion();
  const t = content[language];

  useMetadata(language);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#280B0F' : '#FAF6F0');
  }, [theme]);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setPhrase(v => (v + 1) % 4), 4500);
    return () => clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    const onHash = () => setProjectId(location.hash.startsWith('#project/') ? location.hash.slice(9) : null);
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [menuOpen]);

  const completeIntro = useCallback(() => setIntroActive(false), []);
  const introWasActive = useRef(introActive);
  useEffect(() => {
    if (introWasActive.current && !introActive) document.getElementById('main')?.focus({ preventScroll: true });
    introWasActive.current = introActive;
  }, [introActive]);

  const openProject = (id: string) => {
    openedHere.current = true;
    location.hash = `project/${id}`;
  };
  const closeProject = () => {
    if (openedHere.current) {
      history.back();
      openedHere.current = false;
    } else {
      location.hash = 'projects';
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {introActive && <PortfolioIntro language={language} onComplete={completeIntro} />}
        <a inert={introActive} className="skip-link" href="#main">{t.ui.skip}</a>
        <div className="reading-progress" ref={progressRef} />

        {/* Phase 1: Navigation settles into position */}
        <m.header
          className="site-header"
          aria-hidden={introActive}
          inert={introActive}
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EASING.editorial, delay: 0.08 }}
        >
          <div className="nav-container">
            <a className="logo" href="#home" aria-label="El Mostafa Belayd — Home">EM<span>.</span></a>
            <nav id="main-navigation" className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label={language === 'en' ? 'Main navigation' : 'Navigation principale'}>
              {t.nav.map(link => (
                <a
                  href={`#${link.id}`}
                  key={link.id}
                  onClick={() => setMenuOpen(false)}
                  className={active === link.id ? 'active' : ''}
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="nav-actions">
              <div className="language-switch" aria-label={language === 'en' ? 'Language' : 'Langue'}>
                {(['en', 'fr'] as const).map(l => (
                  <button
                    key={l}
                    className={language === l ? 'selected' : ''}
                    lang={l}
                    aria-pressed={language === l}
                    aria-label={l === 'en' ? 'English' : 'Français'}
                    onClick={() => setLanguage(l)}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                className="icon-button theme-toggle"
                aria-label={theme === 'dark' ? t.ui.themeLight : t.ui.themeDark}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a href="#contact" className="nav-cta">{t.ui.connect}<ArrowUpRight size={15} /></a>
              <button
                className="icon-button mobile-menu"
                ref={menuButton}
                aria-label={menuOpen ? t.ui.close : t.ui.menu}
                aria-controls="main-navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </m.header>

        <main id="main" tabIndex={-1} aria-hidden={introActive} inert={introActive}>
          {/* Phase 1: The Hero Awakens */}
          <section
            id="home"
            className="hero-section"
            ref={hero}
            onPointerMove={e => {
              if (e.pointerType !== 'mouse' || reduced) return;
              const rect = e.currentTarget.getBoundingClientRect();
              hero.current?.style.setProperty('--pointer-x', `${e.clientX - rect.left}px`);
              hero.current?.style.setProperty('--pointer-y', `${e.clientY - rect.top}px`);
            }}
          >
            <div className="hero-grid-background" />
            <div className="container hero-container">
              <div className="hero-content">
                <m.div
                  className="availability"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: EASING.editorial, delay: 0.05 }}
                >
                  <span className="status-dot" />{t.hero.badge}
                </m.div>

                <m.p
                  className="hero-intro"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: EASING.editorial, delay: 0.12 }}
                >
                  {t.hero.intro}<span className="greeting-mark">✳</span>
                </m.p>

                {/* Custom Character-Mask Reveal for Hero Typography */}
                <CharacterMaskTitle language={language} active={!introActive} baseDelay={0.2} />

                <m.div
                  className="rotating-phrase"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: EASING.editorial, delay: 0.45 }}
                >
                  <span className="prompt-arrow">&gt;</span>
                  <m.span
                    key={`${language}-${reduced ? 0 : phrase}`}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {t.hero.phrases[reduced ? 0 : phrase]}
                  </m.span>
                  <span className="phrase-cursor" />
                </m.div>

                <m.p
                  className="hero-description"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, ease: EASING.editorial, delay: 0.54 }}
                >
                  {t.hero.description}
                </m.p>

                {/* CTA Buttons appear naturally */}
                <m.div
                  className="hero-buttons"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.55, ease: EASING.editorial, delay: 0.64 }}
                >
                  <a href="#projects" className="button primary">{t.hero.explore}<ArrowUpRight size={18} /></a>
                  {siteConfig.cvUrl ? (
                    <a href={siteConfig.cvUrl} download className="button secondary">
                      <Download size={17} />{t.hero.download}
                    </a>
                  ) : (
                    <span className="cv-control">
                      <button disabled className="button secondary" aria-describedby="cv-status">
                        <Download size={16} />{t.hero.download}
                      </button>
                      <small id="cv-status">{t.hero.cvUnavailable}</small>
                    </span>
                  )}
                </m.div>

                <m.div
                  className="hero-meta"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: EASING.editorial, delay: 0.74 }}
                >
                  <span><MapPin size={14} />{t.hero.based}</span>
                  <i />
                  <a href="#contact">{t.hero.contact}<ArrowRight size={14} /></a>
                </m.div>

                {/* Subtle in-flow architectural datum safely below CTA buttons */}
                <div className="hero-architectural-datum" aria-hidden="true">
                  <span className="datum-crosshair">+</span>
                  <div className="datum-line" />
                  <span className="datum-coord">34.03°N · 5.00°W</span>
                </div>
              </div>

              {/* Hero illustration enters with coordinated subtle movement */}
              <m.div
                className="hero-visual-motion-wrap"
                initial={reduced ? false : { opacity: 0, y: 26, scale: 0.96 }}
                animate={!introActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.96 }}
                transition={{ duration: 0.85, ease: EASING.editorial, delay: 0.28 }}
              >
                <HeroVisual language={language} />
              </m.div>

              <m.div
                className="hero-bottom"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={!introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: EASING.editorial, delay: 0.84 }}
              >
                <a href="#about" className="scroll-cue"><span><ArrowDown size={14} /></span>{t.ui.scroll}</a>
                <div className="hero-socials">
                  <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19} /></a>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
                  <span>01 — 07</span>
                </div>
              </m.div>
            </div>
          </section>

          {/* Phase 2: The Signature Architectural Connector Line */}
          <SignatureArchitecturalLine language={language} />

          <div className="technology-strip">
            <div className="container">
              <span className="strip-label">
                {language === 'en' ? 'THE TOOLS BEHIND THE IDEAS' : 'LES OUTILS DERRIÈRE LES IDÉES'}
              </span>
              <div>
                {['React.js', 'Laravel', 'JavaScript', 'PHP', 'MySQL', 'Git', 'Linux'].map(name => (
                  <span key={name}><TechIcon name={name} size={23} />{name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 5: Editorial Reveal for About */}
          <section id="about" className="section">
            <div className="container">
              <div className="about-grid">
                <div>
                  <EditorialHeading eyebrow={t.about.eyebrow} title={t.about.title} />
                  <EditorialReveal className="about-copy" delay={0.2}>
                    {t.about.paragraphs.map(p => <p key={p}>{p}</p>)}
                  </EditorialReveal>
                </div>
                <EditorialReveal className="about-aside" delay={0.3}>
                  <div className="profile-card">
                    <div className="profile-mark">EM<span>.</span><div className="profile-orbit" /></div>
                    <div className="profile-caption">
                      <span>EL MOSTAFA BELAYD</span>
                      <span>{language === 'en' ? 'DEVELOPER. THINKER. BUILDER.' : 'DÉVELOPPER. COMPRENDRE. CRÉER.'}</span>
                    </div>
                    <div className="profile-facts">
                      {t.about.facts.map((fact, i) => {
                        const Icon = [MapPin, Code2, GraduationCap, Lightbulb][i];
                        return (
                          <div key={fact.label}>
                            <Icon size={18} />
                            <div>
                              <span>{fact.label}</span>
                              <p>{fact.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="philosophy">
                    <span>“</span>
                    <p>{language === 'en' ? 'Understand the problem. Build with purpose. Keep learning.' : 'Comprendre le problème. Construire avec intention. Continuer à apprendre.'}</p>
                  </div>
                </EditorialReveal>
              </div>

              <EditorialReveal className="values" delay={0.35}>
                <span className="values-label">{t.about.valuesTitle}<ArrowDownRight size={20} /></span>
                {t.about.values.map((v, i) => (
                  <div key={v.title}>
                    <span className="value-index">0{i + 1}</span>
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                ))}
              </EditorialReveal>
            </div>
          </section>

          {/* Phase 5: Editorial Reveal for Skills */}
          <section id="skills" className="section tinted-section">
            <div className="container">
              <EditorialHeading {...t.skills} />
              <div className="skills-grid">
                {t.skills.categories.map((cat, i) => {
                  const Icon = skillIcons[i];
                  return (
                    <EditorialReveal className="skill-card" key={cat.title} delay={0.08 * i}>
                      <div className={`category-icon category-${i}`}><Icon size={22} /></div>
                      <span className="skill-number">0{i + 1}</span>
                      <h3>{cat.title}</h3>
                      <div className="skill-badges">
                        {cat.items.map(name => (
                          <span key={name}><TechIcon name={name} size={15} />{name}</span>
                        ))}
                      </div>
                    </EditorialReveal>
                  );
                })}
              </div>
              <EditorialReveal className="stack-note" delay={0.4}>
                <span className="status-dot" />
                {language === 'en' ? 'Always learning. Always building.' : 'Toujours apprendre. Toujours construire.'}
                <span className="mono">&lt; / &gt;</span>
              </EditorialReveal>
            </div>
          </section>

          {/* Phase 3 & 4: The Project Frame Reveal & Interactive Hover */}
          <section id="projects" className="section projects-section">
            <div className="container">
              {/* Architectural Frame Header crown for Featured Projects */}
              <ProjectsArchitecturalFrame language={language} />

              <div className="heading-with-note">
                <EditorialHeading eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
                <span className="section-side-note">
                  03 {language === 'en' ? 'SELECTED PROJECTS' : 'PROJETS SÉLECTIONNÉS'}
                  <ArrowDownRight size={25} />
                </span>
              </div>

              <div className="projects-grid">
                {t.projects.items.map(project => {
                  if (project.id === 'jobsy') {
                    return (
                      <ProjectJobsyExhibit
                        key={project.id}
                        project={project}
                        language={language}
                        viewCaseLabel={t.projects.viewCase}
                        onOpen={openProject}
                      />
                    );
                  }
                  if (project.id === 'guardian') {
                    return (
                      <ProjectGuardianExhibit
                        key={project.id}
                        project={project}
                        language={language}
                        viewCaseLabel={t.projects.viewCase}
                        onOpen={openProject}
                      />
                    );
                  }
                  return (
                    <ProjectNotesExhibit
                      key={project.id}
                      project={project}
                      language={language}
                      viewCaseLabel={t.projects.viewCase}
                      onOpen={openProject}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* Phase 5: Editorial Reveal for Experience */}
          <section id="experience" className="section tinted-section">
            <div className="container">
              <div className="journey-grid">
                <EditorialHeading eyebrow={t.experience.eyebrow} title={t.experience.title} />
                <div className="timeline">
                  <EditorialReveal className="experience-card" delay={0.2}>
                    <div className="timeline-dot" />
                    <div className="experience-top">
                      <span className="company-logo">U<span>i</span></span>
                      <div>
                        <h3>{t.experience.company}</h3>
                        <span className="experience-location"><MapPin size={12} />{t.experience.location}</span>
                      </div>
                      <span className="date-tag">{t.experience.date}</span>
                    </div>
                    <h4>{t.experience.role}</h4>
                    <span className="duration">{t.experience.duration}</span>
                    <p>{t.experience.description}</p>
                    <ul>
                      {t.experience.responsibilities.map(r => (
                        <li key={r}><Check size={14} />{r}</li>
                      ))}
                    </ul>
                    <div className="tech-tags">
                      <span>React.js</span><span>Laravel</span><span>MySQL</span><span>REST APIs</span>
                    </div>
                    <button className="text-button" onClick={() => openProject('jobsy')}>
                      {t.projects.viewCase} — Jobsy<ArrowUpRight size={15} />
                    </button>
                  </EditorialReveal>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 5: Editorial Reveal for Education */}
          <section id="education" className="section">
            <div className="container">
              <EditorialHeading eyebrow={t.education.eyebrow} title={t.education.title} />
              <div className="education-grid">
                <div className="education-timeline">
                  {t.education.items.map((item, i) => (
                    <EditorialReveal className="education-entry" key={item.institution} delay={0.12 * i}>
                      <div className="education-icon"><GraduationCap size={23} /></div>
                      <div>
                        <span className="education-date">{item.date}</span>
                        <h3>{item.institution}</h3>
                        <h4>{item.qualification}</h4>
                        <span className="education-specialization">{item.specialization}</span>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </EditorialReveal>
                  ))}
                </div>
                <EditorialReveal className="training-card" delay={0.3}>
                  <div className="training-top">
                    <span className="training-logo">1337<span>_</span></span>
                    <Terminal size={21} />
                  </div>
                  <span className="eyebrow">{language === 'en' ? 'BEYOND THE CLASSROOM' : 'AU-DELÀ DES COURS'}</span>
                  <h3>{t.education.training.title}</h3>
                  <p>{t.education.training.description}</p>
                  <div className="skill-badges">
                    {t.education.training.items.map(s => <span key={s}>{s}</span>)}
                  </div>
                  <div className="training-bottom">
                    <span className="status-dot" />
                    {language === 'en' ? 'Peer-to-peer learning' : 'Apprentissage entre pairs'}
                  </div>
                </EditorialReveal>
              </div>
            </div>
          </section>

          {/* Phase 5: Editorial Reveal for How I Work */}
          <section id="how-i-work" className="section work-section">
            <div className="container">
              <EditorialHeading eyebrow={t.work.eyebrow} title={t.work.title} />
              <div className="qualities-grid">
                {t.work.qualities.map((q, i) => {
                  const Icon = qualityIcons[i];
                  return (
                    <EditorialReveal className="quality" key={q.title} delay={0.08 * i}>
                      <Icon size={22} />
                      <h3>{q.title}</h3>
                      <p>{q.description}</p>
                    </EditorialReveal>
                  );
                })}
              </div>
              <EditorialReveal className="languages" delay={0.35}>
                <div>
                  <Network size={22} />
                  <span>
                    {language === 'en'
                      ? 'Good code connects systems.\nGood communication connects people.'
                      : 'Le code connecte les systèmes.\nLa communication rapproche les personnes.'}
                  </span>
                </div>
                <div>
                  {t.work.languages.map(l => (
                    <span key={l.name}>
                      <b>{l.name}</b>
                      <span>{l.level}</span>
                    </span>
                  ))}
                </div>
              </EditorialReveal>
            </div>
          </section>

          <ContactSection language={language} />
        </main>

        <footer aria-hidden={introActive} inert={introActive}>
          <div className="container">
            <div className="footer-main">
              <a className="logo" href="#home" aria-label="El Mostafa Belayd">EM<span>.</span></a>
              <div className="footer-identity">
                <strong>El Mostafa Belayd</strong>
                <span>{t.footer.role} <i>·</i> {language === 'fr' ? 'Fès, Maroc' : 'Fès, Morocco'}</span>
              </div>
              <nav aria-label={language === 'en' ? 'Footer navigation' : 'Navigation de pied de page'}>
                <a href="#about">{t.nav[1].label}</a>
                <a href="#projects">{t.nav.find(n => n.id === 'projects')?.label}</a>
                <a href="#contact">{t.nav.find(n => n.id === 'contact')?.label}</a>
              </nav>
            </div>
            <div className="footer-bottom">
              <span>© 2026 El Mostafa Belayd. {t.footer.rights}</span>
              <span>{t.footer.credit}<Code2 size={14} /></span>
            </div>
          </div>
        </footer>

        {showTop && !introActive && (
          <a className="back-top" href="#home" aria-label={t.ui.backTop}><ArrowUp size={19} /></a>
        )}
        {projectId && !introActive && (
          <Suspense fallback={null}>
            <ProjectDialog projectId={projectId} language={language} onClose={closeProject} />
          </Suspense>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
