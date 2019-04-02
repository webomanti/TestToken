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
			assert.equal(totalSupply.toNumber(), 990000000, 'sets the total supply to 10,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 990000000, 'it allocates initial supply to admin account')
		});
	});


	it('transfers token ownership', function() {
    	return TestToken.deployed().then(function(instance) {
      		tokenInstance = instance;
      		return tokenInstance.transfer.call(accounts[1], 99999999999);
      	}).then(assert.fail).catch(function(error) {
     		assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
     		return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
		}).then(function(success){
			assert.equal(success, true, "returns true");
      		return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs from account');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs to account');
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the amoutnt');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, 'adds the amaunt to the reciveing account: '+ accounts[1]+"\n");
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 989750000, 'deducts the amount from the sending account: '+accounts[0]+"\n");
		});
	});

});
