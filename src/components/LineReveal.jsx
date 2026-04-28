import { useEffect, useState } from 'react';

function LineReveal({ direction = 'horizontal', className = '', delay = 300 }) {
  const [isActive, setIsActive] = useState(false);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsActive(true);
    });
    const outTimer = setTimeout(() => {
      setIsOut(true);
    }, delay + 1500);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(outTimer);
    };
  }, [delay]);

  return (
    <span
      className={`line_reveal line_reveal_${direction} ${isActive ? 'is_active' : ''} ${isOut ? 'out' : ''} ${className}`.trim()}
      style={{ '--line-delay': `${delay}ms` }}
      aria-hidden='true'
    ></span>
  );
}

export default LineReveal;
