import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
  orientation?: "portrait" | "landscape";
};

/**
 * The floating card used around the hero and in the mobile card row.
 * Video projects show their reel; others get a typographic plate.
 */
export default function ProjectCard({
  project,
  index,
  className,
  orientation = "portrait",
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const landscape = orientation === "landscape";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${className ?? ""}`}
      aria-label={`${project.title} — ${project.category}`}
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_30px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_48px_-16px_rgba(0,0,0,0.22)]">
        <div className={`relative overflow-hidden ${landscape ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
          {project.media.type === "video" ? (
            <video
              src={project.media.src}
              poster={project.media.poster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between bg-paper p-4">
              <span className="self-end text-lg text-faint transition-colors duration-500 group-hover:text-accent">
                {project.media.glyph}
              </span>
              <span
                className={`serif-accent self-center text-faint transition-colors duration-500 group-hover:text-accent ${
                  landscape ? "text-6xl" : "text-7xl"
                }`}
              >
                {number}
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {project.stack.slice(0, 3).map((item) => (
                  <span key={item} className="font-mono text-[10px] text-faint">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-3 px-4 py-3">
          <span className="shrink-0 text-sm font-medium">{project.title}</span>
          <span className="min-w-0 text-right font-mono text-[10px] leading-tight text-muted">
            {project.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
