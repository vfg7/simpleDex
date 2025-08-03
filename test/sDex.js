// const {expect} = require("chai");
// const {ethers} = require("hardhat");

// describe("SimpleDEX", function () {
//     let dex, owner, addr1;
//     beforeEach(async() => {
//         [owner, addr1] = await ethers.getSigners();
//         const DEX = await ethers.getContractFactory("SimpleDEX");
//         dex = await DEX.deploy();
//         await dex.waitForDeployment();
//     });

//     it("deve criar ordem corretamente", async () => { //create order
//         await dex.createOrder(10,5); //10 ETH for 5 DAI
//         const ordem = await dex.getOrder(0);
//         expect(ordem[0]).to.equal(owner.address); //owner address
//         expect(ordem[1]).to.equal(10); //amount of ETH
//         expect(ordem[2]).to.equal(5); //amount of DAI
//     });
//     it("deve aumentar o ID da próxima order", async() => {
//         //testa order id
//         await dex.createOrder(1,1);
//         await dex.createOrder(2,2);
//         expect (await dex.nextOrderId()).to.equal(2); //next order id 
//     });
//     it("deve cancelar ordem do próprio dono", async () => {
//         //cancel
//         await dex.createOrder(3,3); 
//         await dex.cancelOrder(0); //cancel order 0
//         const ordem = await dex.getOrder(0);
//         expect(ordem[1]).to.equal(0); //should be empty
//     });
//     it("não deve permitir cancelar ordem de outro usuário", async () => {
//         //cancel order of another user
//         await dex.connect(addr1).createOrder(4,4); //addr1 creates order
//         await expect(dex.connect(owner).cancelOrder(0)).to.be.revertedWith("Not owner of order");
//     });
//     it("n deve criar ordem com valor zero", async () => {
//         //check null
//         await expect(dex.createOrder(0,0)).to.be.revertedWith("Invalid order amount");
//     });
// });