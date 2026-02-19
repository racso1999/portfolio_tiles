import { useState, useRef, useEffect } from 'react';

interface SkillTagProps {
  name: string;
  index: number;
  total: number;
}

export function SkillTag({ name, index, total }: SkillTagProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (tagRef.current) {
      observer.observe(tagRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate orbital position
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 160;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      ref={tagRef}
      className="absolute left-1/2 top-1/2 pointer-events-auto"
      style={{
        transform: isVisible
          ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
          : `translate(-50%, -50%) scale(0)`,
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="px-4 py-2 bg-card border rounded-full cursor-pointer select-none whitespace-nowrap"
        style={{
          borderColor: isHovered ? 'hsl(var(--foreground))' : '#333',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHovered
            ? '0 0 20px hsl(var(--foreground) / 0.25), 0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          className="text-sm font-medium"
          style={{
            color: isHovered ? 'hsl(var(--foreground))' : '#fff',
            transition: 'color 0.3s ease',
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

export default SkillTag;
