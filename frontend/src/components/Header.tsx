import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { motion} from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (path:string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-200 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigateTo('/')}
          >
                <div className="flex items-center gap-2">
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">T</span>
                    </div>
                </motion.div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Tokenova</span>
                </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              onClick={() => navigateTo('/home')} 
              className="text-black hover:text-purple-400 transition cursor-pointer"
            >
              Explore
            </a>
            {address && (
              <>
                <a 
                  onClick={() => navigateTo('/create-event')} 
                  className="text-black hover:text-purple-400 transition cursor-pointer"
                >
                  Create Event
                </a>
                <a 
                  onClick={() => navigateTo('/my-events')} 
                  className="text-black hover:text-purple-400 transition cursor-pointer"
                >
                  My Events
                </a>
              </>
            )}
            <a href="#" className="text-black hover:text-purple-400 transition cursor-pointer">
              FAQs
            </a>
          </nav>

          {/* Connect Wallet Button */}
          <div className="flex items-center gap-4">
            <ConnectKitButton 
              customTheme={{
                "--ck-connectbutton-background": "linear-gradient(to right, #9333ea, #db2777)",
                "--ck-connectbutton-hover-background": "linear-gradient(to right, #7e22ce, #be185d)",
                "--ck-connectbutton-color": "white",
                "--ck-connectbutton-border-radius": "9999px",
              }}
            />

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-black focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a 
                  onClick={() => navigateTo('/home')} 
                  className="text-black hover:text-purple-400 transition cursor-pointer py-2"
                >
                  Explore
                </a>
                {address && (
                  <>
                    <a 
                      onClick={() => navigateTo('/create-event')} 
                      className="text-black hover:text-purple-400 transition cursor-pointer py-2"
                    >
                      Create Event
                    </a>
                    <a 
                      onClick={() => navigateTo('/my-events')} 
                      className="text-black hover:text-purple-400 transition cursor-pointer py-2"
                    >
                      My Events
                    </a>
                  </>
                )}
                <a href="#" className="text-black hover:text-purple-400 transition cursor-pointer py-2">
                  FAQs
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
