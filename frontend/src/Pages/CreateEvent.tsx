import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

const CreateEvent = () => {
    const { address } = useAccount();
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
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAIGenerate = async () => {
        if (!aiPrompt) return;

        setLoading(true);
        setTimeout(() => {
        setFormData({
            name: 'AI Generated Event: ' + aiPrompt.slice(0, 20),
            description: `This is an AI-generated event based on: "${aiPrompt}". The event will feature activities and presentations related to this theme.`,
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
            location: 'Virtual',
            price: '0.05',
            totalTickets: 100,
            category: 'Other',
            imageUrl: 'https://via.placeholder.com/500',
        });
        setLoading(false);
        }, 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!address) {
        alert('Please connect your wallet to create an event');
        return;
        }

        setLoading(true);

        try {
        console.log('Creating event:', { ...formData, organizer: address });
        setTimeout(() => {
            alert('Event created successfully!');
            navigate('/my-events');
            setLoading(false);
        }, 2000);
        } catch (error) {
        console.error('Error creating event:', error);
        setLoading(false);
        }
    };

    return (
        <motion.div
        className="min-h-screen bg-gradient-to-r from-purple-50 to-white py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <div className="container mx-auto px-4">
            <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            >
            Create New Event
            </motion.h1>

            <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            >
            <div className="flex items-center space-x-4 mb-6">
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
                className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                >
                <label className="block text-gray-700 font-medium mb-2">
                    Describe your event and the AI will generate details
                </label>
                <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="e.g. A two-day blockchain workshop for beginners with hands-on coding sessions"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                ></textarea>
                <button
                    type="button"
                    className="mt-3 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors duration-300"
                    onClick={handleAIGenerate}
                    disabled={loading || !aiPrompt}
                >
                    {loading ? 'Generating...' : 'Generate Event Details'}
                </button>
                </motion.div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                    <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your event"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <input
                    type="text"
                    name="location"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Virtual or physical location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Ticket Price (ETH)</label>
                    <input
                    type="text"
                    name="price"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.05"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Total Tickets</label>
                    <input
                    type="number"
                    name="totalTickets"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800 transition-colors duration-300"
                    disabled={loading}
                    >
                    {loading ? 'Creating Event...' : 'Create Event'}
                    </button>
                </div>
                </div>
            </form>
            </motion.div>
        </div>
        </motion.div>
    );
};

export default CreateEvent;
