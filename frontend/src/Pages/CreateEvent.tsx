import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { createEvent } from '@/web-3/blockchain'; // Adjust the import path as necessary

const CreateEvent = () => {
    const { address } = useAccount();
    const geminiApiKey = `AIzaSyC8xA5p5MFKOMjJJW02ssEMEMS2ywEdX_Q`;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [useAI, setUseAI] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        price: '',
        totalTickets: 100,
        category: '',
        imageUrl: '',
        canBeResold: false,
        royaltyPercent: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleAIGenerate = async () => {
        if (!aiPrompt) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + geminiApiKey,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Generate an event name, description, and category based on the following prompt: "${aiPrompt}". The category must be one of: Tech, Music, Art, Sports, Business, Education, Other. Return the response as a plain JSON object with keys "name", "description", and "category", without any additional text or code blocks.`
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const generatedText = response.data.candidates[0].content.parts[0].text;
            console.log('Generated text:', generatedText);

            let jsonString;
            if (generatedText.startsWith('{') && generatedText.endsWith('}')) {
                jsonString = generatedText;
            } else {
                const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
                if (match) {
                    jsonString = match[1].trim();
                } else {
                    throw new Error('Invalid response format');
                }
            }

            const generatedData = JSON.parse(jsonString);
            setFormData((prev) => ({
                ...prev,
                name: generatedData.name || '',
                description: generatedData.description || '',
                category: generatedData.category || 'Other',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                location: 'Virtual',
                price: '0.05',
                totalTickets: 100,
                imageUrl: 'https://via.placeholder.com/500',
                canBeResold: true,
                royaltyPercent: 10,
            }));
        } catch (err) {
            console.error('Error generating event details:', err);
            setError('Failed to generate event details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) {
            alert('Please connect your wallet to create an event');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const { name, totalTickets, price, canBeResold, royaltyPercent } = formData;

            // Parse and validate inputs
            const numTickets = parseInt(totalTickets.toString(), 10);
            const ticketPrice = parseFloat(price);
            const royalty = parseInt(royaltyPercent.toString(), 10);

            if (isNaN(numTickets) || numTickets <= 0) {
                throw new Error('Total tickets must be a positive number');
            }
            if (isNaN(ticketPrice) || ticketPrice <= 0) {
                throw new Error('Price must be a positive number');
            }
            if (isNaN(royalty) || royalty < 0 || royalty > 100) {
                throw new Error('Royalty percent must be between 0 and 100');
            }
            const date = new Date();
            const timeInSeconds = Math.floor(date.getTime() / 1000);

            // Call the blockchain function
            await createEvent(
                numTickets,
                ticketPrice,
                canBeResold,
                royaltyPercent,
                name,
                name.substring(0, 3).toUpperCase(),
                timeInSeconds,
                address,
            );

            alert('Event created successfully on the blockchain!');
            navigate('/my-events');
        } catch (error) {
            console.error('Error creating event:', error);
            setError('Failed to create event on the blockchain. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
            {/* Background Grid */}
            <div className="fixed inset-0 -z-10 opacity-5">
                <div className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill="none" stroke="%23D1D5DB" stroke-width="1"%3E%3Cpath d="M0 0h40v40H0z"/%3E%3Cpath d="M0 0h40M0 40h40M0 0v40M40 0v40"/%3E%3C/g%3E%3C/svg%3E')]`} />
            </div>
            {/* Floating Blobs */}
            <div className="fixed inset-0 -z-5 overflow-hidden">
                <motion.div
                    className="absolute w-64 h-64 rounded-full bg-purple-300 blur-3xl"
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    style={{ top: '10%', left: '5%', opacity: 0.2 }}
                />
                <motion.div
                    className="absolute w-80 h-80 rounded-full bg-indigo-400 blur-3xl"
                    animate={{ x: [0, -70, 0], y: [0, 100, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    style={{ top: '40%', right: '10%', opacity: 0.15 }}
                />
            </div>

            <div className="container mx-auto px-6 py-24">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Create New Event
                    </span>
                </motion.h1>

                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <span className="text-lg font-medium text-gray-700">Manual Creation</span>
                        <div className="relative inline-block w-12 align-middle select-none">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={useAI}
                                onChange={() => setUseAI(!useAI)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                style={{
                                    left: useAI ? '24px' : '0',
                                    borderColor: useAI ? '#6D28D9' : '#D1D5DB',
                                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
                                }}
                            />
                            <label
                                htmlFor="toggle"
                                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                style={{ backgroundColor: useAI ? '#8B5CF6' : '#D1D5DB' }}
                            ></label>
                        </div>
                        <span className="text-lg font-medium text-gray-700">AI-Assisted</span>
                    </div>

                    {useAI && (
                        <motion.div
                            className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100 relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-3xl"></div>
                            <h3 className="text-lg font-bold text-indigo-600 mb-2">AI Event Generator</h3>
                            <p className="text-gray-600 mb-4">Describe your event idea, and our AI will generate the details for you.</p>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                rows={3}
                                placeholder="e.g. A two-day blockchain workshop for beginners"
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                            ></textarea>
                            <button
                                type="button"
                                className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-800 transition-colors duration-300 flex items-center justify-center"
                                onClick={handleAIGenerate}
                                disabled={loading || !aiPrompt}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </span>
                                ) : 'Generate Event Details'}
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    placeholder="Enter event name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    placeholder="Describe your event"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 font-medium mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                                <svg className="absolute left-3 top-10 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 font-medium mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
                                    placeholder="Virtual or physical location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                                <svg className="absolute left-3 top-10 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 font-medium mb-2">Ticket Price (ETH)</label>
                                <input
                                    type="text"
                                    name="price"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
                                    placeholder="0.05"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                                <svg className="absolute left-3 top-10 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Total Tickets</label>
                                <input
                                    type="number"
                                    name="totalTickets"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    placeholder="100"
                                    value={formData.totalTickets}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Category</label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Music">Music</option>
                                    <option value="Art">Art</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Business">Business</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Event Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    placeholder="https://..."
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Can Be Resold</label>
                                <input
                                    type="checkbox"
                                    name="canBeResold"
                                    checked={formData.canBeResold}
                                    onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Royalty Percent</label>
                                <input
                                    type="number"
                                    name="royaltyPercent"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
                                    placeholder="10"
                                    value={formData.royaltyPercent}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-bold hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Event...
                                        </span>
                                    ) : 'Create Event'}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateEvent;