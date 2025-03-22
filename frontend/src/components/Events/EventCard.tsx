/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Event } from '../Types/Event.Types';

interface EventCardProps {
    event: Event;
    onEventSelect: (event: Event) => void; // New prop to trigger modal
    }

    const EventCard = ({ event, onEventSelect }: EventCardProps) => {
    // Calculate percentage of tickets sold
    const soldPercentage = ((event.totalTickets - event.ticketsAvailable) / event.totalTickets) * 100;

    return (
        <motion.div
        onClick={() => onEventSelect(event)} // Call onEventSelect instead of navigating
        whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group border border-gray-100"
        >
        <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gray-300 animate-pulse">
            <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 shadow-md">
            {event.category}
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition">{event.name}</h3>

            <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

            <span className="mx-2">•</span>

            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
            </div>

            <p className="text-gray-600 mb-6 line-clamp-2 text-sm">{event.description}</p>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="font-bold text-indigo-700">{event.price} ETH</div>

            <div className="text-xs text-gray-500">
                <div className="mb-1">{event.ticketsAvailable}/{event.totalTickets} available</div>
                <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${soldPercentage}%` }}
                ></div>
                </div>
            </div>
            </div>
        </div>
        </motion.div>
    );
};

export default EventCard;