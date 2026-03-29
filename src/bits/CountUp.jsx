import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  separator = '',
  suffix = '',
  prefix = '',
  className = '',
  startWhen = true,
  onEnd,
}) {
  const [value, setValue] = useState(from);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || !startWhen || started.current) return;
    started.current = true;

    let startTime = null;
    let raf;

    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / (duration * 1000), 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = from + (to - from) * ease;
        setValue(Math.round(current));
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setValue(to);
          onEnd?.();
        }
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, startWhen, from, to, duration, delay, onEnd]);

  const formatted = separator
    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : value.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
