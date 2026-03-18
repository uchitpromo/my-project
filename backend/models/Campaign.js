const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer", required: true },
    budget: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "paid", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Campaign", campaignSchema);
