
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    content: "The gamified approach has completely transformed how our students engage with learning. They actually look forward to math and science now!",
    author: "Priya Sharma",
    role: "Principal, Delhi Public School",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    content: "As a teacher, I can see the difference in student comprehension and retention. The analytics help me identify exactly where students need additional support.",
    author: "Rajesh Kumar",
    role: "Science Teacher, Kendriya Vidyalaya",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "Our school has seen a 30% improvement in test scores since implementing this platform. The Indian curriculum alignment is perfect for our needs.",
    author: "Ananya Patel",
    role: "Academic Director, Modern Academy",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-24 px-4 bg-brand-accent-purple/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-brand-purple/10 text-brand-purple mb-6">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Educators Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from schools and teachers who have transformed their educational approach with our platform.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="absolute -top-6 left-10 bg-brand-purple rounded-full p-3 shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>
            
            <div className="min-h-[280px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover rounded-full border-4 border-brand-accent-purple"
                    />
                  </div>
                  
                  <div>
                    <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h4 className="font-bold text-lg">{testimonials[currentIndex].author}</h4>
                      <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <Button variant="outline" onClick={handlePrev} className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous
              </Button>
              <Button variant="outline" onClick={handleNext} className="group">
                Next
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
