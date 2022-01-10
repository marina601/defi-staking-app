// import the Tether file
const Tether = artifacts.require('./Tether.sol');
const RWD = artifacts.require('./RWD.sol');
const DecentralBank = artifacts.require('./DecentralBank.sol');

// create async function which will act as time delay
module.exports = async function(deployer) {
  
    // Deploy Mock Tether Token
    await deployer.deploy(Tether)

     // Deploy RWD
    await deployer.deploy(RWD)

      // Deploy Decentral Bank
    await deployer.deploy(DecentralBank)

  }