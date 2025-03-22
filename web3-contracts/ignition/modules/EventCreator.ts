import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("EventCreatorModule", (m) => {
  const eventCreator = m.contract("EventCreator");

  return { eventCreator };
});
