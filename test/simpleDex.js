const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleDEX", function () {
  let owner, user;
  let tokenA, tokenB, dex;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const TokenA = await ethers.getContractFactory("TokenA");
    const TokenB = await ethers.getContractFactory("TokenB");
    tokenA = await TokenA.deploy();
    tokenB = await TokenB.deploy();

    const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
    dex = await SimpleDEX.deploy(tokenA.target, tokenB.target);

    // Owner aprova DEX para transferir tokens
    await tokenA.approve(dex.target, ethers.parseEther("1000"));
    await tokenB.approve(dex.target, ethers.parseEther("1000"));
  });

  it("deve transferir tokenA para usuário usando transferTo()", async () => {
    // Owner envia tokens para o contrato, então envia para o user
    await tokenA.transfer(dex.target, ethers.parseEther("100"));
    await dex.transferTo(tokenA.target, user.address, ethers.parseEther("10"));

    const balance = await tokenA.balanceOf(user.address);
    expect(balance).to.equal(ethers.parseEther("10"));
  });

  it("deve adicionar liquidez com sucesso", async () => {
    await expect(dex.addLiquidity(
      ethers.parseEther("100"),
      ethers.parseEther("200")
    )).to.emit(dex, "LiquidityAdded");
  });

  it("deve fazer swap de A por B com sucesso", async () => {
    // Owner adiciona liquidez
    await dex.addLiquidity(ethers.parseEther("100"), ethers.parseEther("200"));

    // Owner envia tokens para user para simular operação
    await tokenA.transfer(user.address, ethers.parseEther("10"));
    await tokenA.connect(user).approve(dex.target, ethers.parseEther("10"));

    await expect(dex.connect(user).swapAforB(ethers.parseEther("10")))
      .to.emit(dex, "Swapped");

    const balanceB = await tokenB.balanceOf(user.address);
    expect(balanceB).to.be.gt(0);
  });
});
