const TechSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-gray-700 text-xl md:text-2xl font-semibold mb-8 tracking-widest">
          TECHNOLOGIES USED
        </h2>
        <div className="relative">
          <div className="flex animate-marquee space-x-12">
            {[
              "Ethereum",
              "ReactJS",
              "Wagmi",
              "Web3.js",
              "Hardhat",
              "OpenZeppelin",
              "Typescript",
              "Shadcn",
            ].map((tech, index) => (
              <div
                key={tech + index}
                className="flex items-center justify-center bg-white rounded-full py-3 px-6 shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl"
              >
                <span className="text-2xl font-medium text-gray-800">
                  {tech}
                </span>
              </div>
            ))}
            {/* Duplicate the logos for seamless scrolling */}
            {[
              "Ethereum",
              "ReactJS",
              "Wagmi",
              "Web3.js",
              "Hardhat",
              "OpenZeppelin",
              "Typescript",
              "Shadcn",
            ].map((tech, index) => (
              <div
                key={tech + "-dup" + index}
                className="flex items-center justify-center bg-white rounded-full py-3 px-6 shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl"
              >
                <span className="text-2xl font-medium text-gray-800">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;