const asyncHandler = require('express-async-handler')

const Customer = require('../models/customerModel')

// @desc Get customers
// @route GET /api/customers
// @access Private
const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find()

    res.status(200).json(customers)
})

// @desc Set customer
// @route POST /api/customers
// @access Private
const postCustomer = asyncHandler(async (req, res) => {
    if (
        !req.body.fullName ||
        !req.body.email ||
        !req.body.city ||
        !req.body.street ||
        !req.body.houseNumber ||
        !req.body.zipCode
    ) {
        console.log(req.body)
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const user = await Customer.create({
        fullName: req.body.fullName,
        email: req.body.email,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        zipCode: req.body.zipCode,
    })

    res.status(200).json(user)
})

// @desc Update customer
// @route PUT /api/customers/:id
// @access Private
const updateCustomer = asyncHandler(async (req, res) => {
    const user = await Customer.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    )
    res.status(200).json(updatedUser)
})

// @desc Delete customer
// @route DELETE /api/customers/:id
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        res.status(400)
        throw new Error('Customer not found')
    }
    await customer.remove()
    res.status(200).json(customer)
})

module.exports = {
    postCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers,
}
