import GlyphField from "@/components/GlyphField";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroStage from "@/components/HeroStage";
import Dashboard from "@/components/Dashboard";
import Context from "@/components/Context";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <GlyphField />
      <Nav />
      <main className="relative z-10">
        <HeroStage hero={<Hero />}><Dashboard /></HeroStage>
        <div className="relative z-10 bg-carbon"><Context /></div>
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
