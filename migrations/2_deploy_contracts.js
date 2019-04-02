const TestToken = artifacts.require("TestToken");

module.exports = function(deployer) {
  deployer.deploy(TestToken, 990000000);
};
