pragma solidity >=0.4.21 <0.6.0;

contract TestToken {
	// Constructor
	// Set the total nuber of tokens
	// Red the total number of tokens
	uint256 public totalSupply;

	constructor(uint256 _initialSupply) public {
		totalSupply = _initialSupply;
	}
}