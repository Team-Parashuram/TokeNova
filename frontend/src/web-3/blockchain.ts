/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { useAccount } from 'wagmi';

import EventCreatorABI from "@/../../web3-contracts/artifacts/contracts/EventCreator.sol/EventCreator.json";
import EventABI from "@/../../web3-contracts/artifacts/contracts/Event.sol/Event.json";
import UserABI from "@/../../web3-contracts/artifacts/contracts/User.sol/User.json";
import AppABI from "@/../../web3-contracts/artifacts/contracts/App.sol/App.json";

const APP_CONTRACT_ADDRESS = import.meta.env.VITE_APP_CONTRACT_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;

if (!APP_CONTRACT_ADDRESS) {
  throw new Error("Missing environment variables for contract addresses");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = await provider.getSigner(0); // 0 is the first Hardhat account

// App Contract endpoints
export const registerUser = async (signer: ethers.Signer) => {
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, signer);

  try {
    const tx = await contract.registerUser();
    await tx.wait(); // Wait for confirmation
    console.log("User registered successfully!");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export const registerCreator = async (eventContract: string) => {
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, signer);

  try {
    const tx = await contract.registerCreator(eventContract);
    await tx.wait(); // Wait for transaction confirmation
    console.log(" Event creator registered successfully:", tx.hash);
  } catch (error) {
    console.error(" Error registering event creator:", error);
    throw new Error("Failed to register event creator");
  } 
};

export const isUserRegistered = async (userAddress: string): Promise<boolean> => {
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, signer);

  try {
    const isRegistered = await contract.isUserRegistered(userAddress);
    console.log(`User ${userAddress} is registered:`, isRegistered);
    return isRegistered;
  } catch (error) {
    console.error(" Error checking user registration:", error);
    throw new Error("Failed to check user registration");
  }
};

export const isCreatorRegistered = async (creatorAddress: string): Promise<boolean> => {
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, signer);

  try {
    const isRegistered = await contract.isCreatorRegistered(creatorAddress);
    console.log(`Creator ${creatorAddress} is registered:`, isRegistered);
    return isRegistered;
  } catch (error) {
    console.error(" Error checking creator registration:", error);
    throw new Error("Failed to check creator registration");
  }
};

//EventCreator
export const createEvent = async (
  numTickets: number,
  price: number,
  canBeResold: boolean,
  royaltyPercent: number,
  eventName: string,
  eventSymbol: string
) => {
  const userAddress = useAccount();

  // Fetch the event creator contract assigned to the user from the App contract
  const appContract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, provider);
  
  try {
    const creatorProfile = await appContract.creators(userAddress);
    const eventCreatorAddress = creatorProfile.eventContract;

    if (!eventCreatorAddress) {
      throw new Error("No EventCreator contract assigned to user");
    }

    // Use the user's mapped event creator contract
    const eventCreatorContract = new ethers.Contract(eventCreatorAddress, EventCreatorABI.abi, signer);

    const tx = await eventCreatorContract.createEvent(
      numTickets,
      price,
      canBeResold,
      royaltyPercent,
      eventName,
      eventSymbol,
      APP_CONTRACT_ADDRESS
    );

    await tx.wait(); // Wait for confirmation
    console.log(" Event created successfully:", tx.hash);
  } catch (error) {
    console.error(" Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

export const getAllEvents = async () => {
  // Fetch the event creator contract assigned to the user from the App contract
  const appContract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppABI.abi, provider);
  
  try {
    const creatorProfiles = await appContract.getAllCreators();
    
    if (creatorProfiles.length == 0) {
      throw new Error("No Event Creators exist");
    }

    creatorProfiles(async (creator: { eventContract: string }) => {
      const eventCreatorAddress = creator.eventContract;
      const eventCreatorContract = new ethers.Contract(eventCreatorAddress, EventCreatorABI.abi, provider);
  
      const events = await eventCreatorContract.getEvents();
      console.log(" Retrieved events:", events);
  
      return events;
    })
    
  } catch (error) {
    console.error(" Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

//Event
export const buyTicket = async (eventAddress: string, ticketPrice: number) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  // Create a contract instance for the Event
  const eventContract = new ethers.Contract(
    eventAddress,
    EventABI.abi,
    signer
  );

  try {
    const tx = await eventContract.buyTicket({
      value: ethers.parseEther(ticketPrice.toString()),
    });

    await tx.wait();
    console.log("Ticket purchased successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw new Error("Ticket purchase failed");
  }
};

export const buyTicketFromUser = async (eventAddress: string, ticketID: number, resalePrice: number) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  // Create contract instance
  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.buyTicketFromUser(ticketID, {
      value: ethers.parseEther(resalePrice.toString()),
    });

    await tx.wait();
    console.log("Resale ticket purchased successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error buying resale ticket:", error);
    throw new Error("Resale ticket purchase failed");
  }
};

export const setTicketToUsed = async (eventAddress: string, ticketID: number) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  // Create contract instance
  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.setTicketToUsed(ticketID);
    await tx.wait();
    console.log("Ticket marked as used successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error marking ticket as used:", error);
    throw new Error("Failed to mark ticket as used");
  }
};

