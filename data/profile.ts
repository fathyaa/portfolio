export const profile = {
  name: "Fathya Ariyani",
  firstName: "Fathya",
  tagline:
    "A builder. Someone who cares equally about engineering, design, and the people using the product.",
  // Rotating phrases in the hero selection. Keep them short and parallel.
  roles: [
    "digital products",
    "iOS apps",
    "web applications",
    "IoT platform",
    "thoughtful software",
  ],
  email: "fathyariyani@gmail.com",
  location: "Bandung, Indonesia",
  manifesto: [
    "I care about the seam between design and engineering — where a spring curve meets a state machine, and a product starts to feel inevitable.",
    "Most of my work lives on both sides of the network: native apps people hold in their hands, and the systems that keep them fast, honest, and quietly reliable.",
  ],
  capabilities: [
    "iOS Development",
    "Full-stack Web Development",
    "System Design",
  ],
  experience: [
    {
      role: "Full-stack Developer",
      org: "Screenhouse Monitoring · Telkom University",
      period: "2025 — Now",
      summary:
        "Final-year thesis: a microservices IoT monitoring platform — two Express.js services with bounded-context PostgreSQL databases, MQTT telemetry ingestion, Redis event bus, and real-time Socket.IO + Web Push delivery.",
    },
    {
      role: "iOS Developer",
      org: "PT Phincon · MyTelkomsel",
      period: "2023 — 2025",
      summary:
        "Built and maintained production features on a telco app used by millions — Swift, UIKit, SwiftUI, and MVVM in Agile squads, from REST integration and reusable components to release support and Firebase Analytics.",
    },
    {
      role: "Web Developer Intern",
      org: "Institut Teknologi Bandung — Direktorat TI",
      period: "2022",
      summary:
        "Translated business requirements into UML and ERD, then shipped a PHP/CodeIgniter web application with 10+ features and iterated on stakeholder feedback.",
    },
  ],
  education:
    "Telkom University — B.Sc. Information Systems, expected 2026 · Associate's degree, GPA 3.9/4.0",
  socials: [
    { label: "GitHub", href: "https://github.com/fathyaa" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fathya-ariyani" },
  ],
  resumeHref: "/resume.pdf",
} as const;
