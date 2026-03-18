const Influencer = require("../models/Influencer");

const getInfluencers = async (req, res) => {
    try {
        const influencers = await Influencer.find();
        res.json(influencers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch influencers" });
    }
};

const createInfluencerProfile = async (req, res) => {
    try {
        const influencer = await Influencer.create({ ...req.body, userId: req.user.id }); // Use userId
        res.status(201).json(influencer);
    } catch (err) {
        res.status(500).json({ error: "Failed to create profile" });
    }
};

module.exports = { getInfluencers, createInfluencerProfile };
