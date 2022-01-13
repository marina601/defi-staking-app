// eslint-disable-next-line
import React, { Component } from "react";
import Navbar from "./Navbar";
// eslint-disable-next-line
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

class App extends React.Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non ethereum browser detected. You should consider Metamask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();

    // Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert("Error! Tether contract not deployed to network");
    }

    // Load RWD Contract
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
    } else {
      window.alert("Error! RWD contract not deployed to network");
    }

    // Load Decental Bank Contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
      this.setState({ decentralBank });
      let decentralBanlkStakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
      this.setState({ decentralBanlkStakingBalance: decentralBanlkStakingBalance.toString() });
    } else {
      window.alert("Error! Decentral Bank contract not deployed to network");
    }
    // update loading state
    this.setState({loading: false})
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
        <div className="text-center">
            {console.log(this.state.loading)}
        </div>
      </div>
    );
  }
}

export default App;
