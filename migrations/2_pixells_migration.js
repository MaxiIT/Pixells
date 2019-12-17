const Pixells = artifacts.require("Pixells");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Pixells).then(function(instance){
    instance.buyPixel(22,22,"blue", {value: 1000, from: accounts[0]});
  });
};

