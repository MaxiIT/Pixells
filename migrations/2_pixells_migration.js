const Pixells = artifacts.require("Pixells");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Pixells).then(function(instance){
    instance.buyPixel(111,111,"blue", {value: web3.utils.toWei("0.1","ether"), from: accounts[1]}).then(function(){
      console.log("Person successfully created by " + accounts[1]);
      console.log("The contract address is " + Pixells.address);
    }).catch(function(err){
      console.log("error: " + err);
    });
  }).catch(function(err){
    console.log("Fail to deploy " + err);
  });
};

