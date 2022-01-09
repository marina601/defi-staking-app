// import the Tether file
const Tether = artifacts.require('./Tether.sol');

// create async function which will act as time delay
module.exports = async function(deployer, network, accounts) {
  
    // Deploy Mock Tether Token
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

  }