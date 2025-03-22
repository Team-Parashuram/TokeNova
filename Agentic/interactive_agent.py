import asyncio
from event_booking_agent import EventBookingAgent

async def main():
    agent = EventBookingAgent()
    print("Event Booking Agent initialized. Type 'exit' to quit.")
    
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() == 'exit':
            break
            
        response = await agent.chat(user_input)
        print(f"Agent: {response}")

if __name__ == "__main__":
    asyncio.run(main())