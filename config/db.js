const mongoose = require('mongoose')

const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/shopping-cart2')
        console.log("Mongodb is connected")
    } catch (error) {
        console.log("server error")
    }
}


module.exports = connectDB