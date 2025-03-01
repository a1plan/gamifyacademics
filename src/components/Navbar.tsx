
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-300 
        ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-brand-mindsmaidaan-navy" />
            <span className="text-xl font-kg-primary tracking-wide">
              Minds<span className="text-brand-mindsmaidaan-teal">Maidaan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-brand-mindsmaidaan-teal transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-brand-mindsmaidaan-teal transition-colors duration-200">
              About
            </Link>
            <Link to="/games" className="text-sm font-medium hover:text-brand-mindsmaidaan-teal transition-colors duration-200">
              Games
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-brand-mindsmaidaan-teal transition-colors duration-200">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-sm font-medium hidden md:inline-flex hover:text-brand-mindsmaidaan-teal hover:bg-brand-mindsmaidaan-teal/10"
              onClick={() => navigate('/games')}
            >
              Try Free Games
            </Button>
            <Button 
              className="font-medium bg-brand-mindsmaidaan-navy hover:bg-brand-mindsmaidaan-navy/90 text-white" 
              onClick={handleLogin}
            >
              Login
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-4 p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium py-2 px-4 hover:bg-brand-mindsmaidaan-teal/10 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium py-2 px-4 hover:bg-brand-mindsmaidaan-teal/10 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/games" 
              className="text-sm font-medium py-2 px-4 hover:bg-brand-mindsmaidaan-teal/10 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium py-2 px-4 hover:bg-brand-mindsmaidaan-teal/10 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Button 
              className="w-full font-medium bg-brand-mindsmaidaan-green hover:bg-brand-mindsmaidaan-green/90 text-brand-mindsmaidaan-navy"
              onClick={() => {
                navigate('/games');
                setIsMobileMenuOpen(false);
              }}
            >
              Try Free Games
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
