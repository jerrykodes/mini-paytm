const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(403).json({
				type: 'error',
				message: 'Token required!!!',
			})
		}

		const token = authHeader.replace('Bearer ', '')
		const { userId } = jwt.verify(token, process.env.JWT_SECRET)

		req.userId = userId
		next()
	} catch (error) {
		return res.status(403).json({
			type: 'error',
			message: 'Token expired/invalid. Kindly re-login!!!',
		})
	}
}

module.exports = authMiddleware
