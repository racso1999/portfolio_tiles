import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

export function Contact() {
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
      className="relative py-12 md:py-16 min-h-screen flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'all 0.8s ease',
          }}
        >
          <div className="rounded-2xl border border-border bg-card/60 p-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Contact
            </h2>
            <a
              href="mailto:jones.oscar.work@outlook.com"
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              jones.oscar.work@outlook.com
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div
          className="mt-16 pt-8 border-t border-border"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © 2026 Oscar Jones. Built with React.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/racso1999"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/oscar-jones-91b349294"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
