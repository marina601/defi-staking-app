// eslint-disable-next-line
import React, {Component} from "react";
import Navbar from "./Navbar";
// eslint-disable-next-line
import Web3 from "web3";

class App extends React.Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        // enable web3 and connect to MetaMask
        if(window.ethereuem) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereuem.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            } else {
                window.alert('No ethereum browser is detected: You can checkout MetaMask')
            }
        }
    
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        console.log(account)
    }

    // initialiaze the state of the account
    constructor(props) {
        super(props)
        this.state = {
            account: '0xx0',
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}></Navbar>
            </div>
        )
    }
}

export default App;