export const setTicketForSale = async (
  eventAddress: string,
  ticketID: number,
  resalePrice: number
): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  if (resalePrice <= 0) {
    throw new Error("Resale price must be greater than zero");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.setTicketForSale(ticketID, resalePrice);
    await tx.wait();
    console.log("Ticket listed for resale successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error setting ticket for sale:", error);
    throw new Error("Failed to set ticket for sale");
  }
};

export const withdrawFunds = async (eventAddress: string): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.withdraw();
    await tx.wait();
    console.log("Withdrawal successful:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error during withdrawal:", error);
    throw new Error("Failed to withdraw funds");
  }
};

export const approveBuyer = async (
  eventAddress: string,
  buyer: string,
  ticketID: number
): Promise<string> => {
  if (!eventAddress || !buyer) {
    throw new Error("Event address and buyer address are required");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.approveAsBuyer(buyer, ticketID);
    await tx.wait();
    console.log("Buyer approved successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error approving buyer:", error);
    throw new Error("Failed to approve buyer");
  }
};

export const setEventStage = async (
  eventAddress: string,
  newStage: number
): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);

  try {
    const tx = await eventContract.setStage(newStage);
    await tx.wait();
    console.log("Event stage changed successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error changing event stage:", error);
    throw new Error("Failed to change event stage");
  }
};

export const getEventDetails = async (eventAddress: string) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, provider);

  try {
    const details = await eventContract.getEventDetails();

    return {
      owner: details[0],
      numTickets: Number(details[1]),
      numTicketsLeft: Number(details[2]),
      price: Number(details[3]),
      royaltyPercent: Number(details[4]),
      canBeResold: details[5],
      stage: Number(details[6]), // Enum value
      name: details[7],
      symbol: details[8],
    };
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw new Error("Failed to fetch event details");
  }
};

//User
export const addUserTicket = async (
  userAddress: string,
  eventContract: string,
  ticketID: number,
  userContractAddress: string,
  signer: ethers.Signer
) => {
  if (!userAddress || !eventContract || ticketID === undefined) {
    throw new Error("Invalid input parameters");
  }

  const userContract = new ethers.Contract(userContractAddress, UserABI.abi, signer);

  try {
    const tx = await userContract.addTicket(userAddress, eventContract, ticketID);
    await tx.wait(); // Wait for transaction confirmation

    console.log(`Ticket added successfully: ${ticketID}`);
    return tx;
  } catch (error) {
    console.error("Error adding ticket:", error);
    throw new Error("Failed to add ticket");
  }
};

export const getUserTickets = async (userAddress: string, userContractAddress: string) => {
  if (!userAddress) {
    throw new Error("User address is required");
  }

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const userContract = new ethers.Contract(userContractAddress, UserABI.abi, provider);

  try {
    const tickets = await userContract.getTickets(userAddress);
    
    return tickets.map((ticket: any) => ({
      eventContract: ticket.eventContract,
      ticketID: Number(ticket.ticketID),
    }));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw new Error("Failed to fetch tickets");
  }
};