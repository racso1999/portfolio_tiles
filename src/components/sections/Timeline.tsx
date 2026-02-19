import { useRef, useEffect, useState } from 'react';
import { ProjectCard } from '../cards/ProjectCard';
import { projects } from '../../data/projects';

interface TimelineProps {
  onOpenProject: (slug: string) => void;
}

export function Timeline({ onOpenProject }: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Projects
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Center line (visual guide) */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #333 10%, #333 90%, transparent 100%)',
          }}
        />

        {/* Mobile line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px md:hidden"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #333 10%, #333 90%, transparent 100%)',
          }}
        />

        {/* Project Cards */}
        <div className="relative space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`relative ${
                index % 2 === 0
                  ? 'md:pr-[calc(50%+2rem)]'
                  : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Timeline node */}
              <div
                className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center left-1/2 -translate-x-1/2"
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-primary bg-background"
                  style={{
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  }}
                />
              </div>

              {/* Mobile node */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden">
                <div
                  className="w-3 h-3 rounded-full border-2 border-primary bg-background"
                  style={{
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                  }}
                />
              </div>

              {/* Card */}
              <ProjectCard
                title={project.title}
                slug={project.slug}
                videoUrl={project.videoUrl}
                imageUrl={project.imageUrl}
                position={index % 2 === 0 ? 'left' : 'right'}
                index={index}
                onOpenProject={onOpenProject}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
