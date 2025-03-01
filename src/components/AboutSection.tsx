
import { Book, Brain, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 bg-brand-mindsmaidaan-navy/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-brand-mindsmaidaan-navy" />
      </div>
      <h3 className="text-xl font-fredoka mb-3 text-brand-mindsmaidaan-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-white to-brand-mindsmaidaan-green/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-kg-primary mb-4 text-brand-mindsmaidaan-navy">
              Why Gamified Learning?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the importance of integrating game-based learning in education
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={Brain}
            title="Boosts Engagement"
            description="Game-based learning increases student engagement by 87%, making learning more enjoyable and effective."
            delay={0.1}
          />
          <FeatureCard
            icon={Zap}
            title="Enhances Retention"
            description="Students retain up to 90% of what they learn through interactive gameplay compared to traditional methods."
            delay={0.2}
          />
          <FeatureCard
            icon={Users}
            title="Encourages Collaboration"
            description="Multiplayer educational games develop essential social and teamwork skills while learning."
            delay={0.3}
          />
          <FeatureCard
            icon={Book}
            title="Real-world Application"
            description="Games provide context for academic concepts, showing students real-world applications of their learning."
            delay={0.4}
          />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-fredoka mb-6 text-brand-mindsmaidaan-navy">
              Transform Your Teaching Approach
            </h3>
            <p className="text-gray-600 mb-6">
              MindsMaidaan provides educators with powerful tools to create interactive, curriculum-aligned games that make learning fun and effective. Our platform is designed to meet the specific needs of Indian K-12 education.
            </p>
            <p className="text-gray-600 mb-6">
              By integrating game-based learning into your classroom, you can:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1 h-5 w-5 min-w-5 bg-brand-mindsmaidaan-teal/20 text-brand-mindsmaidaan-teal rounded-full items-center justify-center">
                  ✓
                </span>
                <span>Increase student motivation and participation</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1 h-5 w-5 min-w-5 bg-brand-mindsmaidaan-teal/20 text-brand-mindsmaidaan-teal rounded-full items-center justify-center">
                  ✓
                </span>
                <span>Track individual progress with detailed analytics</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1 h-5 w-5 min-w-5 bg-brand-mindsmaidaan-teal/20 text-brand-mindsmaidaan-teal rounded-full items-center justify-center">
                  ✓
                </span>
                <span>Customize content to meet different learning needs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1 h-5 w-5 min-w-5 bg-brand-mindsmaidaan-teal/20 text-brand-mindsmaidaan-teal rounded-full items-center justify-center">
                  ✓
                </span>
                <span>Align games with national curriculum standards</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1974&auto=format&fit=crop" 
                alt="Teacher using digital games in classroom" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-mindsmaidaan-navy/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
