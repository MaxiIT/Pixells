pragma solidity 0.5.12;

contract Ownable {

    address public contractOwner;

//** Constructor Section */
    constructor() public{
        contractOwner = msg.sender;
    }
//** Modifier Section */
// Only Owner of the Contract can execute the function modifier
    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "You are not entitled to execute this function.");
        _;
    }
//** Setter Function Section */
    function transferOwnership(address newOwner) public onlyContractOwner {
        require(newOwner != address(0));
        contractOwner = newOwner;
    }

}