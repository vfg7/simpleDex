// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDex {
    function transferTo(address token, address to, uint256 value) external returns (bool);
    function transferFrom(address token, address from, address to, uint256 value) external returns (bool);
    function getBalance(address token, address user) external view returns (uint256);
}
