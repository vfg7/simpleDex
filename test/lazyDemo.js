// const {expect} = require("chai");
// const {ethers} = require("hardhat");

// describe("LazyDemo", function () {
//     let lazy;

//     beforeEach(async function () {
//         const LazyDemo = await ethers.getContractFactory("LazyDemo");
//         lazy = await LazyDemo.deploy();
//         await lazy.deployed();
//     });

// //scenario
//     it("should multiply correctly", async function () {
//         expect(await lazy.multiply(2, 3)).to.equal(6);
//         expect(await lazy.multiply(4, 0)).to.equal(0);
//     });
//     it("should fail on huge values", async function () {
//         await expect(lazy.multiply(1e18, 2)).to.be.revertedWith("Too big!");
//         await expect(lazy.multiply(2, 1e18)).to.be.revertedWith("Too big!");
//     });

// });
