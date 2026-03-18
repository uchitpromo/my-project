require("dotenv").config();
const mongoose = require("mongoose");

// Using 'uchitpromo' as the database name
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/uchitpromo";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB (UchitPromo) 🚀");
    } catch (err) {
        console.error("Database Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
