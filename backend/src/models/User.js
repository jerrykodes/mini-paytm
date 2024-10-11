const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 1,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
)

const User = model('users', userSchema)

module.exports = User
