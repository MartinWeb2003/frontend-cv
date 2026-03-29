import { useRef, useState } from 'react';
import './GlareHover.css';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function GlareHover({
  children,
  background = '#fff',
  borderRadius = '12px',
  borderColor = '#E0DACE',
  glareColor = '#A51C30',
  glareOpacity = 0.18,
  glareAngle = -45,
  glareSize = 220,
  transitionDuration = 600,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y, opacity: 1 });
  };
  const handleLeave = () => setPos(p => ({ ...p, opacity: 0 }));

  const glareStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius,
    pointerEvents: 'none',
    opacity: pos.opacity,
    transition: `opacity ${transitionDuration}ms ease`,
    background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${hexToRgba(glareColor, glareOpacity)}, transparent ${glareSize / 3}%)`,
    zIndex: 2,
  };

  return (
    <div
      ref={ref}
      className={`glare-hover ${className}`}
      style={{
        position: 'relative',
        background,
        borderRadius,
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div style={glareStyle} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
