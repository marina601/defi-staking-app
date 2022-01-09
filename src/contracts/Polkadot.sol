pragma solidity ^0.5.16;

contract Polkadot {

    string public name = 'Polkadot Mock Token';
    string public symbol = 'USD';
    uint256 totalSupply = 1000000000000000000000; // 1 million tokens
    uint8 decimals = 18;
    uint256 public balances = 500000000000000000000; // how mnay coins are in circulation
}