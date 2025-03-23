const Work = () => {
  return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Simple, Seamless Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with blockchain ticketing has never been easier.
            </p>
          </div>

          {/* Animated Horizontal Timeline */}
          <div className="relative pb-12">
            {/* Main timeline line with animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-16 hidden md:block">
              <div
                className="h-full bg-indigo-500 w-0 origin-left"
                style={{
                  animation: "expand 1.5s ease forwards 0.5s",
                }}
              ></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8">
              {[
                {
                  icon: "💼",
                  title: "Create & Customize",
                  description:
                    "Set up your event with details, custom ticket tiers, and pricing—all secured on the blockchain.",
                  delay: 0.5,
                },
                {
                  icon: "🎟️",
                  title: "Mint & Distribute",
                  description:
                    "Attendees receive unique NFT tickets directly in their digital wallets after purchase.",
                  delay: 1.0,
                },
                {
                  icon: "🚪",
                  title: "Verify & Experience",
                  description:
                    "Seamless entry verification at the venue through QR code scanning of the NFT ticket.",
                  delay: 1.5,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="md:w-1/3 relative"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards ${step.delay}s, floatUp 0.7s ease forwards ${step.delay}s`,
                  }}
                >
                  {/* Animated circle node on timeline */}
                  <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-md"
                      style={{
                        animation: `pulse 2s infinite ${step.delay + 0.2}s`,
                      }}
                    >
                      <span className="text-lg font-bold text-indigo-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Mobile circle node */}
                  <div className="md:hidden flex items-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-md mr-4"
                      style={{
                        animation: `pulse 2s infinite ${step.delay + 0.2}s`,
                      }}
                    >
                      <span className="text-lg font-bold text-indigo-600">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {step.title}
                    </h3>
                  </div>

                  {/* Content box with icon */}
                  <div className="md:mt-24 bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Decorative accent corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-3xl"></div>

                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 hidden md:block">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>

                    {/* Step indicator dot */}
                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-indigo-400"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export default Work
