// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//somewhat the same as A
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// @title TokenB
contract TokenB is ERC20, Ownable {

    constructor() ERC20("TokenB", "TKNB") Ownable (msg.sender) {
        _mint(msg.sender, 1_000_000 ether);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "positive values only");
        _mint(to, amount);
    }
}



