import { useEffect, useState, useRef, useCallback } from 'react';
import { Timeline } from './components/sections/Timeline';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { ProjectDetail } from './components/pages/ProjectDetail';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath.startsWith('/projects/')) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [currentPath]);

  const navigateTo = useCallback((path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  }, []);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const scrollToTarget = () => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };

      if (currentPath !== '/') {
        navigateTo('/');
        window.setTimeout(scrollToTarget, 80);
      } else {
        scrollToTarget();
      }
    }
  }, [currentPath, navigateTo]);

  const isProjectPage = currentPath.startsWith('/projects/');
  const projectSlug = isProjectPage
    ? currentPath.replace('/projects/', '').split('/')[0]
    : '';

  return (
    <div className="relative min-h-screen bg-background grain">
      {/* Loading Screen */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700"
        style={{
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? 'none' : 'auto',
        }}
      >
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
            <div
              className="absolute inset-0 border-2 border-primary rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
          background: 'rgba(5, 5, 5, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (currentPath !== '/') {
                  navigateTo('/');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              OSCAR JONES
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#work"
                onClick={handleAnchorClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#about"
                onClick={handleAnchorClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={mainRef} className="relative z-20">
        {isProjectPage ? (
          <ProjectDetail
            slug={projectSlug}
            onNavigate={(path) => {
              navigateTo(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            <section id="about">
              <About />
            </section>

            <section id="work">
              <Timeline
                onOpenProject={(slug) => {
                  navigateTo(`/projects/${slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </>
        )}
      </main>

      {/* Custom Cursor (desktop only) */}
      <CustomCursor isLoaded={isLoaded} />
    </div>
  );
}

// Custom Cursor Component
function CustomCursor({ isLoaded }: { isLoaded: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('card-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('card-hover')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          borderColor: isHovering ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)',
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 0.2s ease, width 0.2s ease, height 0.2s ease',
          width: isHovering ? '50px' : '40px',
          height: isHovering ? '50px' : '40px',
          opacity: isLoaded ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </>
  );
}

export default App;
