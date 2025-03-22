import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AppModule", (m) => {
  const appContract = m.contract("App");

  return { appContract };
});
