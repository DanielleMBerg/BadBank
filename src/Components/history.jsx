export const RecordTransactionHistory = ({currentUser}) => {
  let transactionList;
  if (currentUser) {
    transactionList = currentUser.transactions.map((transaction, index) => {
      return (
          <tr key={index}>
            <td>${transaction[0]}</td>
            <td>{transaction[1]}</td>
            <td>{transaction[2]}</td>
          </tr>
      )
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Account</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactionList}
      </tbody>
    </table>
  )
}
