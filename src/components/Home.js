import React, { Component } from 'react';
import Web3 from 'web3'

import './App.css';
import AddData from '../abis/AddData.json'
import Navbar from './Navbar'

import bg1 from '../bg2.jpg';
import mylogo from '../mylogo.jpg';
import uulogo from '../uulogo.png';
import { Link } from 'react-router-dom';

class App extends Component {

  async componentWillMount() {
   if (window.web3 || window.ethereum) {
       await this.loadWeb3()
       await this.loadBlockchainData()
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
     // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    const myaccount=accounts[0]
    this.setState({ account:  myaccount })
    const networkId = await web3.eth.net.getId()
    const networkData = AddData.networks[networkId]
    if(networkData) {
      const adddata = web3.eth.Contract(AddData.abi, networkData.address)
      this.setState({ adddata })
      const dataCount = await adddata.methods.dataCount().call()
      this.setState({ dataCount })
      // Load datas
      for (var i = 1; i <= dataCount; i++) {
        const data = await adddata.methods.datas(i).call()
        this.setState({
          datas: [...this.state.datas, data]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('The contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dataCount: 0,
      datas: [],
      loading: true
     
    }

    this.createData = this.createData.bind(this)

     
  }

  createData(jsonvalue, identity) {
    this.setState({ loading: true })
    this.state.adddata.methods.createData(jsonvalue, identity).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }



  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
         <img src={bg1} alt="" className="bg"/>
           <div className="form">
           <p className="font">Package managers are part of the infrastructure that enables anyone to use software. Package managers are a software ecosystem’s backbone. They host software from respected software producers and are seen as trusted sources of software by their users. Unfortunately, these package managers are not as secure as users think they are. At different points in the life cycle of software, vulnerabilities can enter the software and the package manager cannot be held responsible for it.  </p>
            <p className="font">
            In this project, we want to use a distributed ledger that stores trust data about software packages to support the trust that customers of the package managers have. Such trust data can be whether the package contains known vulnerabilities, whether the package stems from a reproducible build, whether the package is maintained frequently, whether its developers are reputable, etc. The data is in turn used by package managers to provide trust data about their software packages. While TrustSECO is ecosystem agnostic, we intend to take the NixPkgs package manager as the initial use case.
            </p>
     
            </div>
           <div className="footer">
      <img src={mylogo} alt="" width="200" height="61"/>
      <img src={uulogo} alt="" width="200" height="104"/>
     </div>
          </div>
     );
  }
}

export default App;
