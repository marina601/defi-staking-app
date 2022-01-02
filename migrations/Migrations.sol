pragma solidity '^0.5.0';

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
    function set_completed(uint completed) public restricted {
        last_completed_migration = completed;
    }

    // upgrade function
    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.set_completed(last_completed_migration);
    }
}