import EmailButton from "@/components/EmailButton";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="hairline-t mx-auto max-w-6xl scroll-mt-20 px-6 py-32 md:px-10">
      <Reveal>
        <p className="mb-6 font-mono text-xs tracking-wide text-muted">Contact</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          Let&rsquo;s build <span className="serif-accent">something</span>{" "}
          worth keeping.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-10">
          <EmailButton email={profile.email} />
        </div>
      </Reveal>
    </section>
  );
}
