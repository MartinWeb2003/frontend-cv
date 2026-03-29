import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

// Variant 8: 3D perspective — rotationX/Y based on cursor position
export default function ImageTrail({ items = [], children }) {
  const containerRef = useRef(null);
  const imgsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const currentIndexRef = useRef(0);
  const isIdle = useRef(true);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;

    const imgs = imgsRef.current.filter(Boolean);

    const getImg = () => {
      const idx = currentIndexRef.current % imgs.length;
      currentIndexRef.current++;
      return imgs[idx];
    };

    const showNextImage = (x, y) => {
      const img = getImg();
      if (!img) return;

      const rect = container.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;
      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;

      const rotX = (relY / rect.height - 0.5) * -30;
      const rotY = (relX / rect.width - 0.5) * 30;

      gsap.killTweensOf(img);

      gsap.set(img, {
        left: relX,
        top: relY,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.6,
        rotationX: rotX * 1.5,
        rotationY: rotY * 1.5,
        rotationZ: Math.atan2(dy, dx) * (180 / Math.PI) * 0.3,
        transformPerspective: 800,
      });

      gsap.timeline()
        .to(img, {
          opacity: 1,
          scale: 1,
          rotationX: rotX,
          rotationY: rotY,
          duration: 0.35,
          ease: 'power3.out',
        })
        .to(img, {
          opacity: 0,
          scale: 0.85,
          rotationX: rotX * 0.5,
          rotationY: rotY * 0.5,
          duration: 0.5,
          ease: 'power2.in',
        }, '+=0.2');
    };

    let lastShow = 0;
    const throttleMs = 120;

    const onMove = (e) => {
      const now = Date.now();
      if (now - lastShow < throttleMs) return;
      lastShow = now;
      showNextImage(e.clientX, e.clientY);
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      isIdle.current = false;
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => { isIdle.current = true; }, 300);
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      container.removeEventListener('mousemove', onMove);
      clearTimeout(idleTimerRef.current);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="image-trail">
      {items.map((src, i) => (
        <div
          key={i}
          ref={(el) => { imgsRef.current[i] = el; }}
          className="image-trail__img"
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="image-trail__content">{children}</div>
    </div>
  );
}
