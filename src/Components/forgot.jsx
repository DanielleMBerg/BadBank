import React, { useState, useContext } 	from 'react';
import { Card } 						from './context.jsx'
import { Link } 						from "react-router-dom";
import { UserContext } 					from '../index';
import '../styles/styles.css';

export const ForgotPassword = ({handlePasswordUpdated}) => {
	const [changePassword, setChangePassword] 							= useState(true);
	const [emailInput, setEmailInput]         							= useState(null);
	const [passwordInput, setPasswordInput]   							= useState(null);
	const [confirmPasswordInput, setConfirmPasswordInput]   			= useState(null);

	const ctx = useContext(UserContext);
	const user = ctx.users.find(users => users.email === emailInput);
	
	const validateUser = () => {
		if (!user) {
		  alert('This email does not match a current user.');
		  return false;
		}
		return true;
	}
  
	const validatePassword = () => {
		if (!passwordInput) {
			alert('Error: Password field left empty.');
			return false;
		} else if (passwordInput.length < 8) {
			alert('Error: Your password needs to be at least 8 characters long.');
			return false;
		} else {
		return true;
		}
	}

	const validateConfirmedPassword = () => {
		if (confirmPasswordInput !== passwordInput) {
			alert('Error: Your passwords do not match.');
			return false;
		}
		return true;
	}

	const handleChangePassword = () => {
		if (!validatePassword()) return;
		if (!validateUser()) return;
		if (!validateConfirmedPassword()) return;
		setChangePassword(false);
		user.password = passwordInput;
	}

	const handleReturnToLogin = () => {
		handlePasswordUpdated();
		setChangePassword(true);

	}

    return    (
      <Card
        header="Forgot Password"
        body= {
            changePassword ? (
							<form>
								<label htmlFor="email">Email Address</label>
									<input
										type="input"
										className="form-control"
										id="email"
										placeholder="Enter email"
										onChange={(e) => setEmailInput(e.target.value)}
									/>
								<br></br>
								<label htmlFor="password">New Password</label>
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Enter password"
										onChange={(e) => setPasswordInput(e.target.value)}
									/>
									<input
										type="password"
										className="form-control"
										id="confirmPassword"
										placeholder="Confirm new password"
										onChange={(e) => setConfirmPasswordInput(e.target.value)}
									/>
								<button
									id="account submit"
									type="submit"
									className="btn btn-success"
									onClick={handleChangePassword}
								>Submit</button>
							</form>
            ):(
            	<>
                <h5>Success! You changed your password!</h5>
                <br></br>
                <Link 
									className="btn btn-primary"
									to="/Components/login/"
									onClick={handleReturnToLogin}
								>Log In</Link>
            	</>)}
      >
      </Card>
    )
}
