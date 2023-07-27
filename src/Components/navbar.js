import { Link } from "react-router-dom";
import { UserContext } from '../index';
import React, { useContext, useState } from 'react';


export function NavBar(){
  const ctx               = useContext(UserContext);
  const [show, setShow]   = useState(false);
  let currentUser;
  let name;

  if (currentUser){
    currentUser = ctx.users.find(users => users.signedIn === true)
    name = currentUser.name;
    console.log(name);
  }

const turnOnButton = () => {
  if (currentUser){
    setShow(true)
  } else {
    setShow(false);
  }
}

  const handleLogOut = (e) => {
    currentUser.signedIn = false;
    setShow(false);
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand PNW change" to="/">PNW Bank</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link change" to="/Components/createaccount" onClick={turnOnButton}>Create Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link change" to="/Components/deposit/" onClick={turnOnButton}>Deposit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link change" to="/Components/withdraw/" onClick={turnOnButton}>Withdraw</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link change" to="/Components/alldata/" onClick={turnOnButton}>AllData</Link>
          </li>  
          {show ? (   
            <>
              <li className="nav-item">
                <Link className="nav-link change" to="/Components/login/" onClick={handleLogOut}>Log Out</Link>
              </li> 
              <li className="nav-item" style={{color:"white", fontSize:"25px"}}>Welcome!</li>
            </>
          ):(
            <li className="nav-item">
              <Link className="nav-link change" to="/Components/login/">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
