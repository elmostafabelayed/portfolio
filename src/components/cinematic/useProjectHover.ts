import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface HoverOffset {
  x: number;
  y: number;
}

export function useProjectHover(maxOffset: number = 8) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState<HoverOffset>({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check if device supports fine hover (desktop mouse/trackpad)
    if (typeof window !== 'undefined') {
      const match = window.matchMedia('(hover: hover) and (pointer: fine)');
      isTouchDevice.current = !match.matches;
      const listener = (e: MediaQueryListEvent) => {
        isTouchDevice.current = !e.matches;
      };
      match.addEventListener('change', listener);
      return () => match.removeEventListener('change', listener);
    }
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (reduced || isTouchDevice.current) return;
    setIsHovered(true);
  }, [reduced]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (reduced || isTouchDevice.current || e.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    // Clamp between -maxOffset and +maxOffset (6-10px)
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, normX * maxOffset));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, normY * maxOffset));

    setOffset({
      x: Math.round(clampedX * 10) / 10,
      y: Math.round(clampedY * 10) / 10,
    });
  }, [reduced, maxOffset]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  return {
    cardRef,
    isHovered,
    offset,
    onPointerEnter: handlePointerEnter,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };
}
