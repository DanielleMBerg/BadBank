import React                 from 'react';
import ReactDOM              from 'react-dom';
import { HashRouter }        from 'react-router-dom';
import { Route, Routes }     from 'react-router-dom';

import { NavBar }        from './Components/navbar';
import { Home }          from './Components/home'
import { CreateAccount } from './Components/createaccount';
import { Login }         from './Components/login';
import { Deposit }       from './Components/deposit';
import { Withdraw }      from './Components/withdraw';
import { AllData }       from './Components/alldata';

export const UserContext = React.createContext(null);  

export function Spa() {

  return (
    <HashRouter>
      <UserContext.Provider
        value={{
          users:
            [{
              name:'ABEL',
              email:'abel@mit.edu',
              password:'secret',
              savingsAccount: 100,
              checkingAccount: 0,
              signedIn: false,
              transactions: []
            }]
        }}
      >
        <div>
        <NavBar/>
          <Routes>
            <Route path="" exact element={<Home />} />
            <Route path="/Components/CreateAccount/" element={<CreateAccount />} />
            <Route path="/Components/login/" element={<Login />} />
            <Route path="/Components/deposit/" element={<Deposit />}  />
            <Route path="/Components/withdraw/" element={<Withdraw />} />
            <Route path="/Components/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>      
    </HashRouter>
  );
}
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );
