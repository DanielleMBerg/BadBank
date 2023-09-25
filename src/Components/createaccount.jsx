import React, { useState, useContext }    from 'react';
import { Card }                           from './context.jsx';
import { UserContext }                    from '../index.jsx';
import { CreateForm }											from './createform.jsx'

export function CreateAccount() {
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const ctx                     = useContext(UserContext);  

	const handleEmail = (e) => {
		setEmail(e.target.value.toLowerCase());
}

	const handlePassword = (e) => {
		setPassword(e.target.value);
	}

	const handleName = (e) => {
		setName(e.target.value.toUpperCase());
	}
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
    if (!validatePasswordLength())       return;
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    })();
    // ({name,email,password,savingsAccount:0,checkingAccount:0, signedIn:false, transactions:[]});
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
    <div className='image-row create'>
      <div className="account-grid">
			<Card
				header="Create Account"
				status={status}
				body={show ? (  
								<CreateForm
									handleCreate={handleCreate}
									handleName={handleName}
									handleEmail={handleEmail}
									handlePassword={handlePassword}
									name={name}
									email={email}
									password={password}
								></CreateForm>
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
