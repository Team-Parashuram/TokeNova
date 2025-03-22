// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./EventCreator.sol";
import "./User.sol";

contract App {
    struct UserProfile {
        address userAddress;
        bool isRegistered;
    }

    struct CreatorProfile {
        address creatorAddress;
        bool isRegistered;
        address eventContract;
    }

    mapping(address => UserProfile) public users;
    mapping(address => CreatorProfile) public creators;

    uint public totalUsers;
    uint public totalCreators;

    event UserRegistered(address indexed user);
    event CreatorRegistered(address indexed creator, address eventContract);

    /**
     * @notice Register as a user
     */
    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");

        users[msg.sender] = UserProfile(msg.sender, true);
        totalUsers++;

        emit UserRegistered(msg.sender);
    }

    /**
     * @notice Register as an event creator
     */
    function registerCreator(address eventContract) external {
        require(!creators[msg.sender].isRegistered, "Creator already registered");

        creators[msg.sender] = CreatorProfile(msg.sender, true, eventContract);
        totalCreators++;

        emit CreatorRegistered(msg.sender, eventContract);
    }

    /**
     * @notice Check if an address is a registered user
     */
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }

    /**
     * @notice Check if an address is a registered creator
     */
    function isCreatorRegistered(address creator) external view returns (bool) {
        return creators[creator].isRegistered;
    }
}
