import React, { Component } from 'react';
import Web3 from 'web3'
import AddData from '../abis/AddData.json';
import $ from 'jquery';
import axios from 'axios';
import './App.css';


class Main extends Component {

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
      //window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      
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
      // for (var i = 1; i <= dataCount; i++) {
      //   const data = await adddata.methods.datas(i).call()
      //   this.setState({
      //     datas: [...this.state.datas, data]
      //   })
      // }
      // this.setState({ loading: false})
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
      loading: true,
      Validataion:true,
      checking:false,
      btnStatus:true,
      requestMetamask:false,
      items: []
    }

    this.createData = this.createData.bind(this)
   
  }

  // createData(jsonvalue, identity) {

  //   var jsonvalue = this.jsonvalue.value;
  //   var resualt=this.IsValidJSONString(jsonvalue)
  //   //alert(resualt)

  //   if(this.state.Validataion == true && resualt==true && this.state.requestMetamask == false){

  //      this.setState({ loading: true })
  //   this.state.adddata.methods.createData(jsonvalue, identity).send({ from: this.state.account })
  //   .once('receipt', (receipt) => {
  //     this.setState({ loading: false })
  //   })
  //   this.setState({ requestMetamask: true })

  //   }
  //   else if(this.state.Validataion == false){

  //     alert('Unique Hash is already taken. Try another')


  //   }
  //     else if(resualt == false){

  //     alert('Json Value is invalid')


  //   }

  //    if (this.state.requestMetamask === true) {
  //           window.location.href = "/LedgerPrototypedApp"
  //       }

   
  // }






   createData(jsonvalue, componentname,packagename,description,version,trustscore) {
    this.setState({ loading: true })
    this.state.adddata.methods.createData(jsonvalue, componentname,packagename,description,version,trustscore).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  IsValidJSONString(item) {
     item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

  // componentDidMount() {
  //   fetch("http://localhost:5000/allComponents")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }


   serialize(){
    var formData ='{"TrustScore" :'+'"'+this.trustscore.value+'"'+', "PackageName" :'+'"'+ this.packagename.value+'"'+', "ComponetName" :'+'"'+ this.componentname.value+'"'+', "Version" :'+'"'+this.version.value+'"'+', "Description" :'+'"'+this.description.value+'"'+'}';
    //alert(formData)
    return(formData)
   }


   async validate(){

    this.setState({ checking: true })
    this.setState({ btnStatus: true })

    var identity = this.identity.value;

   
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
      //Load datas
       this.setState({ Validataion: true })
      this.setState({datas: []});
      for (var i = 1; i <= dataCount; i++) {
        const data = await adddata.methods.datas(i).call()

        
        if (data.identity==identity) {
           this.setState({ Validataion: false })

           alert('Unique Hash is already taken. Try another')
           break
          
        }
                
      }

      if (this.state.Validataion==true) {

         this.setState({ btnStatus: false })

      }

      

      this.setState({ checking: false })
      

      this.setState({ loading: false})
    } 
    else {
      window.alert('The contract not deployed to detected network.')
    }
  
  
}

  render() {

    const { items } = this.state;

    return (

   
       


      <div id="content">


         <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
        
      <h3 className="title center">Vote</h3>
        <form id="#myForm" onSubmit={(event) => {
          event.preventDefault()
          const jsonvalue = this.serialize()
          const componentname = this.componentname.value
          const packagename = this.packagename.value
          const description = this.description.value
          const version = this.version.value
          const trustscore = this.trustscore.value
          this.createData(jsonvalue, componentname,packagename,description,version,trustscore)
          
        }}>
            <div className="form-group form">
            <input
              id="trustscore"
              type="text"
              ref={(input) => { this.trustscore = input }}
              className="form-control"
              placeholder="Trust Score"
             
              required />
          </div>


           { this.state.checking
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : null
              }



          <div className="form-group form">
            <input 
              id="componentname"
              type="text"
              ref={(input) => { this.componentname = input }}
              className="form-control"
              placeholder="Component Name"
              required />
          </div>



          <div className="form-group form">
            <input 
              id="packagename"
              type="text"
              ref={(input) => { this.packagename = input }}
              className="form-control"
              placeholder="Package Name"
              required />
          </div>


           <div className="form-group form">
            <input 
              id="description"
              type="text"
              ref={(input) => { this.description = input }}
              className="form-control"
              placeholder="description"
              required />
          </div>


          <div className="form-group form">
            <input 
              id="version"
              type="text"
              ref={(input) => { this.version = input }}
              className="form-control"
              placeholder="Version"
              required />
          </div>




          <button type="submit" className="btn btn-info form">Vote</button>
        </form>

        


       
      </div>
    );
  }
}

export default Main;
