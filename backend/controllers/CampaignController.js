const Campaign = require("../models/Campaign");
const Influencer = require("../models/Influencer");

const createCampaign = async (req, res) => {
    try {
        const { influencerId, budget } = req.body;
        const campaign = await Campaign.create({
            brandId: req.user.id,
            influencerId,
            budget
        });
        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to create booking" });
    }
};

const getBrandCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ brandId: req.user.id })
            .populate("influencerId")
            .sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

const getInfluencerCampaigns = async (req, res) => {
    try {
        // 1. Find the influencer profile linked to this user
        const influencerProfile = await Influencer.findOne({ userId: req.user.id });
        if (!influencerProfile) {
            return res.json([]); // No profile, no campaigns
        }

        // 2. Find campaigns for this influencer
        const campaigns = await Campaign.find({ influencerId: influencerProfile._id })
            .populate("brandId", "name email")
            .sort({ createdAt: -1 });
        
        res.json(campaigns);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch requests" });
    }
};

const updateCampaignStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const campaign = await Campaign.findById(id);
        if (!campaign) return res.status(404).json({ error: "Campaign not found" });

        // Logic check:
        // 1. If status is 'approved' or 'rejected', only Influencer can do it.
        // 2. If status is 'paid', only Brand can do it.

        if (status === "approved" || status === "rejected") {
            const influencerProfile = await Influencer.findOne({ userId: req.user.id });
            if (!influencerProfile || campaign.influencerId.toString() !== influencerProfile._id.toString()) {
                return res.status(403).json({ error: "Unauthorized: Only the influencer can approve/reject" });
            }
        }

        if (status === "paid") {
            if (campaign.brandId.toString() !== req.user.id) {
                return res.status(403).json({ error: "Unauthorized: Only the brand can pay" });
            }
        }

        campaign.status = status;
        await campaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        let stats = {};
        if (req.user.role === "brand") {
            const campaigns = await Campaign.find({ brandId: req.user.id });
            stats = {
                total: campaigns.length,
                pending: campaigns.filter(c => c.status === "pending").length,
                completed: campaigns.filter(c => c.status === "paid" || c.status === "approved").length,
                totalSpent: campaigns.reduce((acc, curr) => acc + (parseInt(curr.budget.replace(/[^0-9]/g, "")) || 0), 0)
            };
        } else {
            const influencerProfile = await Influencer.findOne({ userId: req.user.id });
            if (!influencerProfile) {
                stats = { total: 0, pending: 0, completed: 0, earnings: 0 };
            } else {
                const campaigns = await Campaign.find({ influencerId: influencerProfile._id });
                stats = {
                    total: campaigns.length,
                    pending: campaigns.filter(c => c.status === "pending").length,
                    completed: campaigns.filter(c => c.status === "paid" || c.status === "approved").length,
                    earnings: campaigns.filter(c => c.status === "paid").reduce((acc, curr) => acc + (parseInt(curr.budget.replace(/[^0-9]/g, "")) || 0), 0)
                };
            }
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

module.exports = { 
    createCampaign, 
    getBrandCampaigns, 
    getInfluencerCampaigns, 
    updateCampaignStatus, 
    getDashboardStats 
};
