// import the Tether file
const Tether = artifacts.require('Tether');

// create async function which will act as time delay
module.exports = async function(deployer) {
    await deployer.deploy(Tether);
};
