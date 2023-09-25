import React, { useState } from 'react';

export const DepositForm = ({
	savingsAccount,
	checkingAccount,
	totalBalance,
	chooseSavingsOrChecking,
	chooseCashOrCheck,
	accountSelected,
	optionSelected,
	handleChange,
	isCash,
	isCheck,
	deposit,
	handleSubmit}) => {
		const [imageLoaded, setImageLoaded]               = useState(false);

		const handleFileLoaded = (e) => {
			if (e.target.value) {
				setImageLoaded(true);
			} else {
				setImageLoaded(false)
			}
		}

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
							<h6>Select type of deposit:</h6>
								<input
									type="button"
									onClick={chooseCashOrCheck}
									value="Cash"
									className="btn cash"
								></input>
								<input
									type="button"
									onClick={chooseCashOrCheck}
									value="Check"
									className="btn check"
								></input>
						</div>
					)}
					{optionSelected && (
						<div>
								<input
									id="number"
									type="number"
									onChange={handleChange}
									placeholder={`Enter ${isCash} Amount`}
								></input>
							<br></br>
								{isCheck ? (
									<>
									<label for="file">Upload image of check.</label>
									<input
										type="file"
										accept="image/*,.pdf"
										onChange={handleFileLoaded}
									></input>
									<button
										disabled={(deposit !== 0 && imageLoaded ? false : true)}
										onClick={handleSubmit}
										className="btn btn-success"
									>Submit Deposit</button>
									</>
								):(
									<button
									disabled={deposit !== 0 ? false : true}
									onClick={handleSubmit}
									className="btn btn-success"
									>Submit Deposit</button>
								)}
						</div>
					)}
			</form>
	)}