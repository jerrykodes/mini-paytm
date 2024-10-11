const { Schema, model } = require('mongoose')

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

const Account = model('accounts', accountSchema)

module.exports = Account
