import"./Ownable.sol";

pragma solidity 0.5.12;

contract Destroyable is Ownable{

// Option to destroy the contract
    function DESTROY() public onlyContractOwner {
        selfdestruct(msg.sender);
    }

}

// What it means to destoy a contract: https://articles.caster.io/blockchain/self-destructing-smart-contracts-in-ethereum/