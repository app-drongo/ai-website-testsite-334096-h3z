import Hero from '@/components/sections/home/Hero';
import Features from '@/components/sections/home/Features';
import Pricing from '@/components/sections/home/Pricing';
import Contact from '@/components/sections/home/Contact';

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
