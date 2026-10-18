import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { PALETTE } from './motionTokens';
import type { Language } from '../../data/content';

interface SignatureArchitecturalLineProps {
  language: Language;
}

export function SignatureArchitecturalLine({ language }: SignatureArchitecturalLineProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 20%'],
  });

  // Vertical line extension along About and Skills
  const lineScaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // Storyline Chapter opacity triggers
  const chapter1Opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.45], [0, 1, 0.85]);
  const chapter2Opacity = useTransform(scrollYProgress, [0.45, 0.65, 0.9], [0, 1, 0.85]);

  const fr = language === 'fr';

  if (!isMounted) return null;

  return (
    <div
      ref={trackRef}
      className="signature-spine-track"
      aria-hidden="true"
    >
      <div className="signature-spine-column">
        {/* Subtle architectural datum marker below the Hero */}
        <div className="signature-origin-datum">
          <span className="crosshair-mark">+</span>
          <span className="datum-coord">34.03°N · 5.00°W</span>
          <div className="datum-mini-rule" />
        </div>

        {/* Vertical SVG drafting stem */}
        <div className="signature-spine-stem">
          {reduced ? (
            <div className="signature-static-stem" />
          ) : (
            <m.div
              className="signature-drawn-stem"
              style={{ scaleY: lineScaleY, transformOrigin: 'top center' } as any}
            />
          )}

          {/* Narrative Storyline Markers: Identity & Engineering */}
          <m.div
            className="storyline-marker marker-identity"
            style={reduced ? undefined : ({ opacity: chapter1Opacity } as any)}
          >
            <span className="marker-dot" />
            <div className="marker-body">
              <span className="marker-index">01</span>
              <span className="marker-title">{fr ? 'IDENTITÉ' : 'IDENTITY'}</span>
            </div>
          </m.div>

          <m.div
            className="storyline-marker marker-engineering"
            style={reduced ? undefined : ({ opacity: chapter2Opacity } as any)}
          >
            <span className="marker-dot marker-active" />
            <div className="marker-body">
              <span className="marker-index">02</span>
              <span className="marker-title">{fr ? 'INGÉNIERIE & CODE' : 'ENGINEERING'}</span>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
