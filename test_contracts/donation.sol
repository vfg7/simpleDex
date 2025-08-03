// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Donations {
//     address public owner;
//     address[] public donors;
//     uint256 public total;

//     event donationsReceived(address indexed doador, uint256 valor);
//     event Withdraws(address indexed para, uint256 valor);

//     modifier ownerOnly() {
//         require(msg.sender == owner, "Owner only");
//         _;
//     }

//     constructor() {
//         owner = msg.sender;
//     }

//     receive() external payable {
//         require(msg.value > 0, "value must be bigger than zero");
//         donors.push(msg.sender);
//         total += msg.value;
//         emit donationsReceived(msg.sender, msg.value);
//     }

//     function resgatar() external ownerOnly {
//         uint256 valor = address(this).balance;
//         require(valor > 0, "no funds");

//         (bool sucess, ) = payable(owner).call{value: valor}("");
//         require(sucess, "withdraw fail");

//         emit Withdraws(owner, valor);
//     }

//     function getDonors() external view returns (address[] memory) {
//         return donors;
//     }
// }