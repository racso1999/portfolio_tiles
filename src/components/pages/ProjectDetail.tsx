import { projects } from '../../data/projects';

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ProjectDetail({ slug, onNavigate }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="min-h-[70vh] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Project
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Project not found
          </h1>
          <p className="text-muted-foreground mb-8">
            This project page is a placeholder. Check back soon for the full write-up.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            onClick={() => onNavigate('/')}
          >
            Back to home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-sm uppercase tracking-widest text-primary mb-4">
          Project
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 whitespace-pre-line">
          {project.description}
        </p>

        {project.videoUrl && (
          <div className="rounded-2xl overflow-hidden border border-border mb-10">
            <video
              className="w-full h-[360px] md:h-[420px] object-cover"
              autoPlay
              muted
              playsInline
              loop
              controls
              preload="auto"
              onLoadedData={(event) => {
                const video = event.currentTarget;
                video.pause();
                video.currentTime = 0;
              }}
            >
              <source src={project.videoUrl} />
            </video>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border border-border bg-card/60 p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Placeholder space for a deeper project breakdown. This can include the problem,
              approach, key results, and next steps when you are ready to expand the case study.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Stack
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => onNavigate('/')}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
