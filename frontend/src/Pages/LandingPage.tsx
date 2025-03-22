import { ConnectKitButton } from 'connectkit';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeEvent, setActiveEvent] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const events = [
        {
        id: 1,
        title: "Techaccelerate 2025",
        date: "April 12, 2025",
        location: "Hyderabad",
        price: "0.5 ETH",
        image: "/event-1.jpg"
        },
        {
        id: 2,
        title: "Parsec 2025",
        date: "May 8, 2025",
        location: "Dharwad",
        price: "0.3 ETH",
        image: "/event-2.jpg"
        },
        {
        id: 3,
        title: "Hack2Future",
        date: "June 15, 2025",
        location: "Dharwad",
        price: "0.2 ETH",
        image: "/event-3.jpg"
        }
    ];

    return (
        <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
        </div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 -z-5 overflow-hidden">
            <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-300 blur-3xl"
            animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            style={{ top: '10%', left: '5%', opacity: 0.2 }}
            />
            <motion.div 
            className="absolute w-80 h-80 rounded-full bg-indigo-400 blur-3xl"
            animate={{
                x: [0, -70, 0],
                y: [0, 100, 0],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            style={{ top: '40%', right: '10%', opacity: 0.15 }}
            />
            <motion.div 
            className="absolute w-72 h-72 rounded-full bg-pink-300 blur-3xl"
            animate={{
                x: [0, 50, 0],
                y: [0, -80, 0],
            }}
            transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            style={{ bottom: '15%', left: '25%', opacity: 0.1 }}
            />
        </div>

        {/* Navigation */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
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
                
                <nav className="hidden md:flex items-center space-x-8">
                {['About', 'Features', 'Events', 'FAQ'].map(item => (
                    <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-indigo-600 transition font-medium text-sm tracking-wide"
                    >
                    {item}
                    </a>
                ))}
                </nav>
                
                <div>
                <ConnectKitButton 
                    customTheme={{
                    "--ck-connectbutton-background": "#fff",
                    "--ck-connectbutton-color": "#4F46E5",
                    "--ck-connectbutton-hover-background": "#F9FAFB",
                    "--ck-connectbutton-border-radius": "0.5rem",
                    "--ck-connectbutton-box-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    "--ck-connectbutton-border": "1px solid #E5E7EB"
                    }}
                />
                </div>
            </div>
            </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
  {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70"></div>
    
    {/* Decorative elements */}
    <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    
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
                <svg className="absolute -bottom-2 w-full" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path 
                    d="M0,5 Q30,2 60,5 T120,5 T180,5 T240,5 T300,5" 
                    fill="none" 
                    stroke="url(#wavy-gradient)" 
                    strokeWidth="5"
                    className="animate-wave"
                    />
                    <defs>
                    <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
            Secure, transparent, and fully decentralized ticketing powered by NFT technology. Create, sell, and authenticate event tickets on the blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Explore Events</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
                </svg>
                NFT POWERED
            </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -bottom-16 -right-16 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-70"></div>
        
        <div className="absolute -top-16 -left-16 w-32 h-32 border-2 border-dashed border-indigo-300 rounded-xl rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-10 right-20 w-20 h-20 border-2 border-dashed border-purple-300 rounded-xl -rotate-12 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70"></div>
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float opacity-70" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-70" style={{animationDelay: '2s'}}></div>
      </motion.div>
    </div>
  </div>
        </section>

        
        {/* Tech used */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-6">
            <h2 className="text-center text-gray-700 text-xl md:text-2xl font-semibold mb-8 tracking-widest">
            TECHNOLOGIES USED
            </h2>
            <div className="relative">
            <div className="flex animate-marquee space-x-12">
                {["Ethereum", "ReactJS", "Wagmi", "Web3.js", "Hardhat", "OpenZeppelin", "Typescript", "Shadcn"].map((tech, index) => (
                <div key={tech + index} className="flex items-center justify-center bg-white rounded-full py-3 px-6 shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl">
                    <span className="text-2xl font-medium text-gray-800">{tech}</span>
                </div>
                ))}
                {/* Duplicate the logos for seamless scrolling */}
                {["Ethereum", "ReactJS", "Wagmi", "Web3.js", "Hardhat", "OpenZeppelin", "Typescript", "Shadcn"].map((tech, index) => (
                <div key={tech + "-dup" + index} className="flex items-center justify-center bg-white rounded-full py-3 px-6 shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl">
                    <span className="text-2xl font-medium text-gray-800">{tech}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>


        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Why Tokenova Stands Out
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Reimagining ticketing with blockchain technology that benefits both event organizers and attendees.
            </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                title: "Fraud-Proof Verification",
                description: "Each ticket is a unique NFT on the blockchain, eliminating counterfeits and scams.",
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                    </svg>
                )
                },
                {
                title: "Smart Royalties",
                description: "Organizers earn from secondary sales through programmable smart contracts.",
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    </svg>
                )
                },
                {
                title: "Collectible Memorabilia",
                description: "Tickets remain in wallets as digital collectibles long after events end.",
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                    </svg>
                )
                }
            ].map((feature, index) => (
                <motion.div
                key={index}
                className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                </motion.div>
            ))}
            </div>
        </div>
    </section>


    {/* How It Works - Animated Horizontal Timeline */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Simple, Seamless Process</h2>
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
                    animation: "expand 1.5s ease forwards 0.5s"
                }}
                ></div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {[
                {
                    icon: "💼",
                    title: "Create & Customize",
                    description: "Set up your event with details, custom ticket tiers, and pricing—all secured on the blockchain.",
                    delay: 0.5
                },
                {
                    icon: "🎟️",
                    title: "Mint & Distribute",
                    description: "Attendees receive unique NFT tickets directly in their digital wallets after purchase.",
                    delay: 1.0
                },
                {
                    icon: "🚪",
                    title: "Verify & Experience",
                    description: "Seamless entry verification at the venue through QR code scanning of the NFT ticket.",
                    delay: 1.5
                }
                ].map((step, index) => (
                <div 
                    key={index} 
                    className="md:w-1/3 relative" 
                    style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards ${step.delay}s, floatUp 0.7s ease forwards ${step.delay}s`
                    }}
                >
                    {/* Animated circle node on timeline */}
                    <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div 
                        className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-md"
                        style={{
                        animation: `pulse 2s infinite ${step.delay + 0.2}s`
                        }}
                    >
                        <span className="text-lg font-bold text-indigo-600">{index + 1}</span>
                    </div>
                    </div>
                    
                    {/* Mobile circle node */}
                    <div className="md:hidden flex items-center mb-4">
                    <div 
                        className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-md mr-4"
                        style={{
                        animation: `pulse 2s infinite ${step.delay + 0.2}s`
                        }}
                    >
                        <span className="text-lg font-bold text-indigo-600">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    
                    {/* Content box with icon */}
                    <div className="md:mt-24 bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Decorative accent corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-3xl"></div>
                    
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 hidden md:block">{step.title}</h3>
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
        
        {/* Featured Events */}
        <section id="events" className="py-24 bg-white">
            <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                <h2 className="text-3xl font-bold mb-4">Trending Events</h2>
                <p className="text-gray-600">Discover unique experiences powered by NFT ticketing</p>
                </div>
                <div className="flex gap-2 mt-6 md:mt-0">
                {[0, 1, 2].map((idx) => (
                    <button 
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${activeEvent === idx ? 'bg-indigo-600 w-6' : 'bg-gray-300'}`}
                    onClick={() => setActiveEvent(idx)}
                    />
                ))}
                </div>
            </div>
            
            <div className="relative overflow-hidden">
                <AnimatePresence>
                <motion.div 
                    key={activeEvent}
                    className="grid md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {events.map((event, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group"
                    >
                        <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gray-500 animate-pulse" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                            {event.date}
                        </div>
                        </div>
                        
                        <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                            <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-600 transition">{event.title}</h3>
                            <p className="text-gray-600 text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                            </p>
                            </div>
                            
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                            NFT
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="font-bold text-gray-900">{event.price}</span>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                            Buy Ticket
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="text-center mt-12">
                <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2 mx-auto">
                <span>View All Events</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
            </div>
            </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our blockchain ticketing platform
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
                {[
                {
                    q: "What makes NFT tickets better than traditional tickets?",
                    a: "NFT tickets provide unmatched security through blockchain verification, eliminating counterfeiting. They also enable royalties for event organizers on resales and remain as digital collectibles after the event."
                },
                {
                    q: "Do I need cryptocurrency to purchase tickets?",
                    a: "Yes, you'll need ETH in your digital wallet to purchase tickets. We support popular wallets like MetaMask, Coinbase Wallet, and WalletConnect."
                },
                {
                    q: "How do I verify my ticket at the event?",
                    a: "Each NFT ticket contains a unique QR code that can be scanned at the venue entrance. Simply present your digital wallet app with the NFT ticket for verification."
                },
                {
                    q: "Can I transfer or resell my ticket?",
                    a: "Yes, you can transfer your NFT ticket to another wallet or resell it on our marketplace. A percentage of resales goes back to event organizers as royalties."
                }
                ].map((item, idx) => (
                <motion.div 
                    key={idx} 
                    className="mb-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                    <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                    <p className="text-gray-600">{item.a}</p>
                </motion.div>
                ))}
            </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-12">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your events?</h2>
                    <p className="text-indigo-100 text-lg">
                    Join the future of ticketing with blockchain technology. Get started in minutes.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
                    <span>Create Your First Event</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    </button>
                    
                    <ConnectKitButton />
                </div>
                </div>
            </div>
            </div>
        </section>
        

        <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
                <ul className="space-y-2">
                    {['Features', 'Security', 'Roadmap', 'Pricing'].map(item => (
                    <li key={item}>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">
                        {item}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
                
                <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-2">
                    {['Blog', 'Documentation', 'Developers', 'Support'].map(item => (
                    <li key={item}>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">
                        {item}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
                
                <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2">
                    {['About', 'Team', 'Careers', 'Contact'].map(item => (
                    <li key={item}>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">
                        {item}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
                
                <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-2">
                    {['Privacy', 'Terms', 'Cookies'].map(item => (
                    <li key={item}>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">
                        {item}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">T</span>
                </div>
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">tokenova</span>
                </div>
                
                <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Tokenova. All rights reserved.
                </div>
                
            </div>
        </div>
        </footer>
    
        </div>
    )
};

export default LandingPage;