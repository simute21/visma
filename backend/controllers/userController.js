const asyncHandler = require('express-async-handler')

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get users'})
})

// @desc Set users
// @route POST /api/users
// @access Private
const postUser = asyncHandler(async(req, res) => {
    if (!req.body.location) {
        res.status(400)
        throw new Error('please add location')
    }
    res.status(200).json({message: 'Post new user'})
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: `update user ${req.params.id}`})
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: `delete user ${req.params.id}`})
})

module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}