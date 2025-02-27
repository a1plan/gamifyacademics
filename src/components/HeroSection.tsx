
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { School, ArrowRight, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!schoolName.trim()) {
      toast({
        title: "School name required",
        description: "Please enter your school name to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      toast({
        title: "Welcome!",
        description: `Successfully logged in as ${schoolName}`,
      });
      setIsLoading(false);
      navigate('/role-selection');
    }, 1500);
  };

  const handleExploreDemo = () => {
    navigate('/role-selection');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-24 pb-16">
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-brand-accent-purple rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-brand-accent-green rounded-full blur-3xl opacity-30"></div>
      
      <div className="container max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 md:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-brand-purple/10 text-brand-purple mb-6">
                <Gamepad2 className="mr-1 h-3 w-3" />
                Indian K-12 Curriculum
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                Unlock Learning Through <span className="text-brand-purple">Play</span>: Gamified Education for K-12
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Transform classroom learning with interactive games aligned with the Indian education system. Engage students with educational content they'll actually enjoy.
              </p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter your school name"
                      className="pl-10 h-12"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="h-12 bg-brand-purple hover:bg-brand-purple-dark text-white px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 flex items-center">
                <Button 
                  variant="outline" 
                  className="gap-2 hover-scale"
                  onClick={handleExploreDemo}
                >
                  Explore Trial Game
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl border border-white/30 glass-card">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Educational gaming platform" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/30 to-transparent mix-blend-overlay"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-brand-purple-dark inline-block mb-2">
                    Featured Game
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">Math Adventure</h3>
                  <p className="text-sm text-white/80">Explore mathematical concepts through an exciting adventure game.</p>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                  <Gamepad2 className="h-5 w-5 text-brand-purple" />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-accent-yellow rounded-full blur-3xl opacity-30 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
