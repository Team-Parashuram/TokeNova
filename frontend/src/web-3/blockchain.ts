/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

import EventCreatorABI from "@/../../web3-contracts/artifacts/contracts/EventCreator.sol/EventCreator.json";
import EventABI from "@/../../web3-contracts/artifacts/contracts/Event.sol/Event.json";
import UserABI from "@/../../web3-contracts/artifacts/contracts/User.sol/User.json";

const EVENT_CREATOR_CONTRACT_ADDRESS = import.meta.env
  .VITE_EVENT_CREATOR_CONTRACT_ADDRESS;
const USER_CONTRACT_ADDRESS = import.meta.env.VITE_USER_CONTRACT_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;

if (!EVENT_CREATOR_CONTRACT_ADDRESS || !USER_CONTRACT_ADDRESS || !RPC_URL) {
  throw new Error("Missing required environment variables");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);

const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error("No Web3 provider found");
  }
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  return await provider.getSigner(0);
};

//EventCreator
export const createEvent = async (
  numTickets: number,
  price: number,
  canBeResold: boolean,
  royaltyPercent: number,
  eventName: string,
  eventSymbol: string,
  eventDate: number, // Unix timestamp
  eventPlace: string
) => {
  try {
    const signer = await getSigner();

    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI.abi,
      signer
    );

    const tx = await eventCreatorContract.createEvent(
      numTickets,
      price,
      canBeResold,
      royaltyPercent,
      eventName,
      eventSymbol,
      USER_CONTRACT_ADDRESS,
      eventDate,
      eventPlace
    );

    await tx.wait();
    console.log("Event created successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

export const getAllEvents = async () => {
  try {
    const signer = await getSigner();

    // EventCreator contract instance
    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI.abi,
      signer
    );

    const creators = await eventCreatorContract.getAllCreators();

    if (creators.length === 0) {
      return [];
    }

    // Collect all events from all creators
    const allEvents = await Promise.all(
      creators.map(async (creatorAddress: string) => {
        const eventAddresses = await eventCreatorContract.getCreatorEvents(
          creatorAddress
        );

        // Fetch details for each event
        return Promise.all(
          eventAddresses.map(async (eventAddress: string) => {
            const eventContract = new ethers.Contract(
              eventAddress,
              EventABI.abi,
              signer
            );
            const details = await eventContract.getEventDetails();
            return {
              address: eventAddress,
              owner: details[0],
              numTickets: Number(details[1]),
              numTicketsLeft: Number(details[2]),
              price: ethers.formatEther(details[3]), // Convert wei to ether
              royaltyPercent: Number(details[4]),
              canBeResold: details[5],
              stage: Number(details[6]),
              name: details[7],
              symbol: details[8],
            };
          })
        );
      })
    );

    return allEvents.flat(); // Flatten nested arrays
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events.");
  }
};

export const getCreatorEvents = async (creatorAddress: string) => {
  try {
    const signer = await getSigner();

    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI.abi,
      provider
    );

    // Fetch events created by this creator
    const eventAddresses = await eventCreatorContract.getCreatorEvents(
      creatorAddress
    );

    if (eventAddresses.length === 0) {
      return [];
    }

    // Fetch event details
    const events = Promise.all(
      eventAddresses.map(async (eventAddress: string) => {
        const eventContract = new ethers.Contract(
          eventAddress,
          EventABI.abi,
          signer
        );
        const details = await eventContract.getEventDetails();
        return {
          address: eventAddress,
          owner: details[0],
          numTickets: Number(details[1]),
          numTicketsLeft: Number(details[2]),
          price: ethers.formatEther(details[3]), // Convert wei to ether
          royaltyPercent: Number(details[4]),
          canBeResold: details[5],
          stage: Number(details[6]),
          name: details[7],
          symbol: details[8],
        };
      })
    );

    return events;
  } catch (error) {
    console.error(
      `Error fetching events for creator ${creatorAddress}:`,
      error
    );
    throw new Error("Failed to fetch creator events.");
  }
};

//Event
export const buyTicket = async (eventAddress: string, ticketPrice: number) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const signer = await getSigner();
  const userAddress = await signer.getAddress();

  const eventContract = new ethers.Contract(eventAddress, EventABI.abi, signer);
  console.log(signer);
  try {
    const tx = await eventContract.buyTicket({
      value: ethers.parseEther(ticketPrice.toString()),
    });

    await tx.wait();
    console.log("Ticket purchased successfully:", tx.hash);

    let ticketID;

    console.log("Receipt logs:", tx.logs);
    for (const log of tx.logs) {
      try {
        const parsedLog = eventContract.interface.parseLog(log);
        console.log("Parsed log:", parsedLog);
        if (parsedLog?.name === "TicketPurchased") {
          console.log("TicketPurchased event found:", parsedLog);
          ticketID = parsedLog?.args.ticketID;
          console.log("Extracted ticketID:", ticketID);
          break;
        }
      } catch (e) {
        console.log(`Error parsing log: ${e}`);
      }
    }

    console.log("Adding ticket to user record:", {
      userAddress,
      eventAddress,
      ticketID,
      USER_CONTRACT_ADDRESS,
    });

    await addUserTicket(
      userAddress,
      eventAddress,
      ticketID,
      USER_CONTRACT_ADDRESS
    );
    return tx.hash;
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw new Error("Ticket purchase failed");
  }
};

export const buyTicketFromUser = async (
  eventAddress: string,
  ticketID: number,
  resalePrice: number
) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

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

export const setTicketToUsed = async (
  eventAddress: string,
  ticketID: number
) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

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
  const signer = await getSigner();

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
  const signer = await getSigner();

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
  const signer = await getSigner();

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
  const signer = await getSigner();

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

  const eventContract = new ethers.Contract(
    eventAddress,
    EventABI.abi,
    provider
  );

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
  userContractAddress: string
) => {
  if (!userAddress || !eventContract || ticketID === undefined) {
    throw new Error("Invalid input parameters");
  }
  const signer = await getSigner();

  const userContract = new ethers.Contract(
    userContractAddress,
    UserABI.abi,
    signer
  );

  try {
    const tx = await userContract.addTicket(
      userAddress,
      eventContract,
      ticketID
    );
    await tx.wait(); // Wait for transaction confirmation

    console.log(`Ticket added successfully: ${ticketID}`);
    return tx;
  } catch (error) {
    console.error("Error adding ticket:", error);
    throw new Error("Failed to add ticket");
  }
};

export const getUserTickets = async (
  userAddress: string,
  userContractAddress: string
) => {
  if (!userAddress) {
    throw new Error("User address is required");
  }

  console.log("Fetching tickets for user:", userAddress);
  console.log("Using User contract:", userContractAddress);

  const signer = await getSigner();
  const userContract = new ethers.Contract(
    userContractAddress,
    UserABI.abi,
    signer
  );

  try {
    const tickets = await userContract.getTickets(userAddress);
    console.log("Raw tickets data:", tickets);

    return tickets.map((ticket: any) => ({
      eventContract: ticket.eventContract,
      ticketID: Number(ticket.ticketID),
    }));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw new Error("Failed to fetch tickets");
  }
};
