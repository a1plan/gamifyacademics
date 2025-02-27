
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DemoGameSection from '@/components/DemoGameSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ThreeJSHero from '@/components/ThreeJSHero';
import { motion, useAnimation } from 'framer-motion';

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen"
    >
      <ThreeJSHero />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoGameSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
