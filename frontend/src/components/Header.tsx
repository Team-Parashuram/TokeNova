import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import ChatWithAI from "./ChatSystem/ChatWithAI";

const Header = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigateTo("/")}
          >
            <div className="flex items-center gap-2 relative">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Tokenova
              </motion.span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Explores", path: "/home" },
              ...(address
                ? [
                    { name: "Create Event", path: "/create-event" },
                    { name: "My Events", path: "/my-events" },
                  ]
                : []),
              { name: "FAQs", path: "#" },
            ].map((item, index) => (
              <motion.a
                key={index}
                onClick={() => navigateTo(item.path)}
                className="relative text-gray-700 font-medium hover:text-purple-600 transition cursor-pointer px-2 py-1"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ConnectKitButton
                customTheme={{
                  "--ck-connectbutton-background":
                    "linear-gradient(to right, #9333ea, #db2777)",
                  "--ck-connectbutton-hover-background":
                    "linear-gradient(to right, #7e22ce, #be185d)",
                  "--ck-connectbutton-color": "white",
                  "--ck-connectbutton-border-radius": "9999px",
                }}
              />
            </motion.div>

              <ChatWithAI />
            <motion.button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg border-t border-purple-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-1">
                {[
                  { name: "Explores", path: "/home" },
                  ...(address
                    ? [
                        { name: "Create Event", path: "/create-event" },
                        { name: "My Events", path: "/my-events" },
                      ]
                    : []),
                  { name: "FAQs", path: "#" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    onClick={() => navigateTo(item.path)}
                    className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition cursor-pointer py-3 px-4 rounded-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </header>
      <div className="h-16"></div>
    </>
  );
};

export default Header;
