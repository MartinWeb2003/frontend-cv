import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

function BentoCard({ children, className = '', glowColor = '165,28,48', onMouseMove, onMouseLeave }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x, y,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    const rotX = ((y / rect.height) - 0.5) * -8;
    const rotY = ((x / rect.width) - 0.5) * 8;
    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });

    onMouseMove?.(e);
  }, [onMouseMove]);

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    gsap.to(glow, { opacity: 0, duration: 0.4 });
    gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power3.out' });
    onMouseLeave?.();
  }, [onMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ '--glow-color': glowColor }}
    >
      <div ref={glowRef} className="bento-card__glow" />
      <div className="bento-card__content">{children}</div>
    </div>
  );
}

export default function MagicBento({ children, className = '' }) {
  return (
    <div className={`magic-bento ${className}`}>
      {children}
    </div>
  );
}

MagicBento.Card = BentoCard;
