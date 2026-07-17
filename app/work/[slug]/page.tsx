import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SiteFooter from "@/components/sections/SiteFooter";
import SiteHeader from "@/components/sections/SiteHeader";
import CaseMedia from "@/components/work/CaseMedia";
import { getProject, projects } from "@/data/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Fathya Ariyani`,
    description: project.oneLiner,
  };
}

const storyBlocks = [
  { key: "context", label: "Context" },
  { key: "build", label: "Build" },
  { key: "result", label: "Result" },
] as const;

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-wide text-muted">
            {String(index + 1).padStart(2, "0")} · {project.category} · {project.year}
          </p>
          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="hairline-t mt-12 grid grid-cols-2 gap-x-8 gap-y-6 py-6 md:grid-cols-4">
            <div>
              <dt className="font-mono text-[11px] text-faint">Role</dt>
              <dd className="mt-1 text-sm">{project.role}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="font-mono text-[11px] text-faint">Stack</dt>
              <dd className="mt-1 text-sm">{project.stack.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] text-faint">Year</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <CaseMedia project={project} />
        </Reveal>

        <div className="mx-auto mt-24 max-w-3xl">
          {storyBlocks.map(({ key, label }) => (
            <Reveal key={key}>
              <div className="hairline-t grid gap-3 py-10 md:grid-cols-12">
                <p className="font-mono text-xs text-muted md:col-span-3">{label}</p>
                <p className="leading-relaxed md:col-span-9">{project.story[key]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="hairline-t mx-auto mt-4 grid max-w-3xl grid-cols-3 gap-6 py-12">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-medium tracking-tight md:text-3xl">{metric.value}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Link href={`/work/${next.slug}`} className="group hairline-t mt-20 block pt-12">
            <p className="font-mono text-xs text-muted">Next project</p>
            <span className="mt-3 flex items-baseline gap-4">
              <span className="text-4xl font-medium tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-ink md:text-6xl">
                {next.title}
              </span>
              <ArrowUpRight
                className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-ink"
                size={28}
              />
            </span>
          </Link>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
