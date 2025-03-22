import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";
import EventCreatorModule from "./EventCreator";

export default buildModule("EventModule", (m) => {
  const deployer = m.getAccount(0);
  console.log(deployer)

  // Deploy User contract first
  const userContract = m.contract("User", []);

  // Deploy EventCreator
  const eventCreator = m.useModule(EventCreatorModule).eventCreator;

  const numTickets = 100;
  const price = ethers.parseEther("0.05");
  const canBeResold = true;
  const royaltyPercent = 5;
  const eventName = "Blockchain Music Festival";
  const eventSymbol = "BMF";

  // Call createEvent and pass userContract
  const eventContract = m.contract("Event", [
    deployer,
    numTickets,
    price,
    canBeResold,
    royaltyPercent,
    eventName,
    eventSymbol,
    userContract, // Pass User contract address
  ]);

  return { userContract, eventContract };
});
