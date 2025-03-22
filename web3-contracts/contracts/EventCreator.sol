// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Event.sol";

contract EventCreator {
    uint public TotalEvents = 0;

    Event[] public events;

    event CreateEvent(address _creator, address _event);

    /**
     * @notice Creates Events
     * @param _numTickets Number of tickets
     * @param _price Price per ticket
     * @param _canBeResold Are tickets allowed to be resold
     * @param _royaltyPercent Royalty percentage accrued by organizers on reselling of ticket
     * @param _eventName Name of the Ticket NFT
     * @param _eventSymbol Symbol for the Ticket NFT Token
     */
    function createEvent(
        uint256 _numTickets,
        uint256 _price,
        bool _canBeResold,
        uint256 _royaltyPercent,
        string memory _eventName,
        string memory _eventSymbol,
        address _userContract
    ) external returns (address newEvent) {
        // Create a new Event smart contract
        Event e = new Event(
            msg.sender,
            _numTickets,
            _price,
            _canBeResold,
            _royaltyPercent,
            _eventName,
            _eventSymbol,
            _userContract
        );
        events.push(e);
        TotalEvents++;

        // Store/return event address
        emit CreateEvent(msg.sender, address(e));

        return address(e);
    }

    function getEvents() external view returns (address[] memory) {
        address[] memory eventAddresses = new address[](TotalEvents);
        for (uint256 i = 0; i < events.length; i++) {
            eventAddresses[i] = address(events[i]);
        }
        return eventAddresses;
    }
}
