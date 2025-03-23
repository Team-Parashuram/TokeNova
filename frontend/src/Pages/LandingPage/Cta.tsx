import { ConnectKitButton } from 'connectkit'
import React from 'react'

const Cta = () => {
  return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-12">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to transform your events?
                </h2>
                <p className="text-indigo-100 text-lg">
                  Join the future of ticketing with blockchain technology. Get
                  started in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <span>Create Your First Event</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <ConnectKitButton />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Cta
