// import the contracts
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) => {
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            let tether = await Tether.new()
            const name = tether.name()
            assert.equal(name, 'Tether')
        });
    });
});

contract('RWD', (accounts) => {
    describe('Mock RWD Token Deployment', async () => {
        it('matches name successfully', async () => {
            let rwd = await RWD.new()
            const name = rwd.name()
            assert.equal(name, 'Reward Token')
        });
    });
});

