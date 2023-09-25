import React, { useState, useContext, useEffect }   from 'react';
import '../styles/styles.css';
import { Card }                                     from './context.jsx'
import { UserContext }                              from '../index';

import { ForgotPassword }                           from './forgot';
import { LoginForm }                                from './loginform';

export function Login(){
  const ctx                                 = useContext(UserContext);

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
 
  const handleEmailChange = (e) => {
      setEmailInput(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
      setPasswordInput(e.target.value);
    }

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
    setEmailInput(null);
    setPasswordInput(null);
  }

  const handleForgotPassword = () => {
    setForgotPassword(false);
  }

  const handlePasswordUpdated = () => {
    setForgotPassword(true);
  }

  return (
    <div className="image-row login">
      <div className="account-grid">
        <div className="deposit-container">
          {forgotPassword ? (
          <Card
            className="inputCard"
            header="Log In"
            body= {
              show ? (
                <LoginForm 
                  handleLogIn={handleLogIn}
                  handleForgotPassword={handleForgotPassword}
                  handleEmailChange={handleEmailChange}
                  handlePasswordChange={handlePasswordChange}
                  emailInput={emailInput}
                  passwordInput={passwordInput}
                ></LoginForm>
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
  )  
}
