import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import { projects } from '../../data/projects';
import cropDatabaseSql from '../../assets/crop-data-sql-database.sql?raw';
import wasteRoutingPseudocode from '../../assets/greedy-waste-routing-pseudocode.txt?raw';
import wasteRoutingCode from '../../assets/greedy-waste-routing-code.py?raw';

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ProjectDetail({ slug, onNavigate }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === slug);
  const isCropDatabase = project?.slug === 'crop-data-sql-database';
  const isDroneProject = project?.slug === 'autonomous-drone-system';
  const isWasteRouting = project?.slug === 'ai-job-application-agentic-system';
  const showFullDetail = isCropDatabase || isDroneProject || isWasteRouting;
  const cropDatabaseIntro =
    'This project was built with a focused goal: to move beyond surface-level SQL and develop a genuine understanding of relational database design from the ground up. Using an agricultural domain as the subject matter, I modeled real-world data around crops, their growing conditions, seasons, and related attributes into a fully normalized relational schema.\n\nThe process pushed me to think carefully about how entities relate to one another, defining cardinalities, justifying join tables, and documenting why each table exists rather than just making it work. Deciding whether a relationship was one-to-many or many-to-many, and then implementing that correctly in SQL, turned abstract theory into something concrete and defensible.\n\nBeyond the schema itself, the project strengthened my ability to translate real-world requirements into a data model, a skill that sits at the core of backend and data engineering work. I also explored how an API might cleanly expose this structure, and contrasted the relational approach against document-based alternatives, weighing the tradeoffs around integrity, scalability, and query flexibility.\n\nOverall, this project solidified my SQL fundamentals while improving the way I reason about and communicate data design decisions.';

  useEffect(() => {
    if (isCropDatabase || isWasteRouting) {
      Prism.highlightAll();
    }
  }, [isCropDatabase, isWasteRouting]);


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
        {showFullDetail ? (
          <>
            {isCropDatabase ? (
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 whitespace-pre-line">
                {cropDatabaseIntro}
              </p>
            ) : isWasteRouting ? (
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 whitespace-pre-line">
                {project.description}
              </p>
            ) : (
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 whitespace-pre-line">
                {project.description}
              </p>
            )}

            {project.pdfUrl && (
              <div className="mb-12 rounded-2xl border border-border bg-card/60 overflow-hidden">
                <iframe
                  title={`${project.title} report`}
                  src={project.pdfUrl}
                  className="w-full h-[720px]"
                />
              </div>
            )}

            {isCropDatabase && cropDatabaseSql && (
              <div className="mb-12">
                <pre className="rounded-2xl border border-border bg-[#0b0b0b] text-[#f5f5f5] p-6 overflow-x-auto text-sm">
                  <code className="language-sql">{cropDatabaseSql}</code>
                </pre>
              </div>
            )}

            {isWasteRouting && wasteRoutingPseudocode && (
              <div className="mb-12">
                <pre className="rounded-2xl border border-border bg-[#0b0b0b] text-[#f5f5f5] p-6 overflow-x-auto text-sm">
                  <code className="language-python">{wasteRoutingPseudocode}</code>
                </pre>
              </div>
            )}

            {isWasteRouting && wasteRoutingCode && (
              <div className="mb-12">
                <pre className="rounded-2xl border border-border bg-[#0b0b0b] text-[#f5f5f5] p-6 overflow-x-auto text-sm">
                  <code className="language-python">{wasteRoutingCode}</code>
                </pre>
              </div>
            )}
          </>
        ) : (
          <div className="mb-10 rounded-2xl border border-border bg-card/60 p-6">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Coming soon
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This project page is intentionally blank for now. Check back soon.
            </p>
          </div>
        )}


        {showFullDetail && project.videoUrl && (
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
