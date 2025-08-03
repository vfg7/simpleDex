require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", //versao do solidity
  settings:{
  //   evmVersion: 'london' //versao do evm
    optimizer:{
      enabled:true,
      runs: 200
    }
  },
  defaultNetwork: "hardhat",
  networks:{
    hardhat: {}, //local built in
    sepolia :{
      url:process.env.ALCHEMY_API_URL, 
      accounts: [process.env.PRIVATE_KEY], //private key
    },  
    localhost: {
      url:"http://127.0.0.1:8545"
    }

  }
};
