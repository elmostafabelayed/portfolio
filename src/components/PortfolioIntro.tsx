import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowRight } from 'lucide-react';
import { content, type Language } from '../data/content';
import '../styles/portfolio-intro.css';

interface PortfolioIntroProps {
  language: Language;
  onComplete: () => void;
}

export function PortfolioIntro({ language, onComplete }: PortfolioIntroProps) {
  const reducedMotion = useReducedMotion();
  const t = content[language];
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [contentFade, setContentFade] = useState(false);
  const [active, setActive] = useState(true);
  const skipButton = useRef<HTMLButtonElement>(null);
  const skipping = useRef(false);
  const timersRef = useRef<number[]>([]);

  // Smooth custom easing
  const easeLuxury = [0.76, 0, 0.24, 1] as const;
  const easeOutEditorial = [0.22, 1, 0.36, 1] as const;

  const markCompleted = () => {
    try {
      sessionStorage.setItem('em-intro-seen', 'true');
    } catch {
      // Safe fallback if sessionStorage is blocked
    }
  };

  const handleSkip = () => {
    if (skipping.current) return;
    skipping.current = true;
    // Clear scheduled phase timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    markCompleted();
    setContentFade(true);
    setCurtainOpen(true);
    const endTimer = window.setTimeout(() => {
      setActive(false);
      onComplete();
    }, 280);
    timersRef.current.push(endTimer);
  };

  useEffect(() => {
    // If reduced motion is requested, immediately skip
    if (reducedMotion) {
      markCompleted();
      setActive(false);
      onComplete();
      return;
    }

    skipButton.current?.focus({ preventScroll: true });

    // Phase 4 -> Phase 5: Fade center monogram content and open editorial curtain panels
    const fadeTimer = window.setTimeout(() => {
      setContentFade(true);
    }, 1580);

    const curtainTimer = window.setTimeout(() => {
      setCurtainOpen(true);
    }, 1660);

    // Final unmount and handoff
    const completeTimer = window.setTimeout(() => {
      markCompleted();
      setActive(false);
      onComplete();
    }, 2280);

    timersRef.current.push(fadeTimer, curtainTimer, completeTimer);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [reducedMotion, onComplete]);

  if (!active) return null;

  return (
    <div
      className="portfolio-intro-root"
      role="dialog"
      aria-label={language === 'fr' ? 'Introduction du portfolio' : 'Portfolio Introduction'}
      onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); skipButton.current?.focus(); } }}
      aria-modal="true"
    >
      {/* Upper Editorial Curtain Panel */}
      <m.div
        className="intro-curtain intro-curtain-top"
        initial={{ y: '0%' }}
        animate={{ y: curtainOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.65, ease: easeLuxury }}
      />

      {/* Lower Editorial Curtain Panel */}
      <m.div
        className="intro-curtain intro-curtain-bottom"
        initial={{ y: '0%' }}
        animate={{ y: curtainOpen ? '100%' : '0%' }}
        transition={{ duration: 0.65, ease: easeLuxury }}
      />

      {/* Micro-film texture */}
      <div className="intro-noise-overlay" aria-hidden="true" />

      {/* Skip Intro button */}
      <m.button
        ref={skipButton}
        type="button"
        className="intro-skip-btn"
        onClick={handleSkip}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: contentFade ? 0 : 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        aria-label={t.intro.skip}
      >
        <span>{t.intro.skip}</span>
        <ArrowRight size={13} className="intro-skip-arrow" />
      </m.button>

      {/* Phase 04: Signature Horizon Dividing Line */}
      <m.div
        className="intro-signature-line"
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: curtainOpen ? 1.05 : [0, 0.45, 1],
          opacity: curtainOpen ? 0 : [0, 0.9, 0.8],
        }}
        transition={{
          delay: 1.05,
          duration: curtainOpen ? 0.4 : 0.55,
          ease: easeLuxury,
        }}
      />

      {/* Centerpiece Content */}
      <m.div
        className="intro-center-content"
        animate={{
          opacity: contentFade ? 0 : 1,
          scale: contentFade ? 0.96 : 1,
        }}
        transition={{ duration: 0.35, ease: easeOutEditorial }}
      >
        {/* Phase 01: Initial First Detail Line */}
        <m.div
          className="intro-arrival-line"
          style={{ y: '-50%' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 1, 0.9, 0],
          }}
          transition={{
            times: [0, 0.45, 0.7, 1],
            duration: 0.6,
            ease: easeLuxury,
          }}
        />

        {/* Phase 02: Architectural Monogram EM. */}
        <div className="intro-monogram-wrap">
          <svg
            className="intro-monogram-svg"
            viewBox="0 0 155 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Letter E - Vertical Stem */}
            <m.path
              d="M 17 12 L 17 58"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.36, ease: easeLuxury }}
            />
            {/* Letter E - Top Arm */}
            <m.path
              d="M 17 13 L 53 13"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.26, ease: easeLuxury }}
            />
            {/* Letter E - Middle Arm */}
            <m.path
              d="M 17 35 L 41 35"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.48, duration: 0.24, ease: easeLuxury }}
            />
            {/* Letter E - Bottom Arm */}
            <m.path
              d="M 17 57 L 53 57"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.54, duration: 0.26, ease: easeLuxury }}
            />

            {/* Letter M - Left Pillar */}
            <m.path
              d="M 69 58 L 69 12"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.32, ease: easeLuxury }}
            />
            {/* Letter M - Central Chevron */}
            <m.path
              d="M 69 12 L 94 45 L 119 12"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.34, ease: easeLuxury }}
            />
            {/* Letter M - Right Pillar */}
            <m.path
              d="M 119 12 L 119 58"
              className="intro-monogram-path"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.68, duration: 0.28, ease: easeLuxury }}
            />

            {/* Signature Dot (Rubine #8D3A3C) */}
            <m.circle
              cx="135"
              cy="54"
              r="4.5"
              className="intro-monogram-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.76,
                duration: 0.26,
                ease: easeOutEditorial,
              }}
            />
          </svg>
        </div>

        {/* Phase 03: Identity Typography with Mask Reveal */}
        <div className="intro-typography-wrap">
          <div className="intro-text-mask">
            <m.h2
              className="intro-name"
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.76, duration: 0.46, ease: easeOutEditorial }}
            >
              {t.intro.name}
            </m.h2>
          </div>

          <div className="intro-text-mask intro-role-mask">
            <m.p
              className="intro-role"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.92, duration: 0.42, ease: easeOutEditorial }}
            >
              {t.intro.role}
            </m.p>
          </div>
        </div>
      </m.div>

      {/* Editorial Identifier */}
      <m.div
        className="intro-corner-brand"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentFade ? 0 : 0.6 }}
        transition={{ delay: 0.88, duration: 0.4 }}
      >
        <span />
        <span>PORTFOLIO / 2026</span>
      </m.div>
    </div>
  );
}
