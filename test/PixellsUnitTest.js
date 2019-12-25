// Mocha Unit Testing
const Pixells = artifacts.require("Pixells");
const truffleAssert = require("truffle-assertions");

contract("Pixells", async function(accounts){
    
    let instance;

    before(async function(){
        instance = await Pixells.deployed();
    });

    // buyPixel function unit testing series
    it("shouldn't be possible to buy a pixel which is out of range", async function(){
        await truffleAssert.fails(instance.buyPixel(-13,13,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(42,1337,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(0,8,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(8,0,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
    }); 
    it("shouldn't be possible to purchase a pixel without enought payment", async function(){
        await truffleAssert.fails(instance.buyPixel(111,111,"blue",{value: web3.utils.toWei("0.1","ether"), from:accounts[2]}), truffleAssert.ErrorType.REVERT);        
        await truffleAssert.fails(instance.buyPixel(111,111,"blue",{value: web3.utils.toWei("0.1","ether"), from:accounts[0]}), truffleAssert.ErrorType.REVERT);        
        await truffleAssert.fails(instance.buyPixel(11,11, "red", {value: web3.utils.toWei("0.05","ether"), from:accounts[2]}), truffleAssert.ErrorType.REVERT);
        await instance.buyPixel(222,222,"blue", {value: web3.utils.toWei("0.25","ether"), from:accounts[1]});
        await truffleAssert.fails(instance.buyPixel(222,222, "red", {value: web3.utils.toWei("0.2","ether"), from:accounts[2]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(222,222, "red", {value: web3.utils.toWei("0.2","ether"), from:accounts[0]}), truffleAssert.ErrorType.REVERT);
    });
    it("should be possible to purchase a pixel with enought payment", async function(){
        await truffleAssert.passes(instance.buyPixel(111,111, "green", {value: web3.utils.toWei("0.5","ether"), from:accounts[0]}));
        await truffleAssert.passes(instance.buyPixel(111,111, "green", {value: web3.utils.toWei("1","ether"), from:accounts[2]}));
        await truffleAssert.passes(instance.buyPixel(111,111, "green", {value: web3.utils.toWei("1.1","ether"), from:accounts[1]}));
    });   
    it("should transfer payment to contract address after new pixel purchase", async function(){
        //let instance = await Pixells.new();     
        let contractBalance_befor = await web3.eth.getBalance(Pixells.address);
        let buyerBalance_befor = await web3.eth.getBalance(accounts[1]);
        await instance.buyPixel(333,333,"green",{value: web3.utils.toWei("0.25","ether"), from:accounts[1]});
        let contractBalance_after = await web3.eth.getBalance(Pixells.address);
        let buyerBalance_after = await web3.eth.getBalance(accounts[1]);
        assert(parseInt(contractBalance_after) == parseInt(contractBalance_befor) + parseInt(web3.utils.toWei("0.25","ether")), "Missing Payment");
        assert(parseInt(buyerBalance_after) < parseInt(buyerBalance_befor), "Not possible dobble spend");
    });  
    it("should tranfer payment to old pixel owner after pixel rebuy", async function(){
        let instance = await Pixells.new();     
        await instance.buyPixel(333,333,"blue",{value: web3.utils.toWei("0.25","ether"), from:accounts[1]});
        let sellerBalance_befor = await web3.eth.getBalance(accounts[1]);
        let buyerBalance_befor = await web3.eth.getBalance(accounts[2]);
        await instance.buyPixel(333,333,"green",{value: web3.utils.toWei("0.5","ether"), from:accounts[2]});
        let sellersBalance_after = await web3.eth.getBalance(accounts[1]);
        let buyerBalance_after = await web3.eth.getBalance(accounts[2]);
        assert(parseInt(sellersBalance_after) > parseInt(sellerBalance_befor), "Missing Payment");
        assert(parseInt(buyerBalance_after) < parseInt(buyerBalance_befor), "Not possible dobble spend");
    });
    // setColor function unit testing series
    it("shouldn't be possible to change the pixel color without being the pixel owner", async function(){
        await truffleAssert.fails(instance.setColor(111,111,"purple", {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setColor(111,111,"purple", {from: accounts[2]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setColor(111,111,"purple", {from: accounts[3]}), truffleAssert.ErrorType.REVERT);
    });        
    it("should be possible to change the pixel color form the pixel owner", async function(){
        await truffleAssert.passes(instance.setColor(111,111,"green", {from: accounts[1]}));
    });
    it("should set the color of pixel correctly", async function(){     // for later it should be just possible to set html or css colore code
        await instance.setColor(111,111,"purple", {from: accounts[1]});
        const {0: PixelAddress, 1: PixelPrice, 2: PixelColor} = await instance.getPixel(111,111);
        assert(PixelColor === "purple", "Pixel Color should be purple in this test");
    });
    // setPrice function unit testing series
    it("shouldn't be possible to change the pixel price without being the pixel owner", async function(){
        await truffleAssert.fails(instance.setPrice(111,111,web3.utils.toWei("5","ether"), {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setPrice(111,111,web3.utils.toWei("5","ether"), {from: accounts[2]}), truffleAssert.ErrorType.REVERT);
    });
    it("should be possible to change the pixel price form the pixel owner", async function(){
        await truffleAssert.passes(instance.setPrice(111,111,web3.utils.toWei("0.1","ether"), {from: accounts[1]}));
    });
    it("shouldn't be possible to change the pixel price to a less than 0.1 ether", async function(){
        await truffleAssert.fails(instance.setPrice(111,111,web3.utils.toWei("0.05", "ether"), {from: accounts[1]}), truffleAssert.ErrorType.REVERT);
    });
    // withdrawAll function unit testing series
    it("shouldn't be possible to withdraw funds for non account owners", async function(){
        await truffleAssert.fails(instance.withdrawAll({from:accounts[1]}), truffleAssert.ErrorType.REVERT);
    }); 
    it("should be possible to withdraw funds for the account owner", async function(){
        await truffleAssert.passes(instance.withdrawAll({from:accounts[0]}));
    });
    it("should transfere funds to the contract owner address", async function(){
        let instance = await Pixells.new();
        await instance.buyPixel(111,111,"yellow",{value: web3.utils.toWei("0.1","ether"), from:accounts[1]});
        let oldOwnerBalance = await web3.eth.getBalance(accounts[0]);
        await instance.withdrawAll({from:accounts[0]});
        let newOwnerBalance = await web3.eth.getBalance(accounts[0]);
        assert(oldOwnerBalance < newOwnerBalance,"Where are the funds?");
        assert(await web3.eth.getBalance(Pixells.address) == 0);
    });
});