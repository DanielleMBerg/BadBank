import { Link } from "react-router-dom";

export const LoginForm = ({
	emailInput,
	passwordInput,
	handleLogIn,
	handleForgotPassword,
	handleEmailChange,
	handlePasswordChange}) => {
	
    return (
        <form>
					<label>Email Address</label>
						<input
							type="input"
							className="form-control"
							id="email"
							placeholder="Enter email"
							onChange={handleEmailChange}
						/>
					<br></br>
					<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Enter password"
							onChange={handlePasswordChange}
						/>
					<button
						id="account submit"
						type="submit"
						className="btn btn-success"
						disabled={emailInput && passwordInput ? false : true}
						onClick={handleLogIn}
					>Log In</button>
					<br></br>
					<Link 
						style={{color: "blue"}}
						onClick={handleForgotPassword}
					>Forgot your password?</Link>
				</form>
    )
}