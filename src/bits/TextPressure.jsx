import { useEffect, useRef, useState, useCallback } from 'react';

const dist = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

export default function TextPressure({
  text = 'HELLO',
  fontFamily = 'Inter',
  width = true,
  weight = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#0A0A0A',
  strokeColor = '#A51C30',
  className = '',
  minFontSize = 36,
}) {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(text.split(''));
  }, [text]);

  const calcFontSize = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const fsize = flex ? Math.max(minFontSize, w / (chars.length * 0.55)) : minFontSize;
    setFontSize(Math.min(fsize, 200));
  }, [chars.length, flex, minFontSize]);

  useEffect(() => {
    calcFontSize();
    const ro = new ResizeObserver(calcFontSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [calcFontSize]);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!spansRef.current.length) { rafRef.current = requestAnimationFrame(animate); return; }
      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const d = dist(mouse.current, charCenter);
        const maxDist = 300;

        if (weight) {
          const fw = Math.round(getAttr(d, maxDist, 100, 800));
          span.style.fontWeight = fw;
        }
        if (width) {
          const fs = getAttr(d, maxDist, 0.85, 1.15);
          span.style.transform = `scaleX(${fs})`;
        }
        if (alpha) {
          const a = getAttr(d, maxDist, 0.3, 1);
          span.style.opacity = a;
        }
        if (scale) {
          const s = getAttr(d, maxDist, 0.9, 1.2);
          span.style.transform = `scale(${s})`;
        }
        if (stroke) {
          const sw = getAttr(d, maxDist, 0, 3);
          span.style.webkitTextStrokeWidth = `${sw}px`;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [weight, width, alpha, scale, stroke]);

  return (
    <div
      ref={containerRef}
      className={`text-pressure ${className}`}
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <style>{`
        .text-pressure-char {
          display: inline-block;
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
          color: ${textColor};
          line-height: 1;
          text-transform: uppercase;
          ${stroke ? `webkit-text-stroke: 1px ${strokeColor};` : ''}
          will-change: transform, font-weight, opacity;
          transition: font-weight 0.05s linear;
        }
      `}</style>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { spansRef.current[i] = el; }}
          className="text-pressure-char"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
