const User = require("../models/User");
const Influencer = require("../models/Influencer");
const Campaign = require("../models/Campaign");

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalInfluencers = await Influencer.countDocuments();
        const totalCampaigns = await Campaign.countDocuments();
        const totalRevenue = await Campaign.aggregate([
            { $match: { status: "paid" } },
            { $group: { _id: null, total: { $sum: { $convert: { input: { $replaceAll: { input: "$budget", find: "₹", replacement: "" } }, to: "int", onError: 0 } } } } }
        ]);

        res.json({
            users: totalUsers,
            influencers: totalInfluencers,
            campaigns: totalCampaigns,
            revenue: totalRevenue[0]?.total || 0
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch admin stats" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find()
            .populate("brandId", "name email")
            .populate("influencerId", "name platform")
            .sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all campaigns" });
    }
};

const verifyInfluencer = async (req, res) => {
    try {
        const { id } = req.params;
        const influencer = await Influencer.findById(id);
        if (!influencer) return res.status(404).json({ error: "Influencer not found" });

        influencer.verified = !influencer.verified;
        await influencer.save();
        res.json(influencer);
    } catch (err) {
        res.status(500).json({ error: "Failed to verify influencer" });
    }
};

module.exports = { getAdminStats, getAllUsers, getAllCampaigns, verifyInfluencer };
