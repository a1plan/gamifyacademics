
import { School, BookOpen, Gamepad2, Trophy, UserCheck, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <School className="h-8 w-8 text-brand-purple" />,
    title: "Indian Curriculum Aligned",
    description: "All games are designed to align perfectly with the Indian K-12 curriculum standards.",
  },
  {
    icon: <Gamepad2 className="h-8 w-8 text-brand-purple" />,
    title: "Learning Through Play",
    description: "Transform abstract concepts into engaging gameplay that makes learning fun and effective.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-brand-purple" />,
    title: "Rich Content Library",
    description: "Access a growing library of educational games covering mathematics, science, languages, and more.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-brand-purple" />,
    title: "Progress Tracking",
    description: "Monitor student performance with detailed analytics and progress reports via xAPI/SCORM tracking.",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-brand-purple" />,
    title: "Teacher Dashboard",
    description: "Empower teachers with tools to assign games, track progress, and identify learning gaps.",
  },
  {
    icon: <Trophy className="h-8 w-8 text-brand-purple" />,
    title: "Achievements & Rewards",
    description: "Motivate students with a gamified reward system that celebrates their educational milestones.",
  },
];

const FeaturesSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-brand-accent-purple/20">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-brand-purple/10 text-brand-purple mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Innovative Features for Modern Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with educational expertise to create an engaging learning experience.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl p-6 hover-scale shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="p-4 rounded-full bg-brand-purple/10 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
