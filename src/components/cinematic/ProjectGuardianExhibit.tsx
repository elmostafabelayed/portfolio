import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { DeferredProjectVisual } from '../DeferredProjectVisual';
import { useProjectHover } from './useProjectHover';
import { EASING } from './motionTokens';
import type { PortfolioProject, Language } from '../../data/content';

interface ProjectGuardianExhibitProps {
  project: PortfolioProject;
  language: Language;
  viewCaseLabel: string;
  onOpen: (id: string) => void;
}

export function ProjectGuardianExhibit({
  project,
  language,
  viewCaseLabel,
  onOpen,
}: ProjectGuardianExhibitProps) {
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
      className={`project-card cinematic-exhibit exhibit-guardian ${isHovered ? 'is-card-hovered' : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Visual enters from opposite direction (right-to-left editorial transition) */}
      <div className="project-visual-wrap visual-guardian exhibit-frame-outer" ref={cardRef}>
        <span className="frame-corner top-left" aria-hidden="true">+</span>
        <span className="frame-corner top-right" aria-hidden="true">+</span>
        <span className="frame-corner bottom-left" aria-hidden="true">+</span>
        <span className="frame-corner bottom-right" aria-hidden="true">+</span>

        <m.div
          className="exhibit-visual-container visual-opposite-direction"
          initial={reduced ? false : { x: 36, opacity: 0.2 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 36, opacity: 0.2 }}
          transition={{ duration: 0.85, ease: EASING.editorial, delay: reduced ? 0 : 0.28 }}
          style={{
            transform: reduced ? undefined : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <DeferredProjectVisual kind="guardian" language={language} />
        </m.div>

        <span className="illustration-label">
          {fr ? 'ARCHITECTURE TÉLÉMÉTRIQUE SIMULÉE' : 'SIMULATED TELEMETRY ARCHITECTURE'}
        </span>
      </div>

      <div className="project-content exhibit-content">
        <div className="project-category">
          <m.span
            className="exhibit-number"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.2 }}
          >
            {project.number} / {project.category}
          </m.span>
          <span className="project-symbol"><Cpu size={18} /></span>
        </div>

        <div className="exhibit-title-mask">
          <m.h3
            className="exhibit-title"
            initial={reduced ? false : { y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.65, ease: EASING.mask, delay: reduced ? 0 : 0.38 }}
          >
            {project.title}
          </m.h3>
        </div>

        <m.p
          className="project-subtitle"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.48 }}
        >
          {project.subtitle}
        </m.p>

        <m.p
          className="project-description"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.58 }}
        >
          {project.description}
        </m.p>

        {/* Sequential Architecture Nodes Highlight */}
        <m.div
          className="guardian-arch-sequence"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.65 }}
        >
          <span className="arch-flow-node">{fr ? 'Capteur Débit' : 'Flow Sensor'}</span>
          <span className="arch-flow-arrow">→</span>
          <span className="arch-flow-node">ESP32</span>
          <span className="arch-flow-arrow">→</span>
          <span className="arch-flow-node">Laravel API</span>
          <span className="arch-flow-arrow">→</span>
          <span className="arch-flow-node">MySQL</span>
        </m.div>

        <m.div
          className="tech-tags"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.75 }}
        >
          {project.stack.slice(0, 4).map(s => (
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
