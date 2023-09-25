export const CreateForm = ({
	handleCreate,
	handleName,
	handleEmail,
	handlePassword,
	name,
	email,
	password}) => {
    return (
        <form>
					<label>Name</label>
						<input 
							type="input"
							className="form-control"
							placeholder="Enter name"
							onChange={handleName}
						/>
					<br></br>
					<label>Email Address</label>
						<input
							type="input"
							className="form-control"
							placeholder="Enter email"
							onChange={handleEmail}
						/>
					<br></br>
					<label>Password - min. 8 characters</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter password"
							onChange={handlePassword}
						/>
					<button
						id="account submit"
						disabled={name || email || password ? false : true}
						type="submit"
						className="btn btn-success"
						onClick={handleCreate}
					>Create Account</button>
				</form>

    )
}