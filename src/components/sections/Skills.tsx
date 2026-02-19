import { useRef, useEffect, useState } from 'react';
import { SkillTag } from '../cards/SkillTag';

const skills = [
  'Python',
  'Java',
  'SQL / MySQL',
  'R',
  'Data Analysis',
  'Statistical Modelling',
  'Machine Learning',
  'Quantitative Reasoning',
  'Git Version Control',
  'Data Visualisation',
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Section Header */}
      <div
        className="text-center mb-8 md:mb-12 px-4 relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 30}px)`,
          transition: 'all 0.8s ease',
        }}
      >
        <span className="inline-block px-4 py-2 mb-6 text-xs font-medium tracking-widest text-primary uppercase border border-primary/30 rounded-full">
          Expertise
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          THE TOOLKIT
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Technologies and tools in my development workflow.
        </p>
      </div>

      {/* Skills Visualization */}
      <div className="relative w-full flex items-center justify-center" style={{ minHeight: '600px' }}>
        {/* Central element container */}
        <div className="relative w-[500px] h-[500px] md:w-[650px] md:h-[650px] flex items-center justify-center">
          {/* Rings */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `scale(${isVisible ? 1 : 0.5})`,
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                animation: 'pulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '180px',
                height: '180px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                animation: 'pulse 3s ease-in-out infinite 0.5s',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '240px',
                height: '240px',
                border: '2px solid rgba(255, 255, 255, 0.05)',
                animation: 'pulse 3s ease-in-out infinite 1s',
              }}
            />

            {/* Central core */}
            <div
              className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #333 0%, #222 100%)',
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-white font-bold text-lg md:text-2xl">&lt;/&gt;</span>
            </div>
          </div>
        </div>

        {/* Orbiting skill tags */}
        <div className="absolute inset-0 flex items-center justify-center">
          {skills.map((skill, index) => (
            <SkillTag
              key={skill}
              name={skill}
              index={index}
              total={skills.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
