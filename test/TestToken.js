var TestToken = artifacts.require("TestToken");

contract('TestToken', function(accounts) {
	it('initialize', function() {
		return TestToken.deployed().then(function(instance) {
			tokenInstance = instance	
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, "TestToken", "has correct  name");
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, "TETO", "has correct symbol");
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, "TestToken v1.0", "has correct standard");
		});
	});

	it('sets the total supply upon deployment', function() {
		return TestToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 10000000, 'sets the total supply to 10,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 10000000, 'it allocates initial supply to admin account')
		});
	});


	it('transfers token ownership', function() {
    	return TestToken.deployed().then(function(instance) {
      		tokenInstance = instance;
      		return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
      	}).then(assert.fail).catch(function(error) {
     		assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      		//return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
		});
	});

});
