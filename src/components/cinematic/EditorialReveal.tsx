import { useRef, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { EASING } from './motionTokens';

interface EditorialRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
}: EditorialRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.6,
        ease: EASING.editorial,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
}

interface EditorialHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  showLine?: boolean;
}

export function EditorialHeading({
  eyebrow,
  title,
  description,
  showLine = true,
}: EditorialHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="editorial-section-heading">
      {showLine && (
        <div className="editorial-hairline-wrap" aria-hidden="true">
          <m.div
            className="editorial-hairline"
            initial={reduced ? false : { scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, ease: EASING.architectural }}
          />
          <span className="editorial-hairline-cross">+</span >
        </div>
      )}

      <m.span
        className="eyebrow editorial-eyebrow"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease: EASING.editorial, delay: reduced ? 0 : 0.1 }}
      >
        {eyebrow}
      </m.span>

      <div className="editorial-title-mask">
        <m.h2
          initial={reduced ? false : { y: '105%' }}
          animate={isInView ? { y: '0%' } : { y: '105%' }}
          transition={{ duration: 0.65, ease: EASING.mask, delay: reduced ? 0 : 0.18 }}
        >
          {title}
        </m.h2>
      </div>

      {description && (
        <m.p
          className="section-description"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASING.editorial, delay: reduced ? 0 : 0.28 }}
        >
          {description}
        </m.p>
      )}
    </div>
  );
}
