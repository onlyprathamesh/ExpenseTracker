const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB Database");
    } catch (error) {
        console.log("MongoDB connection Failed");
        console.error("MongoDB connection error: ",error);
    }
}

module.exports = connectDB;