import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function CircularText({
  text = 'SCROLL DOWN • EXPLORE • ',
  spinDuration = 20,
  onHover = 'speedUp',
  radius = 60,
  fontSize = 11,
  color = '#A51C30',
  className = '',
}) {
  const controls = useAnimation();
  const [duration, setDuration] = useState(spinDuration);
  const chars = text.split('');
  const angleStep = 360 / chars.length;

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
    });
  }, [duration, controls]);

  const handleEnter = () => {
    if (onHover === 'speedUp') setDuration(spinDuration / 4);
    else if (onHover === 'slowDown') setDuration(spinDuration * 3);
    else if (onHover === 'pause') setDuration(9999);
    else if (onHover === 'goBonkers') setDuration(spinDuration / 20);
  };
  const handleLeave = () => setDuration(spinDuration);

  const size = radius * 2 + 24;

  return (
    <motion.div
      className={className}
      animate={controls}
      style={{ width: size, height: size, position: 'relative', cursor: 'pointer' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {chars.map((char, i) => {
        const angle = angleStep * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = radius + Math.cos(rad) * radius;
        const y = radius + Math.sin(rad) * radius;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontSize,
              color,
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.05em',
              transform: `rotate(${angle + 90}deg)`,
              transformOrigin: '0 0',
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}
