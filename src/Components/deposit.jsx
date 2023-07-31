import React, { useState, useContext, useEffect } from 'react';
import { Card }                                   from './context.jsx'
import { UserContext }                            from '../index';
import { RecordTransactionHistory }               from './history.jsx';
import { Link }                                   from "react-router-dom";
import '../styles/styles.css';

export function Deposit(){
  const ctx = useContext(UserContext);

  const currentUser = ctx.users.find((users) => users.signedIn === true);
  let startingSavingsBalance;
  let startingCheckingBalance;
  let startingTotalBalance;

  if (currentUser) {
    startingSavingsBalance = currentUser.savingsAccount;
    startingCheckingBalance = currentUser.checkingAccount;
    startingTotalBalance = startingSavingsBalance + startingCheckingBalance;
  } else {
    startingSavingsBalance = 0;
    startingCheckingBalance = 0;
    startingTotalBalance = 0;
  }

  const [savingsAccount, setSavingsAccount]         = useState(startingSavingsBalance);
  const [checkingAccount, setCheckingAccount]       = useState(startingCheckingBalance);
  const [totalBalance, setTotalBalance]             = useState(startingTotalBalance);
  const [isCash, setIsCash]                         = useState('Deposit');
  const [isCheck, setIsCheck]                       = useState(false);
  const [isSavings, setIsSavings]                   = useState(null);
  const [accountSelected, setAccountSelected]       = useState(false);
  const [optionSelected, setOptionSelected]         = useState(false)
  const [deposit, setDeposit]                       = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [show, setShow]                             = useState(true);
  const [isLoggedIn, setIsLoggedIn]                 = useState(false);
  const [imageLoaded, setImageLoaded]               = useState(false);

  const status = totalBalance;

  useEffect(() => {
    if (currentUser) setIsLoggedIn(true);
  }, [currentUser])

  const clearForm = () => {
    setDeposit(0);
    setIsCash('Deposit');
    setOptionSelected(false);
    setAccountSelected(false);
    setIsSavings(null);
    setShow(true)
  }
  
  const handleChange = e => {
    let amount = e.target.value;
    setDeposit(Number(amount));
  };

  const validate = () => {
    if (deposit < 0) {
      alert("Postive numbers only. To withdraw, navigate to the widrawal page.");
      return false;
    } else if (isNaN(deposit)) {
      alert("Please enter a valid number.");
      return false;
    } else {
      return true;
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (isSavings) {
      let newTotal = savingsAccount + deposit;
      setSavingsAccount(newTotal); 
      setTransactionHistory([...transactionHistory, [deposit, "Savings", "(+)"]])
      currentUser.savingsAccount = newTotal;
      currentUser.transactions.push([deposit, "Savings", "(+)"])
    } else {
      let newTotal = checkingAccount + deposit;
      setCheckingAccount(newTotal);
      setTransactionHistory([...transactionHistory, [deposit, "Checking", "(+)"]])
      currentUser.checkingAccount = newTotal;
      currentUser.transactions.push([deposit, "Checking", "(+)"])
    }
    setTotalBalance(totalBalance + deposit);
    setShow(false);
  }

  const chooseSavingsOrChecking = (e) => {
    if (e.target.value === 'Savings') {
      setIsSavings(true);
    } else {
      setIsSavings(false);
    }
    setAccountSelected(true)
    setOptionSelected(false);
  };
           
  const chooseCashOrCheck = (e) => {
    if (e.target.value === 'Cash') {
      setIsCash('Cash');
      setIsCheck(false);
    } else {
      setIsCash('Check');
      setIsCheck(true);
    }
    setOptionSelected(true)
  };

  const handleFileLoaded = (e) => {
    if (e.target.value) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false)
    }
  }

  return (
    <div className="deposit-grid">
        <Card
          header="Deposit"
          body= {
            isLoggedIn ? (
              show ? (
                <form className="container-deposit">
                  <h5>Savings Account ${savingsAccount}</h5>
                  <h5>Checking Account ${checkingAccount}</h5>
                  <h5>Total Balance ${status}</h5>
                  <br></br>
                  <h6>Select account:</h6>
                    <input 
                      type="button"
                      onClick={chooseSavingsOrChecking}
                      value="Savings"
                      className="btn savings"
                    ></input>
                    <input 
                      type="button"
                      onClick={chooseSavingsOrChecking}
                      value="Checking"
                      className="btn checking"
                    ></input>
                  <br></br>
                  {accountSelected && (
                    <div>
                      <h6>Select type of deposit:</h6>
                        <input
                          type="button"
                          onClick={chooseCashOrCheck}
                          value="Cash"
                          className="btn cash"
                        ></input>
                        <input
                          type="button"
                          onClick={chooseCashOrCheck}
                          value="Check"
                          className="btn check"
                        ></input>
                    </div>
                  )}
                  {optionSelected && (
                    <div>
                      <label>
                        <input
                          id="number"
                          type="text"
                          onChange={handleChange}
                          placeholder={`Enter ${isCash} Amount`}
                        ></input>
                      </label>
                      <br></br>
                        {isCheck ? (
                          <>
                          <label for="file">Upload image of check.</label>
                          <input
                            id="checkPix"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileLoaded}
                          ></input>
                          <button
                            id="submit"
                            disabled={(deposit !== 0 && imageLoaded ? false : true)}
                            onClick={handleSubmit}
                            className="btn btn-success"
                          >Submit Deposit</button>
                          </>
                        ):(
                          <button
                          id="submit"
                          disabled={deposit !== 0 ? false : true}
                          onClick={handleSubmit}
                          className="btn btn-success"
                          >Submit Deposit</button>
                        )}
                    </div>
                  )}
                </form>
                ):(
                  <>
                    <h5>Savings Account ${savingsAccount}</h5>
                    <h5>Checking Account ${checkingAccount}</h5>
                    <h5>Total Balance ${status}</h5>
                    <br></br>
                    <h5>Success! You made a deposit of ${deposit}!</h5>
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={clearForm}
                      >Make another deposit</button>
                  </>
                )
          ):(
            <>
            <h5>You need to log in first in order to deposit money.</h5>
            <Link className="btn btn-primary text-uppercase" to="/Components/login/">Log In</Link>
            </>
          )
          
          }
          />
          <Card
            header="Transaction History"
            body={
              <>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th id="center">Account</th>
                  <th id="last">Type</th>
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                <RecordTransactionHistory currentUser={currentUser}></RecordTransactionHistory>
              </tbody>
            </table>
            </>
              }
          ></Card>
    </div>
  );
};
