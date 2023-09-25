import React, { useState, useContext, useEffect } from 'react';
import { Card }                                   from './context.jsx'
import { UserContext }                            from '../index';
import { RecordTransactionHistory }               from './history.jsx';
import { Link }                                   from "react-router-dom";
import '../styles/styles.css';
import { DepositForm }                            from './depositform.jsx';
import { Success }                                from './success.jsx';

export function Deposit(){
  
  const [isCash, setIsCash]                         = useState('Deposit');
  const [isCheck, setIsCheck]                       = useState(false);
  const [isSavings, setIsSavings]                   = useState(null);
  const [accountSelected, setAccountSelected]       = useState(false);
  const [optionSelected, setOptionSelected]         = useState(false)
  const [deposit, setDeposit]                       = useState(0);
  const [show, setShow]                             = useState(true);
  const [isLoggedIn, setIsLoggedIn]                 = useState(false);
  const ctx                                         = useContext(UserContext);
  
  const transactionType = "deposit";

  const currentUser = ctx.users.find((users) => users.signedIn === true);
  let savingsAccount;
  let checkingAccount;
  let totalBalance;
  
  if (currentUser) {
    savingsAccount = currentUser.savingsAccount;
    checkingAccount = currentUser.checkingAccount;
    totalBalance = savingsAccount + checkingAccount;
  }

  useEffect(() => {
    if (currentUser) setIsLoggedIn(true);
  }, [currentUser]);

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
    const rounded = Math.round(amount * 100)/100;
    setDeposit(Number(rounded));
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
      let newTotal = Math.round((savingsAccount + deposit) * 100)/100;
      currentUser.savingsAccount = newTotal;
      currentUser.transactions.push([deposit, "Savings", "(+)"])
    } else {
      let newTotal = Math.round((checkingAccount + deposit) * 100)/100;
      currentUser.checkingAccount = newTotal;
      currentUser.transactions.push([deposit, "Checking", "(+)"])
    }
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

  

  return (
    <div className="image-row deposit">
      <div className="deposit-grid">
          <Card
            header="Deposit"
            body= {
              isLoggedIn ? (
                show ? (
                  <DepositForm 
                    savingsAccount={savingsAccount}
                    checkingAccount={checkingAccount}
                    totalBalance={totalBalance}
                    chooseSavingsOrChecking={chooseSavingsOrChecking}
                    chooseCashOrCheck={chooseCashOrCheck}
                    accountSelected={accountSelected}
                    optionSelected={optionSelected}
                    handleChange={handleChange}
                    isCash={isCash}
                    isCheck={isCheck}
                    deposit={deposit}
                    handleSubmit={handleSubmit}
                  ></DepositForm>
                  ):(
                  <Success
                    savingsAccount={savingsAccount}
                    checkingAccount={checkingAccount}
                    totalBalance={totalBalance}
                    deposit={deposit}
                    clearForm={clearForm}
                    transactionType={transactionType}
                    ></Success>
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
              body= {
                  <RecordTransactionHistory currentUser={currentUser}></RecordTransactionHistory>
              }
            ></Card>
      </div>
    </div>
  );
};
