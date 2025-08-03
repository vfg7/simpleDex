// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Imports ERC20  OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenA
 * @dev Token ERC20 testing DEX.
 */
contract TokenA is ERC20, Ownable{
    uint256 public constant initialSupply = 1_000_000 ether; // 1 million tokens
    constructor() ERC20("Token A", "TKNA") Ownable (msg.sender){
        _mint(msg.sender, initialSupply);
    }
    /**
     * @dev emit more if needed 
     * let's simulate liquidity.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "invalid address");
        require(amount > 0, "positive values only");
        _mint(to, amount);
    }
}
