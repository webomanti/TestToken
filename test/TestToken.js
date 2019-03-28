var TestToken = artifacts.require("TestToken");

contract('TestToken', function(accounts) {

	it('sets the total supply upon deployment', function() {
		return TestToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 10000000, 
						'setst the total supply to 10,000,000');
		})
	});
})