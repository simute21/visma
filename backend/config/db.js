const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb