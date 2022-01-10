// import the Tether file
const Tether = artifacts.require('./Tether.sol');
const RWD = artifacts.require('./RWD.sol');
const DecentralBank = artifacts.require('./DecentralBank.sol');

// create async function which will act as time delay
module.exports = async function(deployer, network, accounts) {
  
    // Deploy Mock Tether Token
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

     // Deploy RWD
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

      // Deploy Decentral Bank
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decenralBank = await DecentralBank.deployed()

    // Transfer all RWD tokens to the DecentralBank
    await rwd.transfer (decenralBank.address, '1000000000000000000000000000')

    //Distribute 100 Tether tokens to investor
    await tether.transfer(accounts[1], '1000000000000000000000')

  }