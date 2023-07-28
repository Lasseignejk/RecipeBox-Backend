const mongoose = require("mongoose")

let isConnected = false

const connectDB = async () => {
    if (isConnected) {
        console.log("Mongo is already connected")
        return
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "RecipeBox",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB