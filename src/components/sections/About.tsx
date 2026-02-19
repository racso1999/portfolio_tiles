import { useRef, useEffect, useState } from 'react';
import { MapPin, Mail, Briefcase } from 'lucide-react';
import profileImage from '../../assets/profile.png';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Image/Visual Side */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? 0 : -50}px)`,
              transition: 'all 0.8s ease',
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background shapes */}
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  transform: 'rotate(-3deg)',
                }}
              />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>UK</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>Systems Engineering & AI</span>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Content Side */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Building systems
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #888 0%, #888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                driven by data
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Computer Science and Biology graduate with a passion for solving complex problems
                through data-driven development. I specialize in building systems that combine
                statistical analysis, machine learning, and robust software engineering.
              </p>
              <p>
                My expertise spans Python, SQL, R, and bioinformatics tooling. I'm driven by the
                intersection of data science and practical application—from autonomous systems to
                database architecture and quantitative analysis.
              </p>
              <p>
                I'm constantly learning new technologies and approaches to solve interesting problems
                at the intersection of biology and computer science.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">4</div>
                <div className="text-sm text-muted-foreground">Key Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">MSc</div>
                <div className="text-sm text-muted-foreground">Education</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="mailto:jones.oscar.work@outlook.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
