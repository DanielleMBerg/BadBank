export const Success = ({
  savingsAccount,
  checkingAccount,
  totalBalance,
  deposit,
  clearForm,
  transactionType}) => {

    return (
        <>
        <h5>Savings Account ${savingsAccount}</h5>
        <h5>Checking Account ${checkingAccount}</h5>
        <h5>Total Balance ${totalBalance}</h5>
        <br></br>
        <h5>Success! You made a {transactionType} of ${deposit}!</h5>
          <button
            type="submit"
            className="btn btn-success"
            onClick={clearForm}
          >Make another {transactionType}</button>
      </>
    )
}