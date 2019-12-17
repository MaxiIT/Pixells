//Open Ganache and Link the new project with the truffle-config.js file, save and restart
// >> truffle migrate

import"./Ownable.sol";
import"./Destroyable.sol";

pragma solidity 0.5.12;

contract Pixells is Ownable, Destroyable {

    uint public ContractBalance;

//** Events */
    event Purchase (address pixelOwner, uint pixelPrice, string pixelColor, uint x, uint y);
    event ColorChanged (address pixelOwner, string newPixelColor, uint x, uint y);
    event PriceChanged (address pixelOwner, uint newPixelPrice, uint x, uint y);

//** State variable Declaration */
	struct Pixel {
		address pixelOwner;
		uint pixelPrice;
		string pixelColor;
	}

	mapping (uint => mapping (uint => Pixel)) private canvas;
    mapping (address => uint) public pixelOwnerPixelCount;

// Set Canvas Dimension in Pixel
	uint maxWidth_x = 1000;
	uint maxHeight_y = 1000;

//** Modifiers */
// Only Owner of the Pixel can execute the function modifier
    modifier onlyPixelOwner(uint x, uint y) {
        require(msg.sender == canvas[x][y].pixelOwner, "You are not the owner of the pixel.");
        _;
    }
// Check critera of Pixel coordinates modifier
    modifier isPixel(uint x, uint y) {
        require(x > 0 && y > 0 && x <= maxWidth_x && y <= maxHeight_y, "Pixel coordinates are out of range.");
        _;
    }
// Minimum price modifier for payable functions
    modifier costs(uint amount){
        require(msg.value >= amount);
        _;
    }

//** Private helper Functions */
// Function to Purchase Pixel
    function pixelPurchase(uint x, uint y, string memory color) private {
        pixelOwnerPixelCount[canvas[x][y].pixelOwner]--;
        pixelOwnerPixelCount[msg.sender]++;
        canvas[x][y] = Pixel({pixelOwner: msg.sender, pixelPrice: msg.value, pixelColor: color});
        emit Purchase(msg.sender, msg.value, color, x, y);
    }

//** Setter Functions */
// Function to buy a Pixel from Contract
	function buyPixel(uint x, uint y, string memory color) public payable costs(1000) isPixel(x,y) {
        require (msg.value > canvas[x][y].pixelPrice, "Pixel price is higher.");
        require (msg.sender != canvas[x][y].pixelOwner, "You already own this pixel.");

        if (canvas[x][y].pixelPrice == 0){
            ContractBalance += msg.value;
            pixelPurchase(x,y, color);

        }
        else if  (canvas[x][y].pixelPrice > 0){
            address payable oldPixelOwnerPayable = address(uint160(canvas[x][y].pixelOwner));
            oldPixelOwnerPayable.transfer(msg.value);
            pixelPurchase(x,y, color);
        }
        assert(msg.sender == canvas[x][y].pixelOwner);
	}

// Function to set Pixel Color
    function setColor(uint x, uint y, string memory newColor) public onlyPixelOwner(x,y) {
        canvas[x][y].pixelColor = newColor;
        emit ColorChanged(msg.sender, newColor, x, y);
    }
// Function to set Pixel Price
    function setPrice(uint x, uint y, uint newPrice) public onlyPixelOwner(x,y) {
        require(newPrice > 0, "The price of your Pixel must be greater than 0.");
        canvas[x][y].pixelPrice = newPrice;
        emit PriceChanged(msg.sender, newPrice, x, y);
    }
// Function to Withdraw Funds
    function withdrawAll() public onlyContractOwner returns(uint){
        uint toTransfer = ContractBalance;
        ContractBalance = 0;
        msg.sender.transfer(toTransfer);
        return toTransfer;
    }

//** Getter Functions */
// Function to check current settings of a specific Pixel
	function getPixel(uint x, uint y) public view isPixel(x,y) returns(address, uint, string memory) {
		return (canvas[x][y].pixelOwner, canvas[x][y].pixelPrice, canvas[x][y].pixelColor);
	}
// Function to get the Balance of the Contract
    function getBalance() public view returns (address, uint, uint) {
        return (address(this), address(this).balance, ContractBalance);
    }

}
