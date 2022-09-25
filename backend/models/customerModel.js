const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please add a username'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        city: {
            type: String,
            required: [true, 'Please add a city'],
        },
        street: {
            type: String,
            required: [true, 'Please add a street name'],
        },
        houseNumber: {
            type: String,
            required: [true, 'Please add a house number'],
        },
        zipCode: {
            type: String,
            required: [true, 'Please add a zip code'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('CustomerModel', customerSchema)
