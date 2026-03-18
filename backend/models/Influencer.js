const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    niche: { type: String, required: true },
    followers: { type: String, required: true },
    followerCount: { type: Number, default: 0 }, // For numeric filtering
    price: { type: String, required: true },
    priceNumeric: { type: Number, default: 0 }, // For range filtering
    platform: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    
    // Startup Stats
    ordersDone: { type: Number, default: 0 },
    ordersPending: { type: Number, default: 0 },
    topClients: [{ type: String }], // e.g., ["Nike", "Zomato"]
    isOnline: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Influencer", influencerSchema);
