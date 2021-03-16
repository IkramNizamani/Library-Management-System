import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      rollNumber: user.rollNumber,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register a user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, rollNumber, phoneNumber } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    rollNumber,
    phoneNumber,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      rollNumber: user.rollNumber,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route POST /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      rollNumber: user.rollNumber,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    user.rollNumber = req.body.rollNumber || user.rollNumber
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      rollNumber: updateUser.rollNumber,
      phoneNumber: updateUser.phoneNumber,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admins

const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const users = await User.find({ ...keyword })
  res.json(users)
})

// @desc Remove a user
// @route DELETE /api/users:id
// @access Private/Admins

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admins

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admins

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.rollNumber = req.body.rollNumber || user.rollNumber
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      rollNumber: updateUser.rollNumber,
      phoneNumber: updateUser.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Add book to user
// @route PUT /api/users/:id/addBook
// @access Private/Admins

const addBookToUser = asyncHandler(async (req, res) => {
  const currentDate = new Date()

  const { bookName, bookID, returnDate, phoneNumber, rollNumber } = req.body

  const user = await User.findById(req.params.id)

  if (user) {
    const book = {
      bookName,
      bookID,
      bookRefUser: req.params.id,
      returnDate,
      issuedAt: currentDate,
    }
    await user.books.push(book)
    await user.save()
    res.status(201).json(user.books)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc User book history
// @route GET /api/users/:id/userBookHistory
// @access Private/Admins

const userBookHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addBookToUser,
  userBookHistory,
}
