import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Layers } from 'lucide-react';
import { DeferredProjectVisual } from '../DeferredProjectVisual';
import { useProjectHover } from './useProjectHover';
import { EASING, PALETTE } from './motionTokens';
import type { PortfolioProject, Language } from '../../data/content';

interface ProjectJobsyExhibitProps {
  project: PortfolioProject;
  language: Language;
  viewCaseLabel: string;
  onOpen: (id: string) => void;
}

export function ProjectJobsyExhibit({
  project,
  language,
  viewCaseLabel,
  onOpen,
}: ProjectJobsyExhibitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.18 });
  const reduced = useReducedMotion();
  const {
    cardRef,
    isHovered,
    offset,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  } = useProjectHover(8);

  const fr = language === 'fr';

  return (
    <article
      ref={containerRef}
      className={`project-card featured-project cinematic-exhibit exhibit-jobsy ${isHovered ? 'is-card-hovered' : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* 1. Subtle horizontal architectural line */}
      <div className="exhibit-draft-line-wrap">
        <m.div
          className="exhibit-draft-line"
          initial={reduced ? false : { scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.75, ease: EASING.editorial }}
        />
        <div className="exhibit-meta-tag">
          <span className="exhibit-badge">{fr ? 'EXPOSITION 01 // ARCHITECTURE' : 'EXHIBIT 01 // ARCHITECTURE'}</span>
        </div>
      </div>

      {/* 3. Rectangular exhibit frame */}
      <div className="project-visual-wrap visual-jobsy exhibit-frame-outer" ref={cardRef}>
        {/* Gallery frame corner crosshairs */}
        <span className="frame-corner top-left" aria-hidden="true">+</span>
        <span className="frame-corner top-right" aria-hidden="true">+</span>
        <span className="frame-corner bottom-left" aria-hidden="true">+</span>
        <span className="frame-corner bottom-right" aria-hidden="true">+</span>

        {/* 4. Project illustration with carefully timed mask reveal */}
        <m.div
          className="exhibit-visual-container"
          initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
          animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
          transition={{ duration: 0.85, ease: EASING.mask, delay: reduced ? 0 : 0.35 }}
          style={{
            transform: reduced ? undefined : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <DeferredProjectVisual kind="jobsy" language={language} />
        </m.div>

        <span className="illustration-label">
          {fr ? 'EXHIBIT 01 — INTERFACE DU WORKSPACE' : 'EXHIBIT 01 — WORKSPACE INTERFACE'}
        </span>
      </div>

      <div className="project-content exhibit-content">
        <div className="project-category">
          {/* 2. Project number 01 fades into view */}
          <m.span
            className="exhibit-number"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.22 }}
          >
            {project.number} / {project.category}
          </m.span>
          <span className="project-symbol"><Layers size={18} /></span>
        </div>

        {/* 5. JOBSY title emerges through vertical typographic mask reveal */}
        <div className="exhibit-title-mask">
          <m.h3
            className="exhibit-title"
            initial={reduced ? false : { y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.65, ease: EASING.mask, delay: reduced ? 0 : 0.45 }}
          >
            {project.title}
          </m.h3>
        </div>

        {/* 6. Subtitle, description, tags, button follow with staggered motion */}
        <m.p
          className="project-subtitle"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.55 }}
        >
          {project.subtitle}
        </m.p>

        <m.p
          className="project-description"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.65 }}
        >
          {project.description}
        </m.p>

        <m.div
          className="tech-tags"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.75 }}
        >
          {project.stack.slice(0, 5).map(s => (
            <span key={s} className="tech-tag-pill">{s}</span>
          ))}
        </m.div>

        <m.div
          className="exhibit-action-wrap"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: EASING.editorial, delay: reduced ? 0 : 0.85 }}
        >
          <button
            className="case-study-link exhibit-btn"
            onClick={() => onOpen(project.id)}
            aria-label={`${viewCaseLabel} — ${project.title}`}
          >
            {viewCaseLabel}
            <span className="arrow-wrap"><ArrowUpRight size={20} /></span>
          </button>
        </m.div>
      </div>
    </article>
  );
}
