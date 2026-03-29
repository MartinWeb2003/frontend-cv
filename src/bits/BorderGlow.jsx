import { useRef, useCallback } from 'react';
import './BorderGlow.css';

export default function BorderGlow({
  children,
  className = '',
  glowColor = '165 28 48',
  backgroundColor = '#FFFFFF',
  borderRadius = 16,
  glowIntensity = 0.8,
  animated = false,
  style = {},
}) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
    const edgeDist = Math.min(x, y, rect.width - x, rect.height - y);
    const edgeProximity = Math.max(0, 1 - edgeDist / 60);
    el.style.setProperty('--cursor-angle', `${angle}deg`);
    el.style.setProperty('--edge-proximity', edgeProximity);
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--edge-proximity', 0);
  }, []);

  return (
    <div
      ref={ref}
      className={`border-glow ${animated ? 'border-glow--animated' : ''} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        '--glow-r': glowColor.split(' ')[0],
        '--glow-g': glowColor.split(' ')[1],
        '--glow-b': glowColor.split(' ')[2],
        '--bg-color': backgroundColor,
        '--radius': `${borderRadius}px`,
        '--intensity': glowIntensity,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
