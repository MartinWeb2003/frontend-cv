import { useRef, useEffect, useState } from 'react';
import './LogoLoop.css';

export default function LogoLoop({
  items = [],
  speed = 80,
  gap = 48,
  logoHeight = 36,
  pauseOnHover = true,
  direction = 'left',
  fadeOut = true,
}) {
  const trackRef = useRef(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const rafRef = useRef(null);
  const lastTime = useRef(null);
  const [cloned, setCloned] = useState([...items, ...items]);

  useEffect(() => {
    setCloned([...items, ...items]);
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (time) => {
      if (!lastTime.current) lastTime.current = time;
      const delta = (time - lastTime.current) / 1000;
      lastTime.current = time;

      if (!paused.current) {
        offset.current += speed * delta;
        const halfW = track.scrollWidth / 2;
        if (offset.current >= halfW) offset.current -= halfW;
        track.style.transform = `translateX(-${offset.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, cloned]);

  return (
    <div
      className={`logo-loop ${fadeOut ? 'logo-loop--fade' : ''}`}
      onMouseEnter={() => { if (pauseOnHover) paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div ref={trackRef} className="logo-loop__track">
        {cloned.map((item, i) => (
          <div
            key={i}
            className="logo-loop__item"
            style={{ marginRight: gap, height: logoHeight, flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            {item.node
              ? <span style={{ fontSize: logoHeight, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  {item.node}
                  {item.label && <span style={{ fontSize: logoHeight * 0.45, fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text)' }}>{item.label}</span>}
                </span>
              : item.src && (
                <img src={item.src} alt={item.alt || ''} style={{ height: logoHeight, width: 'auto', objectFit: 'contain' }} />
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}
