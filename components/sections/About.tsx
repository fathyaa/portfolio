import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="hairline-t mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:px-10">
      <div className="grid gap-10 md:grid-cols-12">
        {/* Left rail: the About label sits above the portrait. */}
        <div className="md:col-span-4 lg:col-span-3">
          <Reveal>
            <p className="font-mono text-xs tracking-wide text-muted">About</p>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="mt-8 max-w-[15rem] md:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-16px_rgba(0,0,0,0.18)] rotate-[-1.5deg] transition-transform duration-500 hover:rotate-0">
                <img
                  src="/media/fathya.jpg"
                  alt="Fathya Ariyani"
                  width={1350}
                  height={1800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-[center_26%]"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
          {profile.manifesto.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p
                className={
                  i === 0
                    ? "text-2xl font-medium leading-snug tracking-[-0.01em] md:text-[2rem]"
                    : "mt-6 max-w-xl text-base leading-relaxed text-muted"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <ul className="mt-14 md:max-w-md">
              {profile.capabilities.map((capability, i) => (
                <li
                  key={capability}
                  className="hairline-t flex items-baseline justify-between py-3"
                >
                  <span className="text-sm">{capability}</span>
                  <span className="font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
