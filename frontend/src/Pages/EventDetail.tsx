import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

    const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { address } = useAccount();

    useEffect(() => {
        // Replace with your actual data fetching logic
        const fetchEventDetails = async () => {
        try {
            // Mock data for demonstration
            const mockEvent: Event = {
            id: id || '1',
            name: 'Ethereum Developer Conference',
            description:
                'Join us for the biggest Ethereum developer event of the year with keynotes from Vitalik Buterin and other industry leaders. This two-day event will cover the latest developments in Ethereum, Layer 2 solutions, and emerging use cases.',
            date: '2025-04-15',
            location: 'Virtual',
            price: '0.1',
            ticketsAvailable: 350,
            totalTickets: 500,
            imageUrl: 'https://via.placeholder.com/800x400',
            organizer: '0x1234...5678',
            category: 'Tech',
            };

            setEvent(mockEvent);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching event details:', error);
            setLoading(false);
        }
        };

        fetchEventDetails();
    }, [id]);

    const handlePurchase = async () => {
        console.log(`Purchasing ${quantity} tickets for event ${id}`);
        alert(`Would mint ${quantity} NFT tickets for ${event?.name}`);
    };

    if (loading) {
        return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <p className="text-gray-500">Loading event details...</p>
        </div>
        );
    }

    if (!event) {
        return (
        <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-gray-500">Event not found</p>
        </div>
        );
    }

    return (
        <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
        <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-64 md:h-96 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            />
            <div className="p-6">
            <motion.h1
                className="text-3xl font-bold text-gray-800 mb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {event.name}
            </motion.h1>
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                </svg>
                <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })}
                </span>
                </div>
                <div className="flex items-center text-gray-600">
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                </svg>
                <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                </svg>
                <span>{event.category}</span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About This Event</h2>
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold text-purple-700">{event.price} ETH</h3>
                    <p className="text-gray-600">
                    {event.ticketsAvailable} / {event.totalTickets} tickets available
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                    <button
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                    -
                    </button>
                    <span className="bg-white px-4 py-1 border-t border-b">{quantity}</span>
                    <button
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
                    onClick={() =>
                        setQuantity(Math.min(event.ticketsAvailable, quantity + 1))
                    }
                    >
                    +
                    </button>
                </div>
                </div>
                <button
                className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800 transition-colors duration-300"
                onClick={handlePurchase}
                disabled={!address || event.ticketsAvailable < quantity}
                >
                {address
                    ? `Purchase Ticket${quantity > 1 ? 's' : ''}`
                    : 'Connect Wallet to Purchase'}
                </button>
                {!address && (
                <p className="text-center text-gray-500 mt-2 text-sm">
                    You need to connect your wallet first
                </p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Organizer</h2>
                <p className="text-gray-600">
                {event.organizer.slice(0, 6)}...{event.organizer.slice(-4)}
                </p>
            </div>
            </div>
        </motion.div>
        </motion.div>
    );
    };

export default EventDetail;
