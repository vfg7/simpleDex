require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// CONFIGS
const ALCHEMY_URL = process.env.ALCHEMY_API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const DEX_ADDRESS = "0xbA9924A6478035442d4090732f05Be8944E5030f";
const TOKEN_A = "0xA0d4C122de5EDE857F5b829Fa906320A828B01E9";
const TOKEN_B = "0xEaE77bc017637dc218F627029E7054e20d53760f";

// provedor
const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ✅ ABIs
const dexABI = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../artifacts/contracts/SimpleDEX.sol/SimpleDEX.json")
  )
).abi;

const erc20ABI = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json")
  )
).abi;

//  contratos
const dex = new ethers.Contract(DEX_ADDRESS, dexABI, wallet);
const tokenA = new ethers.Contract(TOKEN_A, erc20ABI, wallet);
const tokenB = new ethers.Contract(TOKEN_B, erc20ABI, wallet);

async function main() {
  console.log("test SimpleDEX");

  const amountA = ethers.parseEther("100");
  const amountB = ethers.parseEther("200");

  console.log(" tokens");
  await (await tokenA.approve(DEX_ADDRESS, amountA)).wait();
  await (await tokenB.approve(DEX_ADDRESS, amountB)).wait();

  //  addLiquidity 
  console.log(" addLiquidity...");
  await (await dex.addLiquidity(amountA, amountB)).wait();

  //  preço de A e B
  const priceA = await dex.getPrice(TOKEN_A);
  const priceB = await dex.getPrice(TOKEN_B);
  console.log(`Price Token A: ${ethers.formatEther(priceA)} B`);
  console.log(`Price Token B: ${ethers.formatEther(priceB)} A`);

  // transferências via interface
  console.log("Transfering token A.");
  await (await dex.transferTo(TOKEN_A, wallet.address, ethers.parseEther("1"))).wait();

  console.log(" swap A → B...");
  const swapAmount = ethers.parseEther("10");
  await (await tokenA.approve(DEX_ADDRESS, swapAmount)).wait();
  await (await dex.swapAforB(swapAmount)).wait();

  console.log(" swap B → A...");
  await (await tokenB.approve(DEX_ADDRESS, swapAmount)).wait();
  await (await dex.swapBforA(swapAmount)).wait();

  // ✅ Consultar saldos via getBalance
  const balanceA = await dex.getBalance(TOKEN_A, wallet.address);
  const balanceB = await dex.getBalance(TOKEN_B, wallet.address);
  console.log(`blaance Token A: ${ethers.formatEther(balanceA)}`);
  console.log(`balance Token B: ${ethers.formatEther(balanceB)}`);

  console.log("Routine end successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
});
