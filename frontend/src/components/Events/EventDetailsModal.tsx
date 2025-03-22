import { motion } from 'framer-motion';

interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    time: string;
    price: string;
    ticketsAvailable: number;
    totalTickets: number;
    imageUrl: string;
    organizer: string;
    category: string;
    calllback: any;
    }

    interface EventDetailsModalProps {
    event: Event;
    onClose: () => void;
    }

    const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
    return (
        <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close modal when clicking outside
        >
        <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="relative">
            <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
            <button
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
                onClick={onClose}
            >
                ✕
            </button>
            </div>
            <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{event.date}</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>{event.location}</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Time</p>
                <p>{event.time}</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Price</p>
                <p>{event.price} ETH</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Tickets Available</p>
                <p>{event.ticketsAvailable}/{event.totalTickets}</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Organizer</p>
                <p>{event.organizer}</p>
                </div>
            </div>
            </div>
        </motion.div>
        </motion.div>
    );
};

export default EventDetailsModal;