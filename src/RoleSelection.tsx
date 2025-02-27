
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { School, GraduationCap, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You need to select either Teacher or Student to continue",
        variant: "destructive",
      });
      return;
    }

    if (selectedRole === 'teacher') {
      navigate('/teacher-dashboard');
    } else {
      navigate('/student-dashboard');
    }

    toast({
      title: "Welcome!",
      description: `You've logged in as a ${selectedRole}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-accent-purple/30 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
            <School className="h-8 w-8 text-brand-purple" />
          </div>
          <h1 className="text-2xl font-bold">Select Your Role</h1>
          <p className="text-muted-foreground mt-2">
            Choose your role to continue to the appropriate dashboard
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            className={`flex flex-col items-center p-6 h-auto gap-3 hover:bg-brand-purple/10 ${
              selectedRole === 'teacher' ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/20' : ''
            }`}
            onClick={() => handleRoleSelect('teacher')}
          >
            <BookOpen className="h-10 w-10" />
            <span className="font-semibold">Teacher</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`flex flex-col items-center p-6 h-auto gap-3 hover:bg-brand-purple/10 ${
              selectedRole === 'student' ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/20' : ''
            }`}
            onClick={() => handleRoleSelect('student')}
          >
            <GraduationCap className="h-10 w-10" />
            <span className="font-semibold">Student</span>
          </Button>
        </div>

        <Button
          className="w-full bg-brand-purple hover:bg-brand-purple-dark"
          size="lg"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
