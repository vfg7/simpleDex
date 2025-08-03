// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract sDEX{
//     struct Order{
//         address seller;
//         uint256 amount;
//         uint256 price;
//     }
//     mapping(uint256 => Order) public orders;
//     uint256 public nextOrderId;

//     function createOrder (uint256 amount, uint256 price) external {
//         require (amount > 0 && price > 0, "Invalid amount or price");
//         orders[nextOrderId] = Order(msg.sender, amount, price);
//         nextOrderId++;
//     }
//     function cancelOrder(uint256 orderId) external {
//         require(orders[orderId].seller == msg.sender, "Only the owner can cancel the order");
//         delete orders[orderId];
//     }
//     function getOrder(uint256 orderId) external view returns (address seller, uint256 amount, uint256 price) {
//         Order memory ord = orders[orderId];
//         return (ord.seller, ord.amount, ord.price);
//     }
// }
