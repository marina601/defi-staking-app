pragma solidity ^0.5.16;

contract RWD {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 totalSupply = 1000000000000000000000; // 1 million tokens
    uint8 decimals = 18;

    event Transfer(
        address _from,
        address _to,
        uint _value
    );

    event Approval(
        address _owner,
        address _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        // ensure the balance more than value
        require(balanceOf[msg.sender] >= _value);
        // transfer transaction which takes the value from message sender
        // adds the value to reciever account
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approval(address _spender, uint256 _value) public returns (bool success) {
        // approval function
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function tranferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        //conditions are set for value and allowance
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // add value to the address to
        balanceOf[_to] += _value;
        // take away the value from the address from 
        balanceOf[_from] -= _value;
        // take away from the allowance
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }


}


