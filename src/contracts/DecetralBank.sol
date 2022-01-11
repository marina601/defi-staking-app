pragma solidity ^0.5.16;

import './RWD.sol';
import './Tether.sol';

// creating a contract for migrations
contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }
    
    //staking function
    function depositTokens(uint _amount) public {

        //require staking amount to be greater then 0
        require(_amount > 0, 'amount cannot be 0');

    // transfer tether tokens to the contract address for staking
    tether.tranferFrom(msg.sender, address(this), _amount);

    //Update staking balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
    }

    //Update staking balance
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
    }

    // issue rewards
    function issueTokens() public {
        //require the owner to issue tokens
        require(msg.sender == owner, 'caller must be the owner');

        for(uint i =0; i < stakers.length; i++) {
            address recipients = stakers[i];
            uint balance = stakingBalance[recipients] / 9; // devide by 9 to create percentage insentive
            if(balance > 0){
                rwd.transfer(recipients, balance);
            }
        }
    }

}