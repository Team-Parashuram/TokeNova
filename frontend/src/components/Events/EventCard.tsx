import { useNavigate } from 'react-router-dom';
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

    const EventCard = ({ event }: { event: Event }) => {
    const navigate = useNavigate();

    return (
        <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        onClick={() => navigate(`/event/${event.id}`)}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.3 }}
        >
        <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
            <p className="text-gray-600 mb-2">
            {event.date} • {event.location}
            </p>
            <p className="text-gray-500 mb-4 line-clamp-2">{event.description}</p>
            <div className="flex justify-between items-center">
            <span className="text-purple-700 font-bold">{event.price} ETH</span>
            <span className="text-gray-500 text-sm">
                {event.ticketsAvailable}/{event.totalTickets} available
            </span>
            </div>
        </div>
        </motion.div>
    );
};

export default EventCard;
