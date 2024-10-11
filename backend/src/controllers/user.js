const { z } = require('zod')
const User = require('../models/User')

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
})

const updateUserController = async (req, res) => {
  try {
    const userNewInfo = updateUserSchema.parse(req.body)

    await User.findByIdAndUpdate({ _id: req.userId }, userNewInfo)

    res.status(201).json({
      type: 'success',
      message: 'User updated successfully',
    })
  } catch (error) {
    console.error(error.message)

    res.status(400).json({
      type: 'error',
      message: 'Error while updating information',
    })
  }
}

const searchUsersController = async (req, res) => {
  try {
    const filter = (req.query.filter || '').toLowerCase()

    const users = await User.find(
      {
        $and: [
          {
            $or: [
              {
                firstName: {
                  $regex: filter,
                  $options: 'i',
                },
              },
              {
                lastName: {
                  $regex: filter,
                  $options: 'i',
                },
              },
            ],
          },
          {
            _id: { $ne: req.userId },
          },
        ],
      },
      'email firstName lastName _id'
    )

    res.status(200).json({
      type: 'success',
      users,
    })
  } catch (error) {
    console.error(error.message)

    res.status(400).json({
      type: 'error',
      message: 'Error while searching users!!!',
    })
  }
}

module.exports = { updateUserController, searchUsersController }
