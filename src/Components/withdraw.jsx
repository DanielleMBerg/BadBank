import React, { useContext, useEffect, useState }        from 'react';
import { Card }                                          from './context.jsx'
import { UserContext }                                   from '../index.jsx';
import { Link }                                          from "react-router-dom";
import { RecordTransactionHistory }                      from './history.jsx';
import { Success }                                       from './success.jsx';
import { WithdrawalForm }                                from './withdrawalform.jsx';
import '../styles/styles.css';


export function Withdraw(){
  const ctx = useContext(UserContext);

  const currentUser = ctx.users.find((users) => users.signedIn === true);
  let savingsAccount;
  let checkingAccount;
  let totalBalance;

  if (currentUser) {
    savingsAccount = currentUser.savingsAccount;
    checkingAccount = currentUser.checkingAccount;
    totalBalance = savingsAccount + checkingAccount;
  } 

  const [isWithdrawal20, setIsWithdrawalUnder100]   = useState('');
  const [isWithdrawal100, setIsWithdrawalOver100]   = useState('');
  const [deposit, setDeposit]                       = useState(0);
  const [show, setShow]                             = useState(true);
  const [isLoggedIn, setIsLoggedIn]                 = useState(false);
  const [isSavings, setIsSavings]                   = useState(null);
  const [accountSelected, setAccountSelected]       = useState(false);
  const transactionType = "withdrawal";


  useEffect(() => {
    if (currentUser) setIsLoggedIn(true);
  }, [currentUser]);

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
    const rounded = Math.round(amount * 100)/100;
    setDeposit(Number(rounded));
  };

  const validate = () => {
    if (deposit < 0) {
      alert("Postive numbers only.");
      return false;
    } else if (isSavings && deposit > savingsAccount) {
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
      let newTotal = Math.round((savingsAccount - deposit) * 100)/100;
      currentUser.savingsAccount = newTotal;
      currentUser.transactions.push([deposit, "Savings", "(-)"])
      } else {
      let newTotal = Math.round((checkingAccount - deposit) * 100)/100;
      currentUser.checkingAccount = newTotal;
      currentUser.transactions.push([deposit, "Checking", "(-)"])
      }
    setShow(false);
  };

  return (
    <div className="image-row withdraw">
      <div className="deposit-grid">
        <Card
          header="Withdraw"
          body= {
            isLoggedIn ? (
            show ? (
              <WithdrawalForm
                savingsAccount={savingsAccount}
                checkingAccount={checkingAccount}
                totalBalance={totalBalance}
                chooseSavingsOrChecking={chooseSavingsOrChecking}
                accountSelected={accountSelected}
                handleChange={handleChange}
                deposit={deposit}
                handleSubmit={handleSubmit}
                isWithdrawal20={isWithdrawal20}
                isWithdrawal100={isWithdrawal100}
                ></WithdrawalForm>
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
              <h5>You need to log in first in order to withdraw money.</h5>
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
