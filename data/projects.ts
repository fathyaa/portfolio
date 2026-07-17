export type ProjectMedia =
  | { type: "video"; src: string; poster: string }
  | { type: "plate"; glyph: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  stack: string[];
  oneLiner: string;
  summary: string;
  story: {
    context: string;
    build: string;
    result: string;
  };
  metrics: { label: string; value: string }[];
  /** Portrait media for the floating card and hover preview. */
  media: ProjectMedia;
  /** Optional landscape media for the case-study hero. Falls back to `media`. */
  detailMedia?: ProjectMedia;
};

export const projects: Project[] = [
  {
    slug: "mytelkomsel",
    title: "MyTelkomsel",
    category: "iOS · Mobile",
    year: "2023 — 2025",
    role: "iOS Developer",
    stack: ["Swift", "UIKit", "SwiftUI", "MVVM"],
    oneLiner: "Telkomsel's self-care app used by millions of users.",
    summary:
      "Indonesia's largest telco self-care app. Part of the team that built and maintained production iOS features.",
    story: {
      context:
        "MyTelkomsel serves millions of daily users across every network condition in the archipelago. Features ship through Agile squads — product, backend, QA, Android, and iOS moving together on a tight release train.",
      build:
        "Built and maintained production iOS features with Swift, UIKit, SwiftUI, and MVVM. Developed reusable UI components, integrated backend services, and improved maintainability through shared architecture and modular dependencies. Supported releases from development to production.",
      result:
        "Two and a half years of features shipped to one of Indonesia's highest-traffic iOS apps, with reusable components that outlived the screens they were built for and stability work that kept the release train on schedule.",
    },
    metrics: [
      { label: "Users", value: "Millions" },
      { label: "In production", value: "2.5 yrs" },
      { label: "Workflow", value: "Agile" },
    ],
    media: {
      type: "video",
      src: "/media/mytelkomsel.mp4",
      poster: "/media/mytelkomsel-poster.jpg",
    },
    detailMedia: {
      type: "video",
      src: "/media/mytelkomsel-detail.mp4",
      poster: "/media/mytelkomsel-detail-poster.jpg",
    },
  },
  {
    slug: "royal-beast",
    title: "Royal Beast",
    category: "Web App",
    year: "2026",
    role: "Full-stack Developer",
    stack: ["Express.js", "React", "Supabase", "Socket.IO", "PWA"],
    oneLiner: "A barbershop booking app and owner's financial reports.",
    summary:
      "A booking and queue-management app for a barbershop: customers browse barbers and services, book a slot, while staff run the live queue, and the owner reads daily profit-and-loss from a phone.",
    story: {
      context:
        "The shop ran on a paper ledger and a crowded waiting bench. Customers had no way to see queue length or pick their barber, and the owner had no view of daily takings without counting cash.",
      build:
        "Built the whole product: a customer flow for choosing a barber by profile and portfolio, slot booking, and payment with confirmation — plus a self-service kiosk mode with a live queue board, a staff dashboard for order status, and financial reports down to profit-and-loss and balance sheet. Push notifications keep both sides honest about whose turn it is.",
      result:
        "Built to streamline barbershop operations — from booking and queue management to business reporting — all in one platform.",
    },
    metrics: [
      { label: "Kiosk Mode", value: "Self-Service" },
      { label: "Queue Status", value: "Live" },
      { label: "Business Insights", value: "P&L + Balance Scheet" },
    ],
    media: {
      type: "video",
      src: "/media/royalbeast.mp4",
      poster: "/media/royalbeast-poster.jpg",
    },
    detailMedia: {
      type: "video",
      src: "/media/royalbeast-detail.mp4",
      poster: "/media/royalbeast-detail-poster.jpg",
    },
  },
  {
    slug: "bibitlive",
    title: "BibitLive",
    category: "IoT · Web App",
    year: "2025 — Now",
    role: "Full-stack Developer",
    stack: ["Node.js", "PostgreSQL", "RabbitMQ", "Redis", "Socket.IO", "PWA"],
    oneLiner: "A microservices IoT platform that watches over greenhouses in real time.",
    summary:
      "Final-year thesis at Telkom University: an IoT monitoring platform for screenhouse agriculture — sensor telemetry in, threshold alerts and actuator commands out, delivered to farmers in real time.",
    story: {
      context:
        "Screenhouse farming lives and dies by temperature and humidity, but monitoring meant walking the rows with a handheld meter. The thesis mandate: a production-grade platform from wireless sensor network to farmer's phone.",
      build:
        "Designed two Express.js services split by bounded context — identity/catalog and ingest/alerting — each with its own PostgreSQL database. An MQTT subscriber pipeline validates WSN telemetry into a seven-table monitoring schema, fires automated threshold alerts, and publishes actuator commands. A Redis event bus keeps registry and threshold snapshots in sync across services, and Socket.IO with Web Push delivers alerts to farmers in real time. JWT auth with role-based access, bcrypt hashing, SQL migrations, and Docker Compose round out a production-like deployment.",
      result:
        "A running dual-service platform with documented APIs aligned to UAT scenarios — telemetry lands, alerts fire on threshold breach, and actuators respond without anyone walking the rows.",
    },
    metrics: [
      { label: "Streaming", value: "MQTT" },
      { label: "Architecture", value: "Micro-services" },
      { label: "Delivery", value: "Real-time" },
    ],
    media: {
      type: "video",
      src: "/media/bibitlive.mp4",
      poster: "/media/bibitlive-poster.jpg",
    },
    detailMedia: {
      type: "video",
      src: "/media/bibitlive-detail.mp4",
      poster: "/media/bibitlive-detail-poster.jpg",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
