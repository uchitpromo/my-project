const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    name: String,
    phone: String,
    service: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);