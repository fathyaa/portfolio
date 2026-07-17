import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import SiteFooter from "@/components/sections/SiteFooter";
import SiteHeader from "@/components/sections/SiteHeader";
import WorkIndex from "@/components/sections/WorkIndex";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WorkIndex />
        <About />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
