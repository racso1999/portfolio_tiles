import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  slug: string;
  videoUrl?: string;
  imageUrl?: string;
  position: 'left' | 'right';
  index: number;
  onOpenProject: (slug: string) => void;
}

export function ProjectCard({
  title,
  slug,
  videoUrl,
  imageUrl,
  position,
  index,
  onOpenProject,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!videoUrl || !video) return;

    if (isHovered) {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => undefined);
    } else {
      video.pause();
      if (video.readyState >= 2) {
        video.currentTime = 0;
      }
    }
  }, [isHovered, videoUrl]);


  const isLeft = position === 'left';

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center ${
        isLeft ? 'justify-end pr-8 md:pr-16' : 'justify-start pl-8 md:pl-16'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0) translateY(0)'
          : `translateX(${isLeft ? '-50px' : '50px'}) translateY(30px)`,
        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connector line to rope */}
      <div
        className={`absolute top-1/2 ${
          isLeft ? 'right-0' : 'left-0'
        } w-8 md:w-16 h-px`}
        style={{
          background: isHovered
            ? 'linear-gradient(90deg, transparent 0%, #4a7c59 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, #333 50%, transparent 100%)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Hook/connector dot */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          isLeft ? 'right-6 md:right-14' : 'left-6 md:left-14'
        } w-3 h-3 rounded-full border-2 transition-all duration-300`}
        style={{
          borderColor: isHovered ? '#4a7c59' : '#444',
          backgroundColor: isHovered ? 'rgba(74, 124, 89, 0.3)' : 'transparent',
          boxShadow: isHovered ? '0 0 10px rgba(74, 124, 89, 0.5)' : 'none',
        }}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-md bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer ${
          isLeft ? 'mr-4' : 'ml-4'
        }`}
        style={{
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
        }}
        onClick={() => {
          onOpenProject(slug);
        }}
      >
        {/* Image */}
        {(videoUrl || imageUrl) && (
          <div className="relative h-48 overflow-hidden">
            {videoUrl ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover transition-all duration-500"
                playsInline
                preload="auto"
                onLoadedData={(event) => {
                  const video = event.currentTarget;
                  video.pause();
                  video.currentTime = 0;
                }}
                style={{
                  filter: isHovered ? 'saturate(1)' : 'saturate(0.3)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <source src={videoUrl} />
              </video>
            ) : (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: isHovered ? 'saturate(1)' : 'saturate(0.3)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                pointerEvents: isHovered ? 'auto' : 'none',
              }}
            >
              <p className="text-white text-lg font-semibold">Click to learn more</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        </div>

        {/* Glow border effect */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? 'inset 0 0 0 2px rgba(74, 124, 89, 0.8), 0 0 40px rgba(74, 124, 89, 0.4)'
              : 'inset 0 0 0 1px rgba(74, 124, 89, 0.2), 0 0 0px rgba(74, 124, 89, 0)',
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
