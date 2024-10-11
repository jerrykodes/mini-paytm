const { startSession } = require('mongoose')
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

const transferBalanceController = async (req, res) => {
  const session = await startSession()
  try {
    session.startTransaction()
    const { amount, receiverId } = req.body

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    )

    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return res.status(400).json({
        message: 'Insufficient balance',
      })
    }

    const receiverAccount = await Account.findOne({
      userId: receiverId,
    }).session(session)

    if (!receiverAccount || receiverId === req.userId) {
      await session.abortTransaction()
      return res.status(400).json({
        message: 'Invalid account',
      })
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session)

    await Account.updateOne(
      { userId: receiverId },
      { $inc: { balance: amount } }
    ).session(session)

    await session.commitTransaction()
    res.status(200).json({
      type: 'success',
      message: 'Transfer successful',
    })
  } catch (error) {
    await session.abortTransaction()
    console.error(error)

    res.status(400).json({
      type: 'error',
      message: 'Error while transferring balance',
    })
  }
}

module.exports = { getBalanceController, transferBalanceController }
