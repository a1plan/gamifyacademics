
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GameCard = ({ 
  title, 
  subject, 
  grade, 
  image, 
  index 
}: { 
  title: string; 
  subject: string; 
  grade: string; 
  image: string; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group hover-scale"
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
          {subject}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="px-2 py-1 bg-brand-accent-purple rounded-md text-xs font-medium text-brand-purple-dark">
            {grade}
          </span>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-between text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10"
        >
          Play Now <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const games = [
  {
    title: "Math Quest Adventure",
    subject: "Mathematics",
    grade: "Grade 3-5",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "Science Explorer",
    subject: "Science",
    grade: "Grade 6-8",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "Grammar Galaxy",
    subject: "English",
    grade: "Grade 4-6",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
];

const DemoGameSection = () => {
  return (
    <section className="py-24 px-4 bg-brand-accent-green/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-brand-purple/10 text-brand-purple mb-6">
              Free Demo Games
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Try Our Educational Games
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of game-based learning with our free demo games. 
              No registration required to start playing.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <GameCard 
              key={index}
              title={game.title}
              subject={game.subject}
              grade={game.grade}
              image={game.image}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
          >
            View All Demo Games
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoGameSection;
