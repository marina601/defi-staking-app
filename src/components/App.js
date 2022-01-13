// eslint-disable-next-line
import React, {Component} from "react";
import Navbar from "./Navbar";
// eslint-disable-next-line

class App extends React.Component {
    // initialiaze the state of the account
    constructor(props){
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