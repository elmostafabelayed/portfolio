import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { EASING } from './motionTokens';
import type { Language } from '../../data/content';

interface CharacterMaskTitleProps {
  language: Language;
  active?: boolean;
  baseDelay?: number;
}

export function CharacterMaskTitle({
  language,
  active = true,
  baseDelay = 0.22,
}: CharacterMaskTitleProps) {
  const reduced = useReducedMotion();

  const lines = language === 'en'
    ? [
        { text: 'Full-Stack', isHighlight: false },
        { text: 'Web Developer.', isHighlight: true },
      ]
    : [
        { text: 'Développeur', isHighlight: false },
        { text: 'Full-Stack.', isHighlight: true },
      ];

  let cumulativeCharCount = 0;

  return (
    <h1 className="cinematic-hero-title" aria-label={language === 'en' ? 'Full-Stack Web Developer.' : 'Développeur Full-Stack.'}>
      {lines.map((line, lineIndex) => {
        const words = line.text.split(' ');
        const lineStartCharIndex = cumulativeCharCount;

        return (
          <span
            key={`${language}-line-${lineIndex}`}
            className={`mask-line ${line.isHighlight ? 'hero-title-highlight' : 'hero-title-default'}`}
          >
            {words.map((word, wordIndex) => {
              const wordChars = word.split('');
              const wordStartOffset = wordIndex * 0.12;

              return (
                <span key={`word-${wordIndex}`} className="mask-word">
                  {wordChars.map((char, charIndex) => {
                    const charDelay = reduced
                      ? 0
                      : baseDelay + (lineIndex * 0.28) + wordStartOffset + (charIndex * 0.024);
                    cumulativeCharCount++;

                    return (
                      <span key={`char-${charIndex}`} className="mask-char-clip">
                        <m.span
                          className="mask-char-inner"
                          initial={reduced ? false : { y: '115%', opacity: 0.15 }}
                          animate={active ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0.15 }}
                          transition={{
                            duration: 0.65,
                            ease: EASING.mask,
                            delay: charDelay,
                          }}
                        >
                          {char}
                        </m.span>
                      </span>
                    );
                  })}
                  {wordIndex < words.length - 1 && (
                    <span className="mask-space">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
