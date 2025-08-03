const { JsonRpcProvider } = require("ethers");
require("dotenv").config();

// Connect to the Ethereum network
const provider = new JsonRpcProvider(process.env.ALCHEMY_API_URL);
async function main() {

// Get block by number
const blockNumber = "latest";
const block = await provider.getBlock(blockNumber);

console.log(block);
}

main().catch(console.error);