import { buyTicket } from "@/web-3/blockchain";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Event } from "../Types/Event.types";
import { useAccount } from "wagmi";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
  const { address } = useAccount();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBuyClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmBuy = async () => {
    if (!address) return;

    try {
      const buyData = await buyTicket(address, event.id, event.price);
      console.log(buyData);
      setShowConfirmation(false);
      toast.success("The ticket has been booked.");
    } catch (error) {
      console.error("Error buying ticket:", error);
      toast.error("Failed to book ticket. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelBuy = () => {
    setShowConfirmation(false);
  };

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
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-48 object-cover"
          />
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
              <p>
                {event.ticketsAvailable}/{event.totalTickets}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Organizer</p>
              <p>{event.organizer}</p>
            </div>
            <div className="relative">
              <Button onClick={handleBuyClick}>Buy</Button>

              {showConfirmation && (
                <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10 w-64">
                  <p className="mb-2">Do you want to continue to buy?</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleConfirmBuy}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCancelBuy}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      No
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetailsModal;
