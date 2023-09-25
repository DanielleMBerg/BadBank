import '../styles/styles.css';
import React            from 'react';
import { UserContext }  from '../index';
import { Card }         from './context';

export function AllData() {
  // const ctx = React.useContext(UserContext);
  const [data, setData] = React.useState(
    [{
      name:'ABEL',
      email:'abel@mit.edu',
      password:'secret'
    }]
  );

  React.useEffect(() => {
    fetch('/account/all')
      .then(response => response.json())
      .then (res => {
        console.log(res);
        setData([...data, ...res]);
      });
  }, []);
  
  const userList = data.map((user, index) => {
    return (
      <Card
        header = {user.name}
        body = {(
          <ul key={index}>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Password:</strong> {user.password}</li>
            {/* <li><strong>Savings Account Balance:</strong> {user.savingsAccount}</li>
            <li><strong>Checking Account Balance:</strong> {user.checkingAccount}</li>
            <li><strong>Signed In:</strong> {JSON.stringify(user.signedIn)}</li> */}
          </ul>
        )}
      ></Card>
    )
  })
  
  return (
    <div className="image-row alldata">
      <h1>User Information</h1>
      <div className="userCards">{userList}</div>
    </div>
  );
}
