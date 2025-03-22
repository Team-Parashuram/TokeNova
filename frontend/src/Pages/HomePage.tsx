import { useState, useEffect } from 'react';
import EventCard from "../components/Events/EventCard"

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

const HomePage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        // Replace with your actual data fetching logic
        const fetchEvents = async () => {
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
                organizer: '0x1234...5678',
                category: 'Tech'
            },
            {
                id: '2',
                name: 'NFT Art Exhibition',
                description: 'Exclusive exhibition featuring works from top NFT artists.',
                date: '2025-04-22',
                location: 'New York, NY',
                price: '0.05',
                ticketsAvailable: 120,
                totalTickets: 150,
                imageUrl: 'https://via.placeholder.com/500',
                organizer: '0xabcd...efgh',
                category: 'Art'
            },
            // Add more mock events as needed
            ];
            
            setEvents(mockEvents);
            
            // Extract unique categories
            const uniqueCategories = ['All', ...new Set(mockEvents.map(event => event.category))];
            setCategories(uniqueCategories);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
        };

        fetchEvents();
    }, []);

    const filteredEvents = selectedCategory === 'All' 
        ? events 
        : events.filter(event => event.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Discover Events</h1>
            <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
                <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                    ? 'bg-purple-700 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
                >
                {category}
                </button>
            ))}
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading events...</p>
            </div>
        ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12">
            <p className="text-gray-500">No events found in this category.</p>
            </div>
        )}
        </div>
    );
    };

export default HomePage;