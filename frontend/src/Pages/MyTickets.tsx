
const MyTickets = () => {
    const tickets = [
        {
            id: '1',
            eventId: '1',
            userId: '1',
            quantity: 2,
            total: 100,
            eventName: 'Tech Conference',
            eventDate: '2025-04-15',
            eventLocation: 'Virtual',
        },
        {
            id: '2',
            eventId: '2',
            userId: '1',
            quantity: 1,
            total: 50,
            eventName: 'NFT Art Exhibition',
            eventDate: '2025-04-22',
            eventLocation: 'New York, NY',
        }
    ]
    return (
        <>
            <h1>My Tickets</h1>
            {/* Add user's ticket details (for all the events they have booked) here */}
            <ul>
                {/* Map through user's tickets and display them here */}
                {tickets.map(ticket => (
                    <li key={ticket.id} className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">{ticket.eventName}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(ticket.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {ticket.eventLocation}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">${ticket.total}</p>
                            <p className="text-sm text-gray-500">{ticket.quantity} Ticket(s)</p>
                        </div>
                    </li>
                ))}
            </ul>
            

        </>
    )
}

export default MyTickets