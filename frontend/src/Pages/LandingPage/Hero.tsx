import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="block text-gray-900">Redefining</span>
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                  Event Ticketing
                  <svg
                    className="absolute -bottom-2 w-full"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q30,2 60,5 T120,5 T180,5 T240,5 T300,5"
                      fill="none"
                      stroke="url(#wavy-gradient)"
                      strokeWidth="5"
                      className="animate-wave"
                    />
                    <defs>
                      <linearGradient
                        id="wavy-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
              <span className="block text-gray-900">with Blockchain</span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Secure, transparent, and fully decentralized ticketing powered by
              NFT technology. Create, sell, and authenticate event tickets on
              the blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Explore Events</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 bg-white rounded-lg font-medium hover:border-indigo-400 hover:bg-gray-50 hover:shadow-lg transition-all duration-300">
                Create Event
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Card backdrop blur effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl transform rotate-2"></div>

            {/* Main card */}
            <div className="relative z-10 p-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.2)] rotate-1 backdrop-blur-sm border border-indigo-100/50">
              <img
                src="/1701178054433.webp"
                alt="NFT Ticket Example"
                className="rounded-xl w-full object-cover shadow-inner h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1 transform hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
                </svg>
                NFT POWERED
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-16 -right-16 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-70"></div>

            <div className="absolute -top-16 -left-16 w-32 h-32 border-2 border-dashed border-indigo-300 rounded-xl rotate-12 animate-pulse"></div>
            <div
              className="absolute -bottom-10 right-20 w-20 h-20 border-2 border-dashed border-purple-300 rounded-xl -rotate-12 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70"></div>
            <div
              className="absolute top-2/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "2s" }}
            ></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection
