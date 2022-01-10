// import the contracts
const Tether = artifacts.require('./Tether.sol');
const RWD = artifacts.require('./RWD.sol');
const DecentralBank = artifacts.require('./DecentralBank.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

contract ('decentralBank', accounts => {


});

let sum2 = (a,b) => a + b;
console.log(sum2(5,6))

let positive = n => n>=0;

let randomNumber = () => Math.random;

document.addEventListener('click', () => console.log('click'));