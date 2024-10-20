const { z } = require('zod')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Account = require('../models/Account')

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const loginController = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = await User.findOne({ email, password }).select(
      '-password -__v -createdAt -updatedAt'
    )

    if (!user) {
      return res.status(411).json({
        type: 'error',
        message: 'Invalid credentials!!!',
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.status(200).json({
      type: 'success',
      message: 'User Logged in successfully',
      user,
      token,
    })
  } catch (error) {
    console.error(error.message)
    res.status(400).json({
      type: 'error',
      message: 'Error while logging in user!!!',
    })
  }
}

const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
})

const registerController = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = registerSchema.parse(
      req.body
    )

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(411).json({
        type: 'error',
        message: 'Email already taken / Incorrect inputs',
      })
    }

    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
    })

    const user = await newUser.save()

    await Account.create({
      userId: user._id,
      balance: 1 + Math.floor(Math.random() * 10000),
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.status(201).json({
      type: 'success',
      message: 'User created successfully',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error.message)

    res.status(400).json({
      type: 'error',
      message: 'Error while registering user',
    })
  }
}

module.exports = { loginController, registerController }
