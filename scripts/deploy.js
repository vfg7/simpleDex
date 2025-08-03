const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);

  // Deploy TokenA
  const TokenA = await ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy();
  await tokenA.waitForDeployment();
  console.log(`TokenA deployed at: ${tokenA.target}`);

  // Deploy TokenB
  const TokenB = await ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy();
  await tokenB.waitForDeployment();
  console.log(`TokenB deployed at: ${tokenB.target}`);

  // Deploy SimpleDEX
  const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
  const dex = await SimpleDEX.deploy(tokenA.target, tokenB.target);
  await dex.waitForDeployment();
  console.log(`SimpleDEX deployed at: ${dex.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
