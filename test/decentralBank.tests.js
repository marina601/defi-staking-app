const { assert } = require('console');

// import the contracts
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mock Tether ot Customer
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        });
    });

    describe('Mock RWD Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        });
    });

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })
        // check the balance of the rwd tokens in the bank
        it('contract has tokens', async () => {
           let balance = await rwd.balanceOf(decentralBank.address)
           assert.equal(balance, tokens('1000000'))
        })
    
    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result
            // Check Investor Balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')

            // check Staking For Customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            // Check updated balance of cutomer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking transfer')

            // Check the balance of the bank after transfer
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'balance of the bank after staking from customer')

            // Is staking is true
            resuts = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking after transfer is true')

            //Issue Tokens
            await decentralBank.issueTokens({from: owner})

            //Ensure only the owner can issue tokens
            await decentralBank.issueTokens({from: owner}).should.be.rejected;

            // Unstake Tokens
            await decentralBank.unstakeTokens({from: customer})

            // Check unstaking balances
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking')

            // check updated balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balance after unstaking')

            // Is Staking update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer no longer staking after unstaking')

        })
    })    
    });
});

