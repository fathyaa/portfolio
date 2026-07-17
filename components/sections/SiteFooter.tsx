import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="hairline-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-4 px-6 py-8 md:px-10">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav className="flex gap-6">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-ink"
            >
              {social.label}
            </a>
          ))}
          <a
            href={profile.resumeHref}
            className="font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Résumé
          </a>
        </nav>
      </div>
    </footer>
  );
}
