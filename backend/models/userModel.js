const mongoose = require('mongoose')

// const addressSchema = mongoose.Schema({
//     city: {
//         type: String,
//         required: [true, 'Please add a city']
//     },
//     street: {
//         type: String,
//         required: [true, 'Please add a street name']
//     },
//     houseNumber: {
//         type: Number,
//         required: [true, 'Please add a house number']
//     },
//     zipCode: {
//         type: Number, 
//         required: [true, 'Please add a zip code']
//     }
// }, {_id: false})

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a username']
    }, 
    email: {
        type: String, 
        required: [true, 'Please add an email']
    },
    address: {
        city: {
            type: String,
            required: [true, 'Please add a city']
        },
        street: {
            type: String, 
            required: [true, 'Please add a street name']
        },
        houseNumber: {
            type: Number, 
            required: [true, 'Please add a house number']
        },
        zipCode: {
            type: Number,
            required: [true, 'Please add a zip code']
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('UserModel', userSchema)