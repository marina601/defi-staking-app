pragma solidity ^0.5.16;

import './RWD.sol';
import './Tether.sol';

// creating a contract for migrations
contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }
}