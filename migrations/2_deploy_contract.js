// import the Tether file
const Tether = artifacts.require('./Tether.sol');
const Polkadot = artifacts.require('./Polkadot.sol');
// create async function which will act as time delay
module.exports = async function(deployer) {
  
    // Deploy Mock Tether Token
    await deployer.deploy(Tether)
    await deployer.deploy(Polkadot)

  }