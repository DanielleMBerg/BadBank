import React, { useState, useContext }    from 'react';
import { Card }                           from './context.js';
import { UserContext }                    from '../index';

export function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const ctx                     = useContext(UserContext);  


  const validate = (field, label) => {
      if (!field) {
        setStatus('Error: Please enter your ' + label);
        return false;
      }
      return true;
  }

  const validatePasswordLength = () => {
    if (password.length < 8) {
      setStatus('Error: Your password needs to be at least 8 characters long.');
      return false;
    } 
    return true;
  }

  const handleCreate = (e) => {
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePasswordLength()) return;
    ctx.users.push({name,email,password,savingsAccount:0,checkingAccount:0, signedIn:false, transactions:[]});
    validatePasswordLength();
    setShow(false);
    setStatus('');
  }    

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <div className="account-grid">
      <div className="account-container">
        <Card
          header="Create Account"
          status={status}
          body={show ? (  
                  <form>
                    <label>Name</label>
                      <input 
                        type="input"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={e => setName(e.currentTarget.value.toUpperCase())}
                      />
                    <br></br>
                    <label>Email Address</label>
                      <input
                        type="input"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value.toLowerCase())}
                      />
                    <br></br>
                    <label>Password - min. 8 characters</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                      />
                    <button
                      id="account submit"
                      disabled={name || email || password ? false : true}
                      type="submit"
                      className="btn btn-success"
                      onClick={handleCreate}
                    >Create Account</button>
                  </form>
            ):(
                  <>
                  <h5>Success! You created an account!</h5>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={clearForm}
                    >Add another account</button>
                  </>
            )}
          />
      </div>
    </div>
  )
}