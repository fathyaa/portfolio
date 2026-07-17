import Reveal from "@/components/motion/Reveal";
import WorkRow from "@/components/sections/WorkRow";
import { projects } from "@/data/projects";

export default function WorkIndex() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-28 pt-8 md:px-10">
      <Reveal>
        <p className="mb-2 font-mono text-xs tracking-wide text-muted">
          Selected Work <span className="text-faint">({String(projects.length).padStart(2, "0")})</span>
        </p>
      </Reveal>
      <ul>
        {projects.map((project, i) => (
          <Reveal key={project.slug} as="li" delay={i * 0.06}>
            <WorkRow project={project} index={i} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
