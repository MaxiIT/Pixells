// Mocha Unit Testing
const Pixells = artifacts.require("Pixells");
const truffleAssert = require("truffle-assertions");

contract("Pixells", async function(accounts){
    
    // buyPixel function unit testing series
    it("shouldn't be possible to buy a pixel which is out of range", async function(){
        let instance = await Pixells.deployed();
        await truffleAssert.fails(instance.buyPixel(-13,13,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(42,1337,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(0,8,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.buyPixel(8,0,"blue", {value: 1000}), truffleAssert.ErrorType.REVERT);
    }); 
    it("shouldn't be possible to purchase a pixel without enought payment", async function(){
        let instance = await Pixells.deployed();
        await truffleAssert.fails(instance.buyPixel(11,11, "red", {value: 500, from:accounts[2]}), truffleAssert.ErrorType.REVERT);
        await instance.buyPixel(66,66,"blue", {value:1000, from:accounts[1]});
        await truffleAssert.fails(instance.buyPixel(66,66, "red", {value: 1000, from:accounts[2]}), truffleAssert.ErrorType.REVERT);
        await instance.buyPixel(66,66,"green", {value:5000, from:accounts[2]});
        await truffleAssert.fails(instance.buyPixel(66,66,"blue",{value: 2500, from:accounts[1]}), truffleAssert.ErrorType.REVERT);
    });
    it("should be possible to purchase a pixel with enought payment", async function(){
        let instance = await Pixells.deployed();
        await truffleAssert.passes(instance.buyPixel(11,11, "green", {value: 1000, from:accounts[2]}));
        await truffleAssert.passes(instance.buyPixel(11,11, "blue", {value: 1500, from:accounts[3]}));
    });   
    // setColor function unit testing series
    it("shouldn't be possible to change the pixel color without being the pixel owner", async function(){
        let instance = await Pixells.deployed();
        await instance.buyPixel(33,33,"green", {value: 1000, from: accounts[2]});
        await truffleAssert.fails(instance.setColor(33,33,"purple", {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setColor(33,33,"purple", {from: accounts[1]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setColor(33,33,"purple", {from: accounts[3]}), truffleAssert.ErrorType.REVERT);
    });        
    it("should be possible to change the pixel color form the pixel owner", async function(){
        let instance = await Pixells.deployed();
        await instance.buyPixel(44,44,"green", {value: 1000, from: accounts[2]});
        await truffleAssert.passes(instance.setColor(44,44,"purple", {from: accounts[2]}));
    });
    it("should set the color of pixel correctly", async function(){     // for later it should be just possible to set html or css colore code
        let instance = await Pixells.deployed();
        await instance.buyPixel(55,55,"green", {value: 1000, from: accounts[2]});
        await instance.setColor(55,55,"purple", {from: accounts[2]});
        const {0: PixelAddress, 1: PixelPrice, 2: PixelColor} = await instance.getPixel(55,55);
        assert(PixelColor === "purple", "Pixel Color should be purple in this test");
    });

    // setPrice function unit testing series
    it("shouldn't be possible to change the pixel price without being the pixel owner", async function(){
        let instance = await Pixells.new();
        await truffleAssert.fails(instance.setPrice(33,33,5000, {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
        await truffleAssert.fails(instance.setPrice(33,33,5000, {from: accounts[1]}), truffleAssert.ErrorType.REVERT);
    });
    it("should be possible to change the pixel color form the pixel owner", async function(){
        let instance = await Pixells.deployed();
        await truffleAssert.passes(instance.setColor(33,33,"purple", {from: accounts[2]}));
        await truffleAssert.passes(instance.setColor(44,44,"purple", {from: accounts[2]}));
    });

    // withdrawAll function unit testing series

});