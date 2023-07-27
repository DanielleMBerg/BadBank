import React, { useContext } from 'react';
import '../styles/styles.css';
import { Card } from './context.js'
import { UserContext } from '../index';
import { Link } from "react-router-dom";
import { RecordTransactionHistory } from './history';


export function Withdraw(){
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
  const { useEffect, useState } = React;

  const [savingsAccount, setSavingsAccount]         = useState(startingSavingsBalance);
  const [checkingAccount, setCheckingAccount]       = useState(startingCheckingBalance);
  const [totalBalance, setTotalBalance]             = useState(startingTotalBalance);
  const [isWithdrawal20, setIsWithdrawalUnder100]   = useState('');
  const [isWithdrawal100, setIsWithdrawalOver100]   = useState('');
  const [deposit, setDeposit]                       = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [show, setShow]                             = useState(true);
  const [isLoggedIn, setIsLoggedIn]                 = useState(false);
  
  const [isSavings, setIsSavings]                   = useState(null);
  const [accountSelected, setAccountSelected]       = useState(false);
  let status = totalBalance;

  useEffect(() => {
    if (currentUser) setIsLoggedIn(true);
  }, [currentUser])

  const clearForm = () => {
    setDeposit(0);
    setAccountSelected(false);
    setIsSavings(null);
    setShow(true)
  }

// Removes the withdrawal options upon transaction or when deposit button is clicked
  useEffect(() => {
    setIsWithdrawalUnder100('');
    setIsWithdrawalOver100('');
  }, [totalBalance]);

  const chooseSavingsOrChecking = (event) => {
    if (event.target.value === 'Savings') {
      setIsSavings(true);
    } else {
      setIsSavings(false);
    }
    setAccountSelected(true)
  };

  const handleChange = event => {
    let amount = event.target.value;
// Controls the money denomination options for withdrawal
    if (amount >= 20 && amount < 100) {
      setIsWithdrawalUnder100(true);
      setIsWithdrawalOver100('');
    } else if (amount >= 100) {
      setIsWithdrawalOver100(true)
      setIsWithdrawalUnder100('');
    } else {
      setIsWithdrawalUnder100('');
      setIsWithdrawalOver100('')
    }
    setDeposit(Number(amount));
  };

  const validate = () => {
    if (isSavings && deposit > savingsAccount) {
      alert('Not enough money in account to support withdrawal request. Transaction failed.');
      return false;
    } else if (!isSavings && deposit > checkingAccount) {
      alert('Not enough money in account to support withdrawal request. Transaction failed.');
      return false;
    } else if (isNaN(deposit)) {
      alert('Please enter a valid number.');
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (isSavings) {
      let newTotal = savingsAccount - deposit;
      currentUser.savingsAccount = newTotal;
      setTransactionHistory([...transactionHistory, [deposit, "Savings", "(-)"]])
      currentUser.transactions.push([deposit, "Savings", "(-))"])
      setSavingsAccount(newTotal); 
      } else {
      let newTotal = checkingAccount - deposit;
      currentUser.checkingAccount = newTotal;
      setCheckingAccount(newTotal);
      setTransactionHistory([...transactionHistory, [deposit, "Checking", "(-)"]])
      currentUser.transactions.push([deposit, "Checking", "(-)"])
      }
    let newBalance = totalBalance - deposit;
    setTotalBalance(newBalance);
    setShow(false);
  };

  return (
    <div className="deposit-grid">
        <Card
          header="Withdraw"
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
                  <label>
                    <input
                      id="number"
                      type="text"
                      onChange={handleChange}
                      placeholder="Enter Amount"
                    ></input>
                  </label>                 
                  {isWithdrawal20 && (
                    <>
                      <label className='label'>What denomination would you like your money to be in?</label>
                        <select>
                          <option>$1 bills</option>
                          <option>$5 bills</option>
                          <option>$10 bills</option>
                          <option>$20 bills</option>
                        </select>
                    </>
                  )}
                  {isWithdrawal100 && (
                    <>
                      <label className="label">What denomination would you like your money to be in?</label>
                      <br></br>
                        <select>
                          <option>$20 bills</option>
                          <option>$50 bills</option>
                          <option>$100 bills</option>
                        </select>
                    </>
                  )}
                  <br></br>
                  <button
                    id="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={deposit !== 0 ? false : true}
                  >Submit Withdrawal</button>
                  </div>
                )}
              </form> 
            ):(
               <>
                <h5>Savings Account ${savingsAccount}</h5>
                <h5>Checking Account ${checkingAccount}</h5>
                <h5>Total Balance ${status}</h5>
                <br></br>
                <h5>Success! You made a withdrawal of ${deposit}!</h5>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={clearForm}
                  >Make another withdrawal</button>
              </>
            )
            ):(
              <>
              <h5>You need to log in first in order to withdraw money.</h5>
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
