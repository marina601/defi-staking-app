pragma solidity ^0.5.16;

// creating a contract for migrations
contract Migrations {
    address public owner;
    uint public last_comleted_migrations;
    
    // setting the owner for the address
    constructor() public {
        owner = msg.sender;
    }
    
    // if this condition is met then continue
    modifier restricted() {
        if (msg.sender == owner) _;
    }
    
    // function to set the completed migration
    function setCompleted(uint completed) public restricted {
        last_comleted_migrations = completed;
    }

    // upgrade function
    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_comleted_migrations);
    }
}