const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()

    res.status(200).json(users)
})

// @desc Set users
// @route POST /api/users
// @access Private
const postUser = asyncHandler(async(req, res) => {
    if (!req.body.fullName || !req.body.email || !req.body.address) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        address: req.body.address
    })

    res.status(200).json(user)
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    console.log(typeof req.body)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedUser)
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    await user.remove()
    res.status(200).json(user)
})

module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}