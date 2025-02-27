
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/role-selection');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-brand-purple" />
            <span className="text-xl font-bold tracking-tight">
              Edu<span className="text-brand-purple">Play</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-brand-purple transition-colors duration-200">
              Home
            </Link>
            <Link to="/games" className="text-sm font-medium hover:text-brand-purple transition-colors duration-200">
              Games
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-brand-purple transition-colors duration-200">
              About Us
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-brand-purple transition-colors duration-200">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-sm font-medium hidden md:inline-flex hover:text-brand-purple hover:bg-brand-purple/10"
            >
              Contact
            </Button>
            <Button 
              className="font-medium bg-brand-purple hover:bg-brand-purple-dark text-white"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
