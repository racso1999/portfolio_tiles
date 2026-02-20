import { useRef, useEffect } from 'react';
import { ProjectCard } from '../cards/ProjectCard';
import { projects } from '../../data/projects';

interface TimelineProps {
  onOpenProject: (slug: string) => void;
}

export function Timeline({ onOpenProject }: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Intersection observer for future animations
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

      {/* Project Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              slug={project.slug}
              videoUrl={project.videoUrl}
              imageUrl={project.imageUrl}
              layout="grid"
              index={index}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
