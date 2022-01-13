// eslint-disable-next-line
import React, {Component} from "react";
import Navbar from "./Navbar";
// eslint-disable-next-line
import Web3 from "web3";
import Tether from '../contracts/Tether.sol'
import RWD from '../contracts/RWD.sol'

class App extends React.Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non ethereum browser detected. You should consider Metamask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})
  }

  // initialiaze the state of the account
  constructor(props) {
    super(props);
    this.state = {
      account: "0xx0",
      // coming from json file
      tether: {},
      rwd: {},
      decntralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}></Navbar>
      </div>
    );
  }
}

export default App;