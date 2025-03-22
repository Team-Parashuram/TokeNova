import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    price: string;
    ticketsAvailable: number;
    totalTickets: number;
    imageUrl: string;
    organizer: string;
    category: string;
    }

    const MyEvents = () => {
    const { address } = useAccount();
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address) {
        setLoading(false);
        return;
        }

        const fetchMyEvents = async () => {
        try {
            // Mock data for demonstration
            const mockEvents: Event[] = [
            {
                id: '1',
                name: 'Ethereum Developer Conference',
                description: 'Join us for the biggest Ethereum developer event of the year.',
                date: '2025-04-15',
                location: 'Virtual',
                price: '0.1',
                ticketsAvailable: 350,
                totalTickets: 500,
                imageUrl: 'https://via.placeholder.com/500',
                organizer: address,
                category: 'Tech',
            },
            {
                id: '2',
                name: 'NFT Workshop Series',
                description: 'Learn how to create and sell your own NFT art.',
                date: '2025-05-10',
                location: 'Virtual',
                price: '0.05',
                ticketsAvailable: 45,
                totalTickets: 50,
                imageUrl: 'https://via.placeholder.com/500',
                organizer: address,
                category: 'Education',
            },
            ];

            setEvents(mockEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
        };

        fetchMyEvents();
    }, [address]);

    if (!address) {
        return (
        <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-gray-500 mb-4">Please connect your wallet to view your events</p>
            <button
            className="bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors duration-300"
            onClick={() => navigate('/')}
            >
            Go Home
            </button>
        </div>
        );
    }

    return (
        <motion.div
        className="container mx-auto px-4 py-8 bg-gradient-to-r from-white to-purple-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
            <button
            className="bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors duration-300"
            onClick={() => navigate('/create-event')}
            >
            + Create New Event
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading your events...</p>
            </div>
        ) : events.length > 0 ? (
            <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.2 } },
            }}
            >
            {events.map((event) => (
                <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.02 }}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                >
                <div className="flex flex-col md:flex-row">
                    <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full md:w-64 h-48 object-cover"
                    />
                    <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                    <p className="text-gray-600 mb-2">
                        {event.date} • {event.location}
                    </p>
                    <p className="text-gray-500 mb-4">{event.ticketsAvailable} of {event.totalTickets} tickets available</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors duration-300"
                        onClick={() => navigate(`/event/${event.id}`)}
                        >
                        View Details
                        </button>
                        <button
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => navigate(`/edit-event/${event.id}`)}
                        >
                        Edit Event
                        </button>
                    </div>
                    </div>
                </div>
                </motion.div>
            ))}
            </motion.div>
        ) : (
            <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't created any events yet</p>
            <button
                className="bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors duration-300"
                onClick={() => navigate('/create-event')}
            >
                Create Your First Event
            </button>
            </div>
        )}
        </motion.div>
    );
};

export default MyEvents;
