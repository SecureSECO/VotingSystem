import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Navbar extends Component {

   

  render() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-dark flex-md-nowrap p-0 shadow">
  <span className="navbar-brand col-sm-3 col-md-2 mr-0">       
          <span className="title1">TrusSECO</span>
        </span>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto marginleft">
      <li className="nav-item active">        
        <Link to="/Votingsystem" className="nav-link">Home<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">        
         <Link to="/Add" className="nav-link">Voting(decentralized)</Link>
      </li>
      
       <li className="nav-item">        
         <Link to="/List" className="nav-link">All Voting(decentralized)</Link>
      </li>
       <li className="nav-item">        
         <a href="http://localhost:3000/" className="nav-link">Vote(centralized)</a>
      </li>
      <li className="nav-item">        
         <a href="http://localhost:3000/index" className="nav-link">All Votes(centralized)</a>
      </li>

          </ul>
    <span className="navbar-text">
       <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span className="bold">{this.props.account == ''? <span>You need to install MataMask</span>: <span>Public Key</span> }</span> <span id="account">{this.props.account}</span></small>
          </li>          
        </ul>
    </span>
  </div>
</nav>
    );
  }
}

export default Navbar;
