export const WithdrawalForm = ({
	savingsAccount,
	checkingAccount,
	totalBalance,
	chooseSavingsOrChecking,
	accountSelected,
	handleChange,
	deposit,
	handleSubmit,
	isWithdrawal20,
	isWithdrawal100}) => {
		return (
			<form className="container-deposit">
				<h5>Savings Account ${savingsAccount}</h5>
				<h5>Checking Account ${checkingAccount}</h5>
				<h5>Total Balance ${totalBalance}</h5>
				<br></br>
				<h6>Select account:</h6>
					<input
						type="button"
						onClick={chooseSavingsOrChecking}
						value="Savings"
						className="btn savings"
					></input>
					<input
						type="button"
						onClick={chooseSavingsOrChecking}
						value="Checking"
						className="btn checking"
					></input>
					<br></br>
					{accountSelected && (
						<div>
							<input
								id="number"
								type="number"
								onChange={handleChange}
								placeholder="Enter Amount"
							></input>               
							{isWithdrawal20 && (
								<>
									<label className='label'>What denomination would you like your money to be in?</label>
										<select>
											<option>$1 bills</option>
											<option>$5 bills</option>
											<option>$10 bills</option>
											<option>$20 bills</option>
										</select>
								</>
							)}
							{isWithdrawal100 && (
								<>
									<label className="label">What denomination would you like your money to be in?</label>
									<br></br>
										<select>
											<option>$20 bills</option>
											<option>$50 bills</option>
											<option>$100 bills</option>
										</select>
								</>
							)}
							<br></br>
							<button
								id="submit"
								className="btn btn-success"
								onClick={handleSubmit}
								disabled={deposit !== 0 ? false : true}
							>Submit Withdrawal</button>
						</div>
					)}
			</form>   
		)
}