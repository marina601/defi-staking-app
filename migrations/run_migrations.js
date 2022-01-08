// import the Migrations file
const Migrations = artifacts.require('Migrations')

// deploye the migrations
module.exports = function deployer() {
    deployer.deploy(Migrations)
};