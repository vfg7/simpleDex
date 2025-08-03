// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IDex.sol";

contract SimpleDEX is IDex, ReentrancyGuard {
    address public owner;
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    event LiquidityAdded(uint256 amountA, uint256 amountB);
    event LiquidityRemoved(uint256 amountA, uint256 amountB);
    event Swapped(address indexed user, string direction, uint256 inputAmount, uint256 outputAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _tokenA, address _tokenB) {
        require(_tokenA != _tokenB, "Tokens must differ");
        require(_tokenA != address(0) && _tokenB != address(0), "Zero address");
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        owner = msg.sender;
    }

    // Interface methods
    function transferTo(address token, address to, uint256 value) external override returns (bool) {
        require(IERC20(token).transfer(to, value), "Transfer failed");
        return true;
    }

    function transferFrom(address token, address from, address to, uint256 value) external override returns (bool) {
        require(IERC20(token).transferFrom(from, to, value), "TransferFrom failed");
        return true;
    }

    function getBalance(address token, address user) external view override returns (uint256) {
        return IERC20(token).balanceOf(user);
    }

    // DEX-specific logic
    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner nonReentrant {
        require(amountA > 0 && amountB > 0, "Invalid amounts");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;

        emit LiquidityAdded(amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external onlyOwner nonReentrant {
        require(amountA <= reserveA && amountB <= reserveB, "Insufficient reserves");

        reserveA -= amountA;
        reserveB -= amountB;

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(amountA, amountB);
    }

    function swapAforB(uint256 amountAIn) external nonReentrant {
        require(amountAIn > 0, "Zero input");

        tokenA.transferFrom(msg.sender, address(this), amountAIn);
        uint256 amountBOut = getAmountOut(amountAIn, reserveA, reserveB);
        require(amountBOut > 0 && amountBOut < reserveB, "Invalid output");

        reserveA += amountAIn;
        reserveB -= amountBOut;

        tokenB.transfer(msg.sender, amountBOut);

        emit Swapped(msg.sender, "A -> B", amountAIn, amountBOut);
    }

    function swapBforA(uint256 amountBIn) external nonReentrant {
        require(amountBIn > 0, "Zero input");

        tokenB.transferFrom(msg.sender, address(this), amountBIn);
        uint256 amountAOut = getAmountOut(amountBIn, reserveB, reserveA);
        require(amountAOut > 0 && amountAOut < reserveA, "Invalid output");

        reserveB += amountBIn;
        reserveA -= amountAOut;

        tokenA.transfer(msg.sender, amountAOut);

        emit Swapped(msg.sender, "B -> A", amountBIn, amountAOut);
    }

    function getPrice(address _token) external view returns (uint256) {
        require(_token == address(tokenA) || _token == address(tokenB), "Unsupported token");
        if (_token == address(tokenA)) {
            return (reserveB * 1e18) / reserveA;
        } else {
            return (reserveA * 1e18) / reserveB;
        }
    }

    function getAmountOut(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) internal pure returns (uint256) {
        uint256 numerator = inputAmount * outputReserve;
        uint256 denominator = inputReserve + inputAmount;
        return numerator / denominator;
    }
}
