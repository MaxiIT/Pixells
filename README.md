# Pixells

This is my first repository. As a newbie in programming and Git, I initiated Pixells as little project to learn about DApp development and how to use GitHub.

---

## Development Setup

### Requirements
1. Install Truffle: https://www.trufflesuite.com/docs/truffle/getting-started/installation
    ```
    npm install -g truffle
    ```
2. Install Ganache: https://www.trufflesuite.com/docs/ganache/quickstart

### Get Pixells project 
1. Download or clone the Git repository https://github.com/Pyrospy/Pixells
2. Locate and open the project file (extract the .zip file if necessary)
3. Open Ganache under "Contracts" and "Link Truffle Projects" with the "tuffle-config.js" file which is located in the project file => save and restart
4. Use the command line to navigate to the project file directory and migrate the project.
    ```
    cd ...\Pixells
    ```
    ```
    truffle migrate
    ```
### Interact with the Pixells contract functions
1. Use the command line 
    ```
    truffle console
    ```
2. Create a new instance
    ```
    let instance = await Pixells.deployed()
    ```
3. Look for functions you can interact within the Pixells.sol.
Here are some examples.
    ```
    instance.buyPixell(101, 202, "green", {value: 1000, from: YOUR_ADDRESS})
    ```
    or
    ```
    instance.getPixel(22,22)
    ```
4. Have Fun! Also, get experience with the 2_pixells_migration.js file.

---

## About Pixells

### Learning by doing
Additional to programming and project development, this Project should teach how to use Git with GitHub in a proper way. Everybody is welcome to join this fun project. I think it could be very instructive to learn and build together especially for beginners. Feel free to contribute and/or contact me if you have any questions. 

### Basic Idea – First Stage 
The basic idea is to create a decentralized web application where each Pixel of a specific canvas gets ownable by Ethereum wallet address holders. In the end, it should be something like the Million Dollar Homepage in combination with Smart Contract ownership tracking. The goal is to develop a simple but smart web application which should be as decentralized as possible but without negative impact in usability. Let’s see how far we can go.

### Big Vision – Coming Stages
There are already interesting concepts and great ideas what we could do with it next. But I would rather hide them for now. 

### Why is it called Pixells?
Pixells comes from “pictures/pics sells” in analogy to the phraseme “sex sells”. This should refer to the meaningfulness of pictures in almost all kinds of marketing and selling strategies. “Picssells” sounds like Pixels, which fits perfectly into the project's concept, as digital pictures are all about Pixels on a screen. The focus of this project lies on the technology and not on the selling or marketing part. Because of that, the “css” is replaced” by “x”, just the remaining “l” should gently implicit to the origin of the name creation.   

### This Project is inspired by
*	Learning Contents from Ivan on Tech Academy - https://academy.ivanontech.com/
*	Million Dollar Homepage - http://www.milliondollarhomepage.com/
*	ETH Million Dollar Homepage - https://github.com/hyfen/eth-million-dollar-homepage

---
## Create a own Project
If you want to create an own new Truffle project, here are the first steps to start with as a suggestion. 
1. Initialize truffle in a new folder of your choice.
    ```
    truffle init
    ```
2. Write your solidity contract and save it as a new .sol file under "contracts".
3. Duplicate the 1_initial_migration.js file and rename it to 2_whatever.js. Also, change name "Migrations" inside the file to your contracts name.
4. Consider changing the solidity compiler version in the truffle-config.js file in line 88 if compilation is failing in further steps.
5. Open Ganache under "Contracts" and "Link Truffle Projects" with the "tuffle-config.js" file => save and restart 
6. Migrate your Truffle project. Your contract will also be compiled. 
    ``` 
    truffle migrate  
    ```
7. Check out the Truffle documentation for more detailed explanations https://www.trufflesuite.com/docs/truffle/getting-started/creating-a-project