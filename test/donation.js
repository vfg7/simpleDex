// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Donations", function () {
//   let Donations, donations, owner, addr1, addr2;

//   beforeEach(async function () {
//     [owner, addr1, addr2] = await ethers.getSigners();
//     Donations = await ethers.getContractFactory("Donations");
//     donations = await Donations.deploy();
//     await donations.deployed();
//   });

//   it("deve definir o deployer como owner", async function () {
//     expect(await donations.owner()).to.equal(owner.address);
//   });

//   it("deve aceitar doações e atualizar total e doadores", async function () {
//     await addr1.sendTransaction({
//       to: donations.address,
//       value: ethers.utils.parseEther("1"),
//     });

//     expect(await donations.total()).to.equal(ethers.utils.parseEther("1"));

//     const donors = await donations.getDonors();
//     expect(donors.length).to.equal(1);
//     expect(donors[0]).to.equal(addr1.address);
//   });

//   it("não permite doar 0 ether", async function () {
//     await expect(
//       addr1.sendTransaction({
//         to: donations.address,
//         value: 0,
//       })
//     ).to.be.revertedWith("value must be bigger than zero");
//   });

//   it("permite que o dono resgate os fundos", async function () {
//     const valor = ethers.utils.parseEther("2");

//     await addr1.sendTransaction({ to: donations.address, value: valor });

//     const balanceBefore = await ethers.provider.getBalance(owner.address);
//     const tx = await donations.connect(owner).resgatar();
//     const receipt = await tx.wait();
//     const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

//     const balanceAfter = await ethers.provider.getBalance(owner.address);
//     expect(balanceAfter).to.be.closeTo(
//       balanceBefore.add(valor).sub(gasUsed),
//       ethers.utils.parseEther("0.001")
//     );
//   });

//   it("não permite que não-donos resgatem fundos", async function () {
//     await addr1.sendTransaction({
//       to: donations.address,
//       value: ethers.utils.parseEther("1"),
//     });

//     await expect(donations.connect(addr1).resgatar()).to.be.revertedWith("Owner only");
//   });

//   it("falha se não houver fundos no resgate", async function () {
//     await expect(donations.resgatar()).to.be.revertedWith("no funds");
//   });
// });
