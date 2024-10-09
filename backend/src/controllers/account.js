const Account = require('../models/Account')

const getBalanceController = async (req, res) => {
	try {
		const { userId } = req
		const account = await Account.findOne({ userId })

		res.status(200).json({
			type: 'success',
			balance: account.balance,
		})
	} catch (error) {
		console.error(error.message)

		res.status(400).json({
			type: 'error',
			message: 'Error while fetching balance',
		})
	}
}

module.exports = { getBalanceController }
