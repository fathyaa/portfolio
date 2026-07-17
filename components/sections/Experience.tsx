import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <section
      id="experience"
      className="hairline-t mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:px-10"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="font-mono text-xs tracking-wide text-muted">Experience</p>
        </Reveal>

        <div className="md:col-span-9 lg:col-span-8">
          <ul>
            {profile.experience.map((item, i) => (
              <Reveal key={item.org} as="li" delay={i * 0.08}>
                <div className={`${i > 0 ? "hairline-t" : ""} grid gap-2 py-8 md:grid-cols-12 md:gap-6`}>
                  <p className="font-mono text-xs text-faint md:col-span-3 md:pt-1.5">
                    {item.period}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-medium tracking-[-0.01em]">{item.role}</h3>
                    <p className="mt-0.5 font-mono text-xs text-muted">{item.org}</p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="hairline-t pt-6 font-mono text-xs leading-relaxed text-faint">
              {profile.education}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
