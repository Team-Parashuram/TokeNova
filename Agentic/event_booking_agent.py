import os
import json
from typing import List, Dict, Any, Tuple, Optional
import re
from web3 import Web3
from dotenv import load_dotenv
import google.generativeai as genai
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Configure Web3
WEB3_PROVIDER_URI = os.getenv("WEB3_PROVIDER_URI", "http://localhost:8545")
web3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER_URI))

# Load contract ABIs from files or define them directly
# For simplicity, we're using the contract code to extract ABIs
# In production, you should load these from compiled JSON files
EVENT_CREATOR_ADDRESS = os.getenv("EVENT_CREATOR_ADDRESS")

# ABI for EventCreator and Event contracts
# These would typically be loaded from JSON files
EVENT_CREATOR_ABI = [
    {"inputs": [], "name": "getEvents", "outputs": [{"type": "address[]"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"type": "uint256"}], "name": "events", "outputs": [{"type": "address"}], "stateMutability": "view", "type": "function"}
]

EVENT_ABI = [
    {"inputs": [], "name": "name", "outputs": [{"type": "string"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "symbol", "outputs": [{"type": "string"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "price", "outputs": [{"type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "numTicketsLeft", "outputs": [{"type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "stage", "outputs": [{"type": "uint8"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "buyTicket", "outputs": [], "stateMutability": "payable", "type": "function"}
]

class EventBookingAgent:
    def __init__(self):
        """Initialize the event booking agent with necessary configurations."""
        self.model = genai.GenerativeModel('gemini-1.5-pro')
        self.event_creator_contract = web3.eth.contract(
            address=EVENT_CREATOR_ADDRESS,
            abi=EVENT_CREATOR_ABI
        )
        self.user_wallet = None
        self.conversation_history = []
        
    def _add_to_history(self, role: str, content: str):
        """Add a message to the conversation history."""
        self.conversation_history.append({"role": role, "content": content})
        
    async def chat(self, user_input: str):
        """Process user input and generate a response."""
        self._add_to_history("user", user_input)
        
        # Analyze the user input to determine intent
        intent = await self._determine_intent(user_input)
        
        if intent == "greet":
            response = "Hello! I'm your event booking assistant. I can help you find and book tickets for events. What kind of event are you looking for?"
        
        elif intent == "book_event":
            # Extract event details from user query
            event_details = await self._extract_event_details(user_input)
            if not event_details or not event_details.get('event_type'):
                response = "Could you please tell me more about the event you're interested in? For example, the name, type, or date of the event."
            else:
                # Search for available events
                available_events = await self._search_events(event_details)
                if not available_events:
                    response = "I couldn't find any events matching your criteria. Could you try with different details?"
                else:
                    # Format events for display
                    events_display = self._format_events_for_display(available_events)
                    response = f"I found the following events that match your criteria:\n\n{events_display}\n\nWhich event would you like to book tickets for? Please specify by number or name."
        
        elif intent == "select_event":
            # Extract which event the user selected
            selected_event = await self._extract_selected_event(user_input)
            if not selected_event:
                response = "I'm not sure which event you're referring to. Could you please specify the event number or name?"
            else:
                # Get ticket details for the selected event
                event_address = selected_event.get('address')
                ticket_details = await self._get_ticket_details(event_address)
                
                response = (f"You've selected: {selected_event.get('name')}\n\n"
                           f"Price per ticket: {Web3.from_wei(ticket_details.get('price', 0), 'ether')} ETH\n"
                           f"Tickets available: {ticket_details.get('tickets_left', 0)}\n\n"
                           f"How many tickets would you like to purchase?")
        
        elif intent == "purchase_tickets":
            # Extract number of tickets
            num_tickets, event_address = await self._extract_ticket_purchase_details(user_input)
            
            if not num_tickets or not event_address:
                response = "I'm not sure how many tickets you want to purchase or for which event. Could you please clarify?"
            else:
                # Check if user has connected wallet
                if not self.user_wallet:
                    response = "To purchase tickets, I'll need you to connect your Ethereum wallet. Would you like to connect your wallet now?"
                else:
                    # Proceed with ticket purchase
                    purchase_result = await self._purchase_tickets(event_address, num_tickets)
                    if purchase_result.get('success'):
                        response = f"Great! I've purchased {num_tickets} ticket(s) for you. Your transaction hash is: {purchase_result.get('tx_hash')}"
                    else:
                        response = f"I'm sorry, there was an issue with your purchase: {purchase_result.get('error')}"
        
        elif intent == "connect_wallet":
            # Logic to connect wallet (in a real scenario, this would use a wallet provider)
            wallet_address = await self._connect_wallet(user_input)
            if wallet_address:
                self.user_wallet = wallet_address
                response = f"I've connected your wallet with address {wallet_address[:6]}...{wallet_address[-4:]}. Now we can proceed with ticket purchases."
            else:
                response = "I couldn't connect your wallet. Please provide a valid Ethereum address or connect through a wallet provider."
        
        else:
            response = "I'm your event booking assistant. I can help you find and book tickets for events. What kind of event are you looking for?"
        
        self._add_to_history("assistant", response)
        return response
    
    async def _determine_intent(self, user_input: str) -> str:
        """Determine the user's intent from their input."""
        prompt = f"""
        Analyze the following user input and determine the intent:
        
        User input: "{user_input}"
        
        Choose one of the following intents:
        - greet: User is greeting or starting a conversation
        - book_event: User wants to book tickets for an event
        - select_event: User is selecting a specific event from a list
        - purchase_tickets: User wants to purchase a specific number of tickets
        - connect_wallet: User is providing wallet information
        - other: None of the above
        
        Return only the intent name without any explanation.
        """
        
        response = await self.model.generate_content(prompt)
        intent = response.text.strip().lower()
        
        # Normalize the intent
        if "greet" in intent:
            return "greet"
        elif "book_event" in intent:
            return "book_event"
        elif "select_event" in intent:
            return "select_event"
        elif "purchase_tickets" in intent:
            return "purchase_tickets"
        elif "connect_wallet" in intent:
            return "connect_wallet"
        else:
            return "other"
    
    async def _extract_event_details(self, user_input: str) -> Dict[str, Any]:
        """Extract event details from user input."""
        prompt = f"""
        Extract event details from the following user input:
        
        User input: "{user_input}"
        
        Extract the following information if present:
        - event_type: Type of event (concert, conference, sports, etc.)
        - event_name: Specific name of the event if mentioned
        - date: Date or time period of the event
        - location: Location of the event
        - preferred_price: Any price preferences mentioned
        
        Format the output as a JSON object with these fields. Use null for missing values.
        """
        
        response = await self.model.generate_content(prompt)
        try:
            # Extract JSON from the response
            json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                return json.loads(json_str)
            return {}
        except:
            return {}
        
    """Uncomment the second _search_events when you want to test things out"""
    
    # async def _search_events(self, event_details: Dict[str, Any]) -> List[Dict[str, Any]]:
    #     """Search for events matching the given criteria."""
    #     # In a real application, this would query the blockchain for events
    #     # For this example, we'll simulate fetching events from the smart contract
    #     try:
    #         # Get all event addresses from the EventCreator contract
    #         event_addresses = self.event_creator_contract.functions.getEvents().call()
            
    #         available_events = []
    #         for address in event_addresses:
    #             event_contract = web3.eth.contract(address=address, abi=EVENT_ABI)
                
    #             # Get event details
    #             event_name = event_contract.functions.name().call()
    #             event_stage = event_contract.functions.stage().call()
    #             tickets_left = event_contract.functions.numTicketsLeft().call()
    #             price = event_contract.functions.price().call()
                
    #             # Only include active events with available tickets
    #             if event_stage == 1 and tickets_left > 0:  # 1 is the Active stage
    #                 event_info = {
    #                     'address': address,
    #                     'name': event_name,
    #                     'price': price,
    #                     'tickets_left': tickets_left
    #                 }
                    
    #                 # Filter based on event details if provided
    #                 if self._event_matches_criteria(event_info, event_details):
    #                     available_events.append(event_info)
            
    #         return available_events
            
    #     except Exception as e:
    #         print(f"Error searching events: {e}")
    #         return []
        
    async def _search_events(self, event_details: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Search for events matching the given criteria using mock data."""
        from mock_data import MOCK_EVENTS
        
        # Filter based on criteria
        filtered_events = []
        for event in MOCK_EVENTS:
            if self._event_matches_criteria(event, event_details):
                filtered_events.append(event)
        
        return filtered_events
    
    def _event_matches_criteria(self, event_info: Dict[str, Any], criteria: Dict[str, Any]) -> bool:
        """Check if an event matches the given criteria."""
        # In a real implementation, this would do more sophisticated matching
        # For this example, we'll do a simple name-based match if event_name is provided
        if criteria.get('event_name') and criteria['event_name'] not in event_info['name'].lower():
            return False
            
        # Add more sophisticated matching logic here
        
        return True
    
    def _format_events_for_display(self, events: List[Dict[str, Any]]) -> str:
        """Format events for display to the user."""
        if not events:
            return "No events found."
            
        result = ""
        for i, event in enumerate(events, 1):
            result += (f"{i}. {event['name']}\n"
                      f"   Price: {Web3.from_wei(event['price'], 'ether')} ETH\n"
                      f"   Available tickets: {event['tickets_left']}\n\n")
        
        return result.strip()
    
    async def _extract_selected_event(self, user_input: str) -> Optional[Dict[str, Any]]:
        """Extract which event the user selected."""
        # This would maintain context of previously shown events and match user selection
        # For this example, we'll simulate this by parsing the input for an event number or name
        
        # In a real implementation, you would have stored the events shown to the user
        # and would reference them here
        try:
            # Extract event number
            number_match = re.search(r'(\d+)', user_input)
            if number_match:
                event_num = int(number_match.group(1))
                # You would look up the event at this index from previously shown events
                # For this example, we'll return a dummy event
                return {
                    'address': '0x123456789abcdef123456789abcdef123456789a', 
                    'name': f'Event {event_num}'
                }
            
            # Extract event name
            # In a real implementation, you would match against the names of previously shown events
            event_name_match = re.search(r'(?:book|select|purchase)(?:\s+tickets?\s+for)?\s+(.*?)(?:\s+event|\s+concert|\s+show|$)', user_input, re.IGNORECASE)
            if event_name_match:
                event_name = event_name_match.group(1).strip()
                # You would look up the event by this name from previously shown events
                # For this example, we'll return a dummy event
                return {
                    'address': '0x123456789abcdef123456789abcdef123456789a',
                    'name': event_name
                }
            
            return None
        except Exception as e:
            print(f"Error extracting selected event: {e}")
            return None
    
    async def _get_ticket_details(self, event_address: str) -> Dict[str, Any]:
        """Get ticket details for a specific event."""
        try:
            event_contract = web3.eth.contract(address=event_address, abi=EVENT_ABI)
            
            price = event_contract.functions.price().call()
            tickets_left = event_contract.functions.numTicketsLeft().call()
            
            return {
                'price': price,
                'tickets_left': tickets_left
            }
        except Exception as e:
            print(f"Error getting ticket details: {e}")
            return {'price': 0, 'tickets_left': 0}
    
    async def _extract_ticket_purchase_details(self, user_input: str) -> Tuple[int, str]:
        """Extract ticket purchase details from user input."""
        # Extract number of tickets
        num_tickets_match = re.search(r'(\d+)\s+ticket', user_input)
        num_tickets = int(num_tickets_match.group(1)) if num_tickets_match else None
        
        # In a real implementation, you would extract the event from context
        # For this example, we'll use a dummy event address
        event_address = '0x123456789abcdef123456789abcdef123456789a'
        
        return num_tickets, event_address
    
    async def _connect_wallet(self, user_input: str) -> Optional[str]:
        """Connect user's Ethereum wallet."""
        # In a real implementation, this would use a wallet provider API
        # For this example, we'll extract an Ethereum address if provided
        eth_address_match = re.search(r'0x[a-fA-F0-9]{40}', user_input)
        if eth_address_match:
            return eth_address_match.group(0)
        else:
            # Simulating a connected wallet
            return '0xuser123456789abcdef123456789abcdef1234567'
    
    async def _purchase_tickets(self, event_address: str, num_tickets: int) -> Dict[str, Any]:
        """Purchase tickets for a specific event."""
        try:
            event_contract = web3.eth.contract(address=event_address, abi=EVENT_ABI)
            
            # Get ticket price
            price = event_contract.functions.price().call()
            total_price = price * num_tickets
            
            # Check tickets availability
            tickets_left = event_contract.functions.numTicketsLeft().call()
            if tickets_left < num_tickets:
                return {
                    'success': False,
                    'error': f"Not enough tickets available. Only {tickets_left} left."
                }
            
            # In a real implementation, this would execute the transaction
            # For this example, we'll simulate a successful purchase
            tx_hash = f"0x{''.join(['0123456789abcdef'[hash(f'{datetime.now()}') % 16] for _ in range(64)])}"
            
            return {
                'success': True,
                'tx_hash': tx_hash,
                'num_tickets': num_tickets,
                'total_price': Web3.from_wei(total_price, 'ether')
            }
        except Exception as e:
            print(f"Error purchasing tickets: {e}")
            return {
                'success': False,
                'error': str(e)
            }

# Example usage
async def main():
    agent = EventBookingAgent()
    
    # Simulating a conversation
    responses = []
    
    # User starts conversation
    user_input = "Hi, I'm looking for concert tickets"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # User provides more details
    user_input = "I want to book tickets for the Taylor Swift concert next weekend"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # User selects an event
    user_input = "I'd like to book event number 2"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # User specifies number of tickets
    user_input = "I want to buy 3 tickets"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # User connects wallet
    user_input = "Yes, connect my wallet 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # User confirms purchase
    user_input = "Yes, complete the purchase of 3 tickets"
    response = await agent.chat(user_input)
    responses.append(("User", user_input))
    responses.append(("Agent", response))
    
    # Print the conversation
    for role, message in responses:
        print(f"{role}: {message}\n")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())