import type { Project } from "@/data/projects";

/**
 * Case study hero media: the showcase reel for video projects,
 * a typographic plate with the project glyph for the rest.
 */
export default function CaseMedia({ project }: { project: Project }) {
  // Prefer a landscape detail reel; fall back to the portrait card media.
  const media = project.detailMedia ?? project.media;

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-[var(--line)]">
      {media.type === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          className="aspect-[16/9] w-full bg-[#141416] object-cover"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full flex-col justify-between bg-card p-8 md:p-12">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs text-faint">{project.category}</span>
            <span className="text-2xl text-accent">{media.glyph}</span>
          </div>
          <span className="serif-accent self-center text-center text-[clamp(2.5rem,7vw,5.5rem)] leading-none text-faint">
            {project.title}
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {project.stack.map((item) => (
              <span key={item} className="font-mono text-xs text-faint">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
