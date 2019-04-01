pragma solidity >=0.4.21 <0.6.0;

contract TestToken {
	string public name = "TestToken";
	string public symbol = "TETO";
	string public standard = "TestToken v1.0";
	uint256 public totalSupply;
	mapping(address => uint256) public balanceOf;

	constructor(uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        //balanceOf[msg.sender] -= _value;
        //balanceOf[_to] += _value;
        //Transfer(msg.sender, _to, _value);
        return true;
	}
}
