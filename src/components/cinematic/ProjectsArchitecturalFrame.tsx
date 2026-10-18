import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { EASING, PALETTE } from './motionTokens';
import type { Language } from '../../data/content';

interface ProjectsArchitecturalFrameProps {
  language: Language;
}

export function ProjectsArchitecturalFrame({ language }: ProjectsArchitecturalFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const fr = language === 'fr';

  return (
    <div ref={ref} className="projects-architectural-frame" aria-hidden="true">
      <div className="frame-turn-wrapper">
        <svg
          className="frame-corner-svg"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 2 0 L 2 24 Q 2 38 16 38 L 40 38"
            stroke={PALETTE.camelCoat}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="frame-horizontal-track">
          {reduced ? (
            <div className="frame-static-horizontal" />
          ) : (
            <m.div
              className="frame-drawn-horizontal"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.85, ease: EASING.architectural }}
            />
          )}
          <span className="frame-caption-label">
            {fr ? '// CADRE ARCHITECTURAL · SÉLECTION' : '// ARCHITECTURAL FRAME · SELECTED EXHIBITS'}
          </span>
        </div>
      </div>
    </div>
  );
}
