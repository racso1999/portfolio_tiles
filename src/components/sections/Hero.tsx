import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Content */}
      <div
        className="relative z-10 text-center px-4"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: `translateY(${isLoaded ? 0 : 30}px)`,
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Pre-title */}
        <div
          className="mb-6"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? 0 : 20}px)`,
            transition: 'all 0.6s ease 0.2s',
          }}
        >
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-widest text-muted-foreground uppercase border border-border rounded-full">
            Creative Developer
          </span>
        </div>

        {/* Main Title */}
        <h1 className="mb-6">
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px)`,
              transition: 'all 0.8s ease 0.3s',
            }}
          >
            OSCAR
          </span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px)`,
              transition: 'all 0.8s ease 0.4s',
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            JONES
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? 0 : 20}px)`,
            transition: 'all 0.6s ease 0.5s',
          }}
        >
          MSc Computer Science | BSc Biology
        </p>

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            opacity: isLoaded ? 0.7 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

export default Hero;
