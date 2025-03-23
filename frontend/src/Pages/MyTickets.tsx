import { useState, useEffect } from "react";
import { getUserTickets, getEventDetails } from "@/web-3/blockchain";
import { useAccount } from "wagmi";

const MyTickets = () => {
  const { address } = useAccount();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!address) return;
      
      try {
        setLoading(true);
        // Get the user's tickets
        const userTickets = await getUserTickets(address);
        console.log(userTickets);
        // Fetch additional event details for each ticket
        const ticketsWithDetails = await Promise.all(
          userTickets.map(async (ticket) => {
            const eventDetails = await getEventDetails(ticket['eventContract']);
            return {
              id: `${ticket.eventContract}-${ticket.ticketID}`,
              ticketID: ticket.ticketID,
              eventContract: ticket.eventContract,
              eventName: eventDetails.name,
              eventDate: new Date().getTime(), // You'll need to add this to your event details
              eventLocation: "Event Location", // You'll need to add this to your event details
              total: eventDetails.price,
              quantity: 1 // Assuming each ticket is for 1 person
            };
          })
        );
        
        setTickets(ticketsWithDetails);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [address]);

  if (loading) {
    return <div>Loading your tickets...</div>;
  }

  if (tickets.length === 0) {
    return <div>You don't have any tickets yet.</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
      <ul className="divide-y divide-gray-200">
        {tickets.map(ticket => (
          <li key={ticket.id} className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{ticket.eventName}</h2>
              <p className="text-sm text-gray-500">
                {new Date(ticket.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {ticket.eventLocation}
              </p>
              <p className="text-xs mt-1">Ticket #{ticket.ticketID}</p>
            </div>
            <div>
              <p className="text-lg font-bold">${ticket.total}</p>
              <p className="text-sm text-gray-500">{ticket.quantity} Ticket(s)</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyTickets;