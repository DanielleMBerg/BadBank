import React, { useState, useContext, useEffect } from 'react';
import '../styles/styles.css';
import { Card } from './context.jsx'
import { UserContext } from '../index';
import { Link } from "react-router-dom";
import { ForgotPassword } from './forgot';

export function Login(){
  const ctx = useContext(UserContext);
  const [emailInput, setEmailInput]         = useState(null);
  const [passwordInput, setPasswordInput]   = useState(null);
  const [show, setShow]                     = useState(true);
  const [forgotPassword, setForgotPassword] = useState(true);

  const currentUser = ctx.users.find((users) => users.signedIn === true);

  useEffect(() => {
    if (currentUser) {
      setShow(false);
    }
  },[currentUser])
 
  
  const handleLogIn = (e) => {
    const user = ctx.users.find(users => users.email === emailInput);
    const password = ctx.users.find(users => users.password === passwordInput);
    if (user && password){
      user.signedIn = true;
      setShow(false);
    } else {
      if (!user) alert("Email address does not match our records.");
      if (!password) alert("Password does not match our records.")
    }
  }

  const handleLogOut = (e) => {
    const user = ctx.users.find(users => users.signedIn === true);
    user.signedIn = false;
    setShow(true);
  }

  const handleForgotPassword = () => {
    setForgotPassword(false);
  }

  const handlePasswordUpdated = () => {
    setForgotPassword(true);
  }

  return (
    <>
          <div
        className="image-row"
       >
    <div className="account-grid">
      <div className="deposit-container">
        { forgotPassword ? (
        <Card
          className="inputCard"
          header="Log In"
          body= {
            show ? (
              <form>
                <label>Email Address</label>
                  <input
                    type="input"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                <br></br>
                <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                <button
                  id="account submit"
                  type="submit"
                  className="btn btn-success"
                  disabled={emailInput && passwordInput ? false : true}
                  onClick={handleLogIn}
                >Log In</button>
                <br></br>
                <Link 
                  style={{color: "blue"}}
                  onClick={handleForgotPassword}
                >Forgot your password?</Link>
              </form>
            ):(
              <>
                <h5>Success! {currentUser.name}, you are logged in!</h5>
                <br></br>
                <button
                  id="account submit"
                  type="submit"
                  className="btn btn-success"
                  onClick={handleLogOut}
                >Log Out</button>
                </>
            )}
        ></Card>
        ):(
          <ForgotPassword handlePasswordUpdated={handlePasswordUpdated}></ForgotPassword>
        )}
      </div>
    </div>
    </div>
    </>
  )  
}